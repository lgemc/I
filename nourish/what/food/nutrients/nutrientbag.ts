import { Measure } from "../../../../measure/measure";
import { Nutrients } from "../../../../src/nourish/what/food/nutrients/nutrients";

export interface NutrientContainer {
    quantity: Measure
    nutrient: Nutrients
}