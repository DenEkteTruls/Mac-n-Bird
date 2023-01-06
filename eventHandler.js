
import { gameObject } from "./gameObject.js";


class eventHandler
{
    constructor()
    {
        this.eventQueue = [];
    }


    handle()
    {
        console.log("### EMPTY HANDLER ###");
    }


    reset()
    {
        this.eventQueue = [];
    }


    printEventQueue()
    {
        console.log(this.eventQueue);
    }
}





export class KeyEventHandler extends eventHandler
{
    constructor(key)
    {
        super();
        this.key = key;
        this.checkKeydown();
    }


    handle(object)
    {
        for(let event of this.eventQueue)
        {
            if(event.key == ' ') {
                object.new_jump = true;
                object.time_since_jump = Date.now();
                this.eventQueue.splice(this.eventQueue.indexOf(event), 1);
            }
        }
    }


    checkKeydown()
    {
        let a = this.eventQueue;
        let key = this.key;
        document.onkeydown = function(e) {
            if(e.key == key) {
                a.push(e);
            }
        }
        this.eventQueue.concat(a);
    }
}





export class JumpEventHandler extends eventHandler
{
    constructor()
    {
        super();
        this.last_time = Date.now();
    }


    reset()
    {
        this.last_time = Date.now();
    }


    handle(object)
    {
        if(object.new_time && object.alive) {
            object.new_time = false;
            object.playerSpeed = 7;
            this.last_time = Date.now();
        }
    }
}





export class GravityEventHandler extends eventHandler
{
    constructor(height, collisionHandler = true)
    {
        super();
        this.height = height;
        this.last_time = Date.now();
        this.collisionHandler = collisionHandler;
    }


    reset()
    {
        this.last_time = Date.now();
    }


    handle(object)
    {
        this.gravity(object);
    }


    gravity(object)
    {
        let calc = 6 * ((this.last_time - Date.now()) / 1000) ** 2;
        
        if(object.new_jump) {
            this.last_time = Date.now();
            object.new_jump = false; object.new_time = true;
        }

        if(this.collisionHandler) {
            if((object.y + object.h / 1.3) >= this.height) {
                this.last_time = Date.now();
                object.alive = false;
                return;
            }
        }

        object.y += calc - object.playerSpeed;
        if(object.playerSpeed > 0) object.playerSpeed -= calc;
    }
}





export class CollisionHandler extends gameObject
{
    constructor(engine)
    {
        super();
        this.engine = engine;
    }

    

    handle(object)
    {
        if(!object.alive) {
            this.engine.uni.speed = 0;
            this.engine.running = false;
        }

        this.checkCollision(object);
    }



    checkCollision(o)
    {
        for(let go of this.engine.gameObjects)
        {
            if(go == o) return;
            
            if(o.x+o.w/2 > go.x && o.x+o.w/2 < go.x+go.w) {
                if(o.y+o.h/2 > go.y && o.y < go.y+go.h/1.2) {
                    console.log("COLLIDE");
                    o.alive = false;
                }
            }
        }
    }    
}