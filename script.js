import EnemyNote from "./EnemyNote.js";
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1350;
const CANVAS_HEIGHT = canvas.height = 650;
let gameSpeed = 15;
let gameFrame = 0;
let animationId;
let score = 0;

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
        this.player = new Player(10, 350, 1);
        this.input = new InputHandler(enemyNotes, enemyNoteLetters);
    }

    update() {
        this.player.update();
        if (gameFrame % staggerNotes === 0) {
            let y = Math.random() * 500;
            let letter = getRandomLetter();
            enemyNotes.push(new EnemyNote(ctx, speed, y, letter));
            enemyNoteLetters.push(letter);
        }
        enemyNotes.forEach(enemyNote => {
            enemyNote.update(); 
        });
        gameFrame++;
    }

    draw(ctx) {
        ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.player.draw(ctx);
        enemyNotes.forEach(enemyNote => {
            enemyNote.draw(ctx);
        });
        
    }
}    

class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.spriteWidth = 406; // placeholder value for each cell;
        this.spriteHeight = 403; // placeholder value SpriteSheet height / rows
        this.width = this.spriteWidth / 2; 
        this.height = this.spriteHeight / 2; 
        this.image = new Image();
        this.image.src = 'sprites.png';
        // this.image = new Image();
        this.frameX = 0; // 0 or this.width;
        // *** this will be 0 later based on the frames Vini gives
        this.frameY = 0;
    }

    draw(ctx) {
        if (gameFrame % staggerFrames === 0) {
            // change this to the frames that Vini gives
            // * 7 should change based on how many frames Vini gives
            if (this.frameX < this.spriteWidth) {
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
    } // Player

    class InputHandler {
        constructor() {
            this.keys = [];
            document.addEventListener('keydown', e => {
                if (this.isAlphabet(e.key)) {
                    this.keys.push(e.key);
                }
            });

            document.addEventListener('keyup', e => {
                if (this.isAlphabet(e.key) && this.keys.indexOf(e.key) != -1) {
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

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update();
        game.draw(ctx);
        animationId = requestAnimationFrame(animate);  
    }

    animate();
    });