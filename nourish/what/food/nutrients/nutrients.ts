export enum Nutrients {
    Calorie = 'calorie',
    Carbohydrate = 'carbohydrate',
    Protein = 'protein',
    Lipid = 'lipid',
    Fat = 'lipid',
    Fiber = 'fiber',
    Water = 'water',
    B1 = 'b1',
    B6 = 'b6',
    Calcium = 'calcium',
    Phosporous = 'phosporous',
    Iron = 'iron',
    Magnesium = 'magnesium',
    Manganese = 'manganese',
    Zinc = 'zinc',
    Selenium = 'selenium',
    Sodium = 'sodium',
    Potassium = 'potasium',
    FolicAcid = 'folic-acid',
    Nitrogen = 'nitrogen',
    Copper = 'copper',
    Starch = 'starch',
    Ash = 'ash',
    Sucrose = 'sucrose',
    Glucose = 'glucose',
    Fructose = 'fructose',
    Lactose = 'lactose',
    Maltose = 'maltose',
    Galactose = 'galactose'
}

export type Proximate = Nutrients.Fat |
  Nutrients.Lipid |
  Nutrients.Water | 
  Nutrients.Protein | 
  Nutrients.Calorie |
  Nutrients.Nitrogen |
  Nutrients.Ash
  
export type Carbohydrates = Sugars | Nutrients.Starch | Nutrients.Fiber

export type Sugars = Nutrients.Sucrose | 
Nutrients.Glucose | 
Nutrients.Fructose |
Nutrients.Lactose |
Nutrients.Maltose | 
Nutrients.Galactose

export type Minerals = Nutrients.Calcium |
Nutrients.Iron |
Nutrients.Magnesium |
Nutrients.Phosporous |
Nutrients.Potassium |
Nutrients.Sodium |
Nutrients.Zinc |
Nutrients.Copper |
Nutrients.Manganese |
Nutrients.Selenium

// TODO: add lipids 