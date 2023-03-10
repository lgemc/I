import pandas as pd
import sqlite3

database = "lite.db"
conn = sqlite3.connect(database)

#food = pd.read_csv("FoodData_Central_csv_2022-10-28/food.csv")
#food.to_sql(name='food', con=conn)
#nutrients = pd.read_csv("FoodData_Central_csv_2022-10-28//nutrient.csv")
#nutrients.to_sql(name="nutrients", con=conn)
#food_nutrient = pd.read_csv("FoodData_Central_csv_2022-10-28/food_nutrient.csv")
food_component = pd.read_csv("FoodData_Central_csv_2022-10-28/food_component.csv")
food_component.to_sql(name="food_component", con=conn)
#food_nutrient.to_sql(name="food_nutrient", con=conn)
#merge = pd.merge(nutrients, pd.merge(food, food_nutrient, on="fdc_id"), left_on="id", right_on="nutrient_id", how="left")

#print(food.head())
#print(nutrients.head())
