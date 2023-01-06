
import { Engine } from "./engine.js";
import { Player } from "./player.js";
import { KeyEventHandler, 
         JumpEventHandler,
         GravityEventHandler,
         CollisionHandler
        } from "./eventHandler.js";


let engine = new Engine("game");
engine.setBackgroundImage("media/back2.jpg");

let player = new Player(100, 300-20, 80, 80, true);
player.addEventHandler(new KeyEventHandler(' '));
player.addEventHandler(new JumpEventHandler());
player.addEventHandler(new GravityEventHandler(engine.canvas.height, true));
player.addEventHandler(new CollisionHandler(engine));
engine.add_gameObject(player);



function gameLoop()
{
    engine.render_gameObjects();

    window.requestAnimationFrame(gameLoop);
    if(!engine.running) window.location.href = "/";
}


gameLoop();