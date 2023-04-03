API_IMAGE_TAG=blog/tech
API_IMAGE_ECR_RESOURCE=081952199324.dkr.ecr.us-east-1.amazonaws.com/blog/tech
BLOG_TECH_STATIC_FOLDER:=$(shell pwd)/blog/tech/static
PWD:=$(shell pwd)
blog.tech.image.push:
	docker push $(API_IMAGE_ECR_RESOURCE):latest

blog.tech.diagrams.build:
	find ./blog/tech/ -type f -name "*.puml" | xargs -I{} plantuml -o $(BLOG_TECH_STATIC_FOLDER)/images/diagrams {} 

ecr.docker.login:
	aws ecr get-login-password --region us-east-1 --profile i |docker login  --username AWS --password-stdin 081952199324.dkr.ecr.us-east-1.amazonaws.com
blog.tech.image.tag:
	docker tag $(API_IMAGE_TAG):latest $(API_IMAGE_ECR_RESOURCE):latest 

blog.tech.image.build:
	docker buildx build --platform linux/amd64 -f ./compute/containerized/images/blog.tech.docker ./ -t $(API_IMAGE_TAG) --build-arg DIST_FOLDER=dist/blog/tech	

blog.tech.content.build: blog.tech.diagrams.build
	hugo --source blog/tech --destination $(PWD)/dist/blog/tech/

blog.tech.image.publish: blog.tech.content.build blog.tech.image.build blog.tech.image.tag blog.tech.image.push

blog.tech.deploy: blog.tech.image.publish
	kubectl rollout restart deployment blog-tech-web
