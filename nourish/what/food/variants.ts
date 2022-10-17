import { BaseFood } from "./food";

export enum Variants {
    WhiteBread = 'white-bread',
    LactoseFreeMilk = 'lactose-free-milk'
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