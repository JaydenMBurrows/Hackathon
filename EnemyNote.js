/** @type {HTMLCanvasElement} */
export default class EnemyNote {
    constructor(ctx, speed, y, letter) {
        this.x = 810;
        this.y = y;
        this.width = 80;
        this.height = 150;
        this.ctx = ctx;
        this.letter = letter;
        this.speed = speed;
        this.image = new Image();
        this.image.src = "chordWithoutTail.png";
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.font = "30px solid";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.letter, this.x + 26, this.y + 122);
    }

    update() {
        this.x -= this.speed;
    }
} 