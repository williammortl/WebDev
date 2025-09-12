let memory;
import wasmInit, { Universe } from '../pkg/wasm_life.js';

const CELL_SIZE = 14; // px
const GRID_COLOR = '#222';
const DEAD_COLOR = '#111';
const ALIVE_COLORS = [
    '#00FF99', // green (current)
    '#FF0000', // red
    '#FFFF00', // yellow
    '#F50CC7', // pink
    '#0000FF', // blue
    '#6F4E37', // brown
    '#800080', // purple
    '#008080', // teal
    '#FFA500'  // orange
];

let width = 120;
let height = 80;

let canvas, ctx, universe;
let aliveColor = '';

function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
}

function drawCells() {
    const cellsPtr = universe.cells_ptr();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();

    // 50% chance to use one color for all alive cells, 50% chance to randomize per cell
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = row * width + col;
            if (cells[idx] === 0) {
                ctx.fillStyle = DEAD_COLOR;
            } else {
                if (aliveColor == '') {
                    ctx.fillStyle = ALIVE_COLORS[Math.floor(Math.random() * ALIVE_COLORS.length)];
                } else {
                    ctx.fillStyle = aliveColor;
                }
            }
            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}

function renderLoop() {
    universe.tick();
    drawGrid();
    drawCells();
    setTimeout(renderLoop, 100); // 100ms per frame (10 FPS)
}

function init() {
    // Remove any existing canvas (if refreshing or re-calling init)
    if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
    }
    // Calculate width and height based on window size
    width = Math.floor(window.innerWidth / (CELL_SIZE + 1));
    height = Math.floor(window.innerHeight / (CELL_SIZE + 1));
    canvas = document.createElement('canvas');
    canvas.width = (CELL_SIZE + 1) * width + 1;
    canvas.height = (CELL_SIZE + 1) * height + 1;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    wasmInit().then(wasmModule => {
        universe = new Universe(width, height);
        memory = wasmModule.memory;
        renderLoop();
    });

    // possibly select a single color
    const useSingleColor = Math.random() < (ALIVE_COLORS.length/(ALIVE_COLORS.length + 1));
    if (useSingleColor) {
        aliveColor = ALIVE_COLORS[Math.floor(Math.random() * ALIVE_COLORS.length)];
    } else {
        aliveColor = '';
    }
}

// Call init on page load and on window resize (debounced)
window.addEventListener('DOMContentLoaded', init);
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 200);
});
