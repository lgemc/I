import { Variants } from "./variants";

export enum BaseFood {
    Bread = 'bread',
    Milk = 'milk',
    Egg = 'egg',
    Cucumber = 'cucumber',
    Cheese = 'cheese',
    Pimenton = 'pimenton',
    Tofu = 'tofu'
}

export type Food = BaseFood | Variants