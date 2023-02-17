import { BaseFood } from "./food";

export enum Variants {
    WhiteBread = 'white-bread',
    LactoseFreeMilk = 'lactose-free-milk',
    Parmesan = 'parmessan-cheese',
    DutchCheese = 'dutch-cheese'

}

export interface Variant {
    food: BaseFood
    variant: Variants
}

export const whiteBread : Variant = {
    food: BaseFood.Bread,
    variant: Variants.WhiteBread
}

export const lactoseFreeMilk: Variant = {
    food: BaseFood.Milk,
    variant: Variants.LactoseFreeMilk
}

export const parmesan: Variant = {
    food: BaseFood.Cheese,
    variant: Variants.Parmesan
}

export const dutchCheese: Variant =  {
    food: BaseFood.Cheese,
    variant: Variants.DutchCheese
}