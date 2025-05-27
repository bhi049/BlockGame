export const GRID_SIZE = 10;

export function createEmptyGrid(): number[][] {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

export const SHAPES = [
  [[1, 1], [1, 1]], // Square
  [[1, 1, 1]],      // Horizontal line
  [[1], [1], [1]],  // Vertical line
  [[1, 0], [1, 1]], // L shape
];

export function canPlaceShape(grid: number[][], shape: number[][], x: number, y: number): boolean {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        const newX = x + i;
        const newY = y + j;
        if (
          newX < 0 || newY < 0 ||
          newX >= GRID_SIZE || newY >= GRID_SIZE ||
          grid[newX][newY] === 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function placeShape(grid: number[][], shape: number[][], x: number, y: number): number[][] {
  const newGrid = grid.map(row => [...row]);
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        newGrid[x + i][y + j] = 1;
      }
    }
  }
  return newGrid;
}

export function clearLines(grid: number[][]): { newGrid: number[][]; linesCleared: number } {
  const newGrid = grid.map(row => [...row]);
  let linesCleared = 0;

  // Clear full rows
  for (let i = 0; i < GRID_SIZE; i++) {
    if (newGrid[i].every(cell => cell === 1)) {
      newGrid[i] = Array(GRID_SIZE).fill(0);
      linesCleared++;
    }
  }

  // Clear full columns
  for (let j = 0; j < GRID_SIZE; j++) {
    let isFullColumn = true;
    for (let i = 0; i < GRID_SIZE; i++) {
      if (newGrid[i][j] === 0) {
        isFullColumn = false;
        break;
      }
    }
    if (isFullColumn) {
      for (let i = 0; i < GRID_SIZE; i++) {
        newGrid[i][j] = 0;
      }
      linesCleared++;
    }
  }

  return { newGrid, linesCleared };
}

function transpose(matrix: number[][]): number[][] {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}
