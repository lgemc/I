from doctest import debug

from openai import OpenAI
import os
import json

class WeekContent:
    def __init__(self, title: str, content: str):
        self.title = title
        self.content = content

    def to_dict(self):
        return {
            "title": self.title,
            "content": self.content,
        }

class CourseWeek:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def to_dict(self):
        return {
            "title": self.title,
            "content": self.content,
        }

class Course:
    def __init__(self, title, objectives, duration_weeks):
        self.title = title
        self.objectives = objectives
        self.duration_weeks = duration_weeks
        self.weeks = []

    def add_week(self, week):
        self.weeks.append(week)

    def to_dict(self):
        return {
            "title": self.title,
            "objectives": self.objectives,
            "duration_weeks": self.duration_weeks,
            "weeks": [week.to_dict() for week in self.weeks],
        }

class CourseGenerator:
    """
    A library for generating complete courses with weekly content and materials.
    Utilizes Bloom's Taxonomy, ADDIE framework, and Gagné's Nine Events of Instruction.
    """

    def __init__(self, output_dir="output", debug=False):
        """Initialize the CourseGenerator with an OpenAI API key and output directory."""
        client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
        )
        self.client = client
        self.output_dir = output_dir
        self.debug = debug
        os.makedirs(self.output_dir, exist_ok=True)

    def _create_course_summary_prompt(self, title, objectives, duration_weeks):
        """Create the prompt to send to OpenAI."""
        if self.debug:
            print(f"Generating course outline for \"{title}\"...")
        prompt = (
            f"Generate a comprehensive course outline and weekly materials for the course titled \"{title}\". "
            f"The course objectives are: {objectives}. The course should span {duration_weeks} weeks. "
            f"For each week, include a topic title and content. "
            'The output should be formated as follow: {"summary": "Course summary", "weeks": [{{"title": "Week 1: <<week summary>>", "content": "Week 1 content"}}]}'
        )

        return prompt

    def _create_course_week_content_prompt(self, week_num, topic, content_summary, other_week_titles=None):
        """Create the prompt to send to OpenAI for generating weekly content."""
        prompt = (
            f"Generate the content for Week {week_num} on the topic of \"{topic}\". "
            'The content should include an introduction, key concepts, examples, and exercises.'
            f"A short summary of the content is: {content_summary}, you should expand on this."
            f"Consider the other topics covered in the course, such as: {other_week_titles} and how they relate to this week's topic."
        )
        return prompt

    def _query_openai(self, prompt):
        """Query the OpenAI API with the generated prompt."""
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=7500
            )
            return response.choices[0].message.content
        except Exception as e:
            raise RuntimeError(f"Error querying OpenAI API: {e}")

    def _process_response(self, response: str):
        """Process the OpenAI API response into a structured format."""
        json_response = json.loads(response)

        course_data = {
            "summary": json_response["summary"],
            "weeks": []
        }

        for week_num, week_content in enumerate(json_response["weeks"], start=1):
            course_data["weeks"].append({
                "title": week_content["title"],
                "content": week_content["content"]
            })

        return course_data

    def _save_course_files(self, title, course_data):
        """Save the course summary and weekly content into files."""
        course_summary_file = os.path.join(self.output_dir, "course_summary.md")
        with open(course_summary_file, "w") as summary_file:
            summary_file.write(f"# {title}\n\n")
            summary_file.write(course_data.get("summary", "Course summary not available."))

        weekly_contents = course_data.get("weeks", [])
        for week_num, week_content in enumerate(weekly_contents, start=1):
            week_file = os.path.join(self.output_dir, f"week_{week_num}.md")
            with open(week_file, "w") as week_file_obj:
                week_file_obj.write(f"# Week {week_num}: {week_content.get('title', 'Title not available')}\n\n")
                week_file_obj.write(week_content.get("content", "Content not available."))

    def generate_week_content(self, week_num, topic, summary, other_week_titles=None):
        """Generate the content for a specific week on a given topic."""
        prompt = self._create_course_week_content_prompt(week_num, topic, summary, other_week_titles)
        print(prompt)
        response = self._query_openai(prompt)
        return response

    def generate_course_weeks(self, course: dict):
        """Generate the content for each week of the course."""
        course_week_titles = [week["title"] for week in course.get("weeks", [])]
        course_week_titles_str = ", ".join(course_week_titles)
        for week_num, week_data in enumerate(course.get("weeks", []), start=1):
            if self.debug:
                print(f"Generating content for Week {week_num} on the topic of \"{week_data['title']}\"...")
            week_content = self.generate_week_content(week_num, week_data["title"], week_data["content"], course_week_titles_str)
            course["weeks"][week_num - 1]["content"] = week_content

        return course

    def generate_course(self, title, objectives, duration_weeks):
        """
        Generate a complete course outline and weekly materials.

        Args:
            title (str): The course title.
            objectives (str): A description of the course objectives.
            duration_weeks (int): Number of weeks for the course duration.

        Returns:
            dict: A dictionary containing the course outline and weekly materials.
        """
        prompt = self._create_course_summary_prompt(title, objectives, duration_weeks)
        response = self._query_openai(prompt)
        if self.debug:
            print("Course outline generated successfully.")
        course_data = self._process_response(response)
        course_data = self.generate_course_weeks(course_data)
        self._save_course_files(title, course_data)
        return course_data


    def store_course(self, course: Course, filename="course.json"):
        target_path = os.path.join(self.output_dir, filename)
        """Store the course data in a JSON file."""
        with open(target_path, "w") as file:
            json.dump(course, file, indent=4)


    def generate_course_and_store(self, title, objectives, duration_weeks, filename="course.json"):
        """Generate a complete course and store it in a JSON file."""
        course_data = self.generate_course(title, objectives, duration_weeks)
        self.store_course(course_data, filename)

if __name__ == "__main__":
    generator = CourseGenerator(debug=True)

    # Example usage:
    course_title = "Introduction to image processing with deep learning"
    course_objectives = (
        "Learn about image processing history and applications.",
        "Understand the basics of deep learning and neural networks related with vision",
        "This course assumes prior knowledge of Python and basic machine learning concepts, also some experience with deep learning an maths involved",
        "Understand types of image processing techniques and how and when to apply them",
        "Learn how to implement deep learning models for image processing tasks",
    )
    duration = 16  # weeks

    course = generator.generate_course_and_store(course_title, course_objectives, duration)
    print(f"Course summary and weekly content saved in {generator.output_dir}")

