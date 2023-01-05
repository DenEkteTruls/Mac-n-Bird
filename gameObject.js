
export class gameObject
{
    constructor(x, y, w, h, render = false)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.render = render;

        this.eventHandlers = [];
    }


    addEventHandler(eventHandler)
    {
        this.eventHandlers.push(eventHandler);
    }


    eventHandler()
    {
        for(let i = 0; i < this.eventHandlers.length; i++)
        {
            this.eventHandlers[i].handle(this);
        }
    }


    draw(ctx)
    {
        if(this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        } else {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
}