/** @type {HTMLCanvasElement} */
export default class EnemyNote {
    constructor(ctx, speed) {
        let x = 810;
        let y = Math.random() * 600;
        this.width = 80;
        this.height = 150;
        this.ctx = ctx;
        this.letter = this.getRandomLetter();
        this.speed = speed;
        this.image = new Image();
        this.image.src = "chordWithoutTail.png";
    }

    getRandomLetter() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.font = "30px solid";
        this.ctx.fillText(this.letter, this.x, this.y);
    }

    update() {
        this.x -= this.speed;
    }
} 