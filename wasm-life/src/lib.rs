
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<u8>,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> Universe {
        let cells = (0..width * height)
            .map(|_| if js_sys::Math::random() < 0.5 { 0 } else { 1 })
            .collect();
        Universe { width, height, cells }
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let live_neighbors = self.live_neighbor_count(row, col);
                let cell = self.cells[idx];
                next[idx] = match (cell, live_neighbors) {
                    (1, x) if x < 2 => 0,
                    (1, 2) | (1, 3) => 1,
                    (1, x) if x > 3 => 0,
                    (0, 3) => 1,
                    (otherwise, _) => otherwise,
                };
            }
        }
        self.cells = next;
    }

    pub fn width(&self) -> u32 {
        self.width
    }
    pub fn height(&self) -> u32 {
        self.height
    }
    pub fn cells_ptr(&self) -> *const u8 {
        self.cells.as_ptr()
    }

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn live_neighbor_count(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }
                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx];
            }
        }
        count
    }
}
