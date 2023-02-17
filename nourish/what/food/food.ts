import { Variants } from "./variants";

export enum BaseFood {
    Bread = 'bread',
    Milk = 'milk',
    Egg = 'egg',
    Cucumber = 'cucumber',
    Cheese = 'cheese',
    Pimenton = 'pimenton',
    Tofu = 'tofu',
    Banana = 'banana',
    Kiwi = 'kiwi',
    Apple = 'apple',
    TreeTomato = 'tree-tomato',
    Plum = 'plum'
}

export type Food = BaseFood | Variants
export type Fruit = BaseFood.Kiwi | BaseFood.Banana | BaseFood.Apple | BaseFood.TreeTomato