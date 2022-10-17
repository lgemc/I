import { KiloCalorie } from "../../../../../measure/energy/calories";
import { Measure } from "../../../../../measure/measure";
import { MilliLiter } from "../../../../../measure/volume/volumes";
import { Gram, MilliGram } from "../../../../../measure/weight/weights";
import { BaseFood, Food } from "../../food";
import { NutrientContainer } from "../../nutrients/nutrientbag";
import { Nutrients } from "../../../../../src/nourish/what/food/nutrients/nutrients";
import { Variants } from "../../../../../src/nourish/what/food/variants";

export interface Table {
    food: Food
    portion: Measure
    nutrients: NutrientContainer[]
}