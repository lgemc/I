import { Measure } from "../../../../../measure/measure";
import { Food } from "../../food";
import { NutrientContainer } from "../../nutrients/nutrientbag";
export interface Table {
    food: Food 
    portion: Measure
    nutrients: NutrientContainer[]
}