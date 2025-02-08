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
    
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        
        update() {
            this.speed = gameSpeed * this.speedModifier;
            this.x = gameFrame * this.speed % this.width;
            }
    
        draw() {    
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    
    
    }

    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.5);
    const layer3 = new Layer(backgroundLayer3, 1);

    const layerObjects = [layer1, layer2, layer3];
    
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
            this.frameY = 0; // 0 or this.height;
            // this.frameX = 0;
            // this.frameY = 0;
            // this.image.src = 'shadow_dog.png';
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        
        update() {
            this.x = this.speed;        
        }
    }

    let playerState = 'run';

    const player = new Player(120, 325, 1);

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        layerObjects.forEach(object => {
            object.update();
            object.draw();
        });
        player.draw(ctx);
        player.update();
        requestAnimationFrame(animate);  
        gameFrame--;
    }
    
    animate();
    
});