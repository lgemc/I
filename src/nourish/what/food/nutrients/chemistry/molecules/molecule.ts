import { Element} from "../elements/element"
import { ElementBag } from "../elements/elements"

export interface Molecule {
    name: string
    elements: ElementBag[]
}