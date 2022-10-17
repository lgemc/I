import { Element } from "./element";

export interface ElementBag {
    element: Element
    quantity: number
}

export const Chopper: Element = {
    mass: 63.546,
    name: "Chopper",
    number: 29
}