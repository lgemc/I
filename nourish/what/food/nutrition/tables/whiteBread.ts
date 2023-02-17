import { KiloCalorie } from "../../../../../measure/energy/calories";
import { MilliLiter } from "../../../../../measure/volume/volumes";
import { Gram, MilliGram } from "../../../../../measure/weight/weights";
import { Nutrients } from "../../nutrients/nutrients";
import { Variants } from "../../variants";
import { Table } from "./table";

export const whiteBread: Table = {
    food: Variants.WhiteBread,
    portion: 100 * Gram,
    nutrients: [
            {
                nutrient: Nutrients.Nitrogen,
                quantity: 1.51 * Gram
            },
            {
                nutrient: Nutrients.Fat,
                quantity: 3.41 * Gram,
            },
            {
                nutrient: Nutrients.Calorie,
                quantity: 261 * KiloCalorie,
            },
            {
                nutrient: Nutrients.Carbohydrate,
                quantity: 44.8 * Gram,
            },
            {
                nutrient: Nutrients.Protein,
                quantity: 8.47 * Gram,
            },
            {
                nutrient: Nutrients.Fiber,
                quantity: 2.3 * Gram,
            },
            {
                nutrient: Nutrients.Calcium,
                quantity: 56 * MilliGram,
            },
            {
                nutrient: Nutrients.Magnesium,
                quantity: 25.1 * MilliGram,
            },
            {
                nutrient: Nutrients.Sodium,
                quantity: 540 * MilliGram
            },
            {
                nutrient: Nutrients.Potassium,
                quantity: 110 * MilliGram
            },
            {
                nutrient: Nutrients.Water,
                quantity: 34.9 * MilliLiter
            },
            {
                nutrient: Nutrients.FolicAcid,
                quantity:   23 * MilliGram
            }
        ]
}