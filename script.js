// if we switch pov for the final boss fight, then we should make 
// this canvas hidden
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 650; 

// initialize the instrument images and their starting locations
ctx.font = "80px Georgia";
ctx.fillStyle = '#DAA06D';
ctx.fillRect(0, CANVAS_HEIGHT - 120, CANVAS_WIDTH, 120);
ctx.fillText('🎸', 0, CANVAS_HEIGHT - 30, 180);
ctx.fillText('🥁', 120, CANVAS_HEIGHT - 30, 180);
ctx.fillText('🎹', 240, CANVAS_HEIGHT - 30, 180);
ctx.fillText('🎤', 360, CANVAS_HEIGHT - 30, 180);
ctx.fillText('🎻', 480, CANVAS_HEIGHT - 30, 180);
// music note class
// music note generation - possibly different js script file 

// keyboard controls - also possibly different js script file
    // shooting music beams to kill the music notes

// update function for each class
// draw function for each class

function animate() {
    // call update on the objects
    requestAnimationFrame(animate); // creates an animation loop
}

// animate() 