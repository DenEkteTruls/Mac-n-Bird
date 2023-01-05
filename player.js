
import { gameObject } from "./gameObject.js";


export class Player extends gameObject
{
    constructor(x, y, width, height, physics = false, render = false)
    {
        super(x, y, width, height, physics, render);
    }
}