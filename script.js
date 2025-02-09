import EnemyNote from "./EnemyNote.js";
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1350;
const CANVAS_HEIGHT = canvas.height = 650;
let gameFrame = 0;
let score = 0;
let gameStatus = true;

const staggerFrames = 10;
let staggerNotes = 200;

let background = new Image();
background.src = 'bg1.png';

window.addEventListener('load', function() {

let speed = 1; // should increase as game goes on
let enemyNotes = [];
let enemyNoteLetters = []; // keeps track of the letters of each corresponding note

function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.byte1 = new Byte(200, 300, 0, 403); //guitarist
        this.byte2 = new Byte(335, 220, 0, 0); //drummer
        this.byte3 = new Byte(480, 300, 812, 0); //singer
        this.input = new InputHandler(enemyNotes, enemyNoteLetters);
    }

    update() {
        if (gameFrame % staggerNotes === 0) {
            let y = Math.random() * 500;
            let letter = getRandomLetter();
            enemyNotes.push(new EnemyNote(ctx, speed, y, letter));
            enemyNoteLetters.push(letter);
        }
        enemyNotes.forEach(enemyNote => {
            enemyNote.update(); 
            if (enemyNote.x < 856) { // 886+10
                gameStatus = false;
            }
        });
        gameFrame++;
    }

    draw(ctx) {
        ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.byte1.draw(ctx);
        this.byte2.draw(ctx);
        this.byte3.draw(ctx);
        enemyNotes.forEach(enemyNote => {
            enemyNote.draw(ctx);
        });
        
    }
}    

class Byte {
    constructor(x, y, frameX, frameY) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 406; // placeholder value for each cell;
        this.spriteHeight = 403; // placeholder value SpriteSheet height / rows
        this.width = this.spriteWidth / 2; 
        this.height = this.spriteHeight / 2; 
        this.image = new Image();
        this.image.src = 'spritesNew.png';
        // this.image = new Image();
        this.frameX = frameX; // the first frame
        // *** this will be 0 later based on the frames Vini gives
        this.frameY = frameY;
        this.positionX = frameX;
    }

    draw(ctx) {
        if (gameFrame % staggerFrames === 0) {
            // change this to the frames that Vini gives
            // * 7 should change based on how many frames Vini gives
            if (this.positionX < this.spriteWidth + this.frameX) {
                this.positionX += this.spriteWidth;
            } else {
                this.positionX = this.frameX;
            }
        }
            ctx.drawImage(this.image, this.positionX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        
    } // Byte

    class InputHandler {
        constructor() {
            this.keys = [];
            document.addEventListener('keydown', e => {
                if (this.isAlphabet(e.key)) {
                    this.keys.push(e.key);
                }
            });

         document.addEventListener('keyup', e => {
            if (this.isAlphabet(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                if (enemyNoteLetters.indexOf(e.key) != -1) {
                    enemyNoteLetters.splice(enemyNoteLetters.indexOf(e.key), 1);
                    enemyNotes.splice(enemyNotes.indexOf(e.key), 1);
                }   
            }
        });
    }
    
        isAlphabet(char) {
            var alphabet = "abcdefghijklmnopqrstuvwxyz";
            for (let i = 0; i < alphabet.length; i++) {
                if (char === alphabet.charAt(i)) {
                    return true;
                }
            }
            return false;
        }
    } // inputHandler

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    var anim;
    var timer;
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update();
        game.draw(ctx);
        if (gameStatus){
            requestAnimationFrame(animate);
        } else {
            drawGameOver();
        }
    }

    function drawGameOver() {
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER, you lost! :(', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    }

    animate();
});