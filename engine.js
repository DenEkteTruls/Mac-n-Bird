
import { gameObject } from "./gameObject.js";





class Universe
{
    constructor(engine, w, h)
    {
        this.x = 0;
        this.w = w;
        this.h = h;

        this.speed = 0.01;
        this.engine = engine;

        this.level1 = [
            [1, 2, 1, 1, 3, 2],
            [1, 2, 1, 3, 1, 2]
        ];
    }

    generateObjectsFromLevel(level)
    {
        let gos = [];
        let width = 300;
        for(let i = 0; i < level[0].length; i++)
        {
            for(let c = 0; c < level[0][i]; c++)
            {
                let go = new gameObject(width * i + 250, this.engine.canvas.height - (100 * (c + 1)), 80, 140, true);
                go.image = new Image(80, 120);
                go.image.src = "media/flaske.png";
                go.universe = true;
                gos.push(go);
            }
        }

        for(let i = 0; i < level[1].length; i++)
        {
            for(let c = 0; c < level[1][i]; c++)
            {
                let go = new gameObject(width * i + 250, (100 * c), 80, 140, true);
                go.image = new Image(80, 120);
                go.image.src = "media/flaske.png";
                go.universe = true;
                gos.push(go);
            }
        }

        return gos;
    }
}


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
            this.canvas = document.getElementById(canvasID);
            this.ctx = this.canvas.getContext("2d");
            console.log("Engine initialized...");
        } catch {
            console.log("Engine failed on initialize. Check canvasID!");
        }
    }

    
    __initialize_variables()
    {
        this.running = true;
        this.gameObjects = [];
        this.background_image = new Image(1064, 600);

        this.uni = new Universe(this, 1500, this.canvas.height);
        for(let go of this.uni.generateObjectsFromLevel(this.uni.level1))
        {
            this.add_gameObject(go);
        }
    }


    __handle_eventHandler()
    {
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].eventHandler();
        }
    }


    setBackgroundImage(imageURL)
    {
        this.background_image.src = imageURL;
    }


    add_gameObject(go)
    {
        this.gameObjects.push(go);
    }


    universeCorrection()
    {
        for(let go of this.gameObjects)
        {
            if(go.universe) {
                go.x += this.uni.x;
            }
        }
    }


    render_gameObjects()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background_image, this.uni.x * 10, 0, 1064, 600);

        this.__handle_eventHandler();
        this.universeCorrection();

        this.uni.x -= this.uni.speed;

        for(let i = 0; i < this.gameObjects.length; i++)
        {
            if(this.gameObjects[i].render) {
                this.gameObjects[i].draw(this.ctx);
            }
        }
    }
}



export {Engine}