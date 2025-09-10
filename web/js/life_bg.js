let memory;
import init, { Universe } from '../pkg/wasm_life.js';

const CELL_SIZE = 6; // px
const GRID_COLOR = '#222';
const DEAD_COLOR = '#111';
const ALIVE_COLOR = '#00FF99';

const width = 120;
const height = 80;

const canvas = document.createElement('canvas');
canvas.width = (CELL_SIZE + 1) * width + 1;
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

let universe;

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

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = row * width + col;
            ctx.fillStyle = cells[idx] === 0 ? DEAD_COLOR : ALIVE_COLOR;
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

init().then(wasmModule => {
    universe = new Universe(width, height);
    memory = wasmModule.memory;
    renderLoop();
});
