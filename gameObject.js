
export class gameObject
{
    constructor(x, y, width, height, physics = false, render = false)
    {
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height
        this.physics = physics;
        this.render = render;
    }


    draw(ctx)
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}