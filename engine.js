
import {Player} from "./player.js";


class Engine
{
    constructor(canvasID)
    {
        this.__initialize_canvas(canvasID);
        this.__initialize_variables();
    }


    __initialize_canvas(canvasID)
    {
        try {
            const canvas = document.getElementById(canvasID);
            this.ctx = canvas.getContext("2d");
            console.log("Engine initialized...");
        } catch {
            console.log("Engine failed on initialize. Check canvasID!");
        }
    }

    
    __initialize_variables()
    {
        this.gameObjects = [
            new Player(100, 300-20, 40, 40, true, true)
        ];
    }


    render_gameObjects()
    {
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            if(this.gameObjects[i].render) {
                this.gameObjects[i].draw(this.ctx);
            }
        }
    }
}



export {Engine}