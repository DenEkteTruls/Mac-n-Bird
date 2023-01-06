
import { gameObject } from "./gameObject.js";


export class Player extends gameObject
{
    constructor(x, y, w, h, render)
    {
        super(x, y, w, h, render);

        this.playerSpeed = 0;
        this.new_jump = false;
        this.new_time = false;

        this.alive = true;

        this.image = new Image(this.w, this.h);
        this.image.src = "media/mac.png";
    }
}