import EnemyNote from "./EnemyNote.js";
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 15;
let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'sky.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'background.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'foreground.png';

const staggerFrames = 5;

window.addEventListener('load', function() {
    
class Player {
    constructor(x, y, speed) {
         this.x = x;
        this.y = y;
        this.speed = speed;
        this.spriteWidth = 575; // placeholder value for each cell;
        this.spriteHeight = 523; // placeholder value SpriteSheet height / rows
        this.width = this.spriteWidth / 2; 
        this.height = this.spriteHeight / 2; 
        this.image = new Image();
        this.image.src = 'shadow_dog.png';
        // this.image = new Image();
        this.frameX = 0; // 0 or this.width;
        // *** this will be 0 later based on the frames Vini gives
        this.frameY = this.spriteHeight * 3;
    }

    draw(ctx) {
        if (gameFrame % staggerFrames === 0) {
            // change this to the frames that Vini gives
            // * 7 should change based on how many frames Vini gives
            if (this.frameX < this.spriteWidth * 7) {
                this.frameX += this.spriteWidth;
            } else {
                this.frameX = 0;
            }
        }
            ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        
        update() {
            this.x = this.speed;        
        }
    }

    const player = new Player(120, 325, 1);
    let speed = 1;
    
    const enemyNote = new EnemyNote(ctx, speed);

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        player.draw(ctx);
        player.update();
        enemyNote.draw(ctx);
        enemyNote.update();
        
        requestAnimationFrame(animate);  
        gameFrame--;
    }
    
    animate();
    
});