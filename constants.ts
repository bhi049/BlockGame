// Define CELL_MARGIN and CELL_SIZE here to avoid circular import
export const CELL_MARGIN = 3; // Increased margin for better spacing
export const CELL_SIZE = 30;  // Increased cell size for larger grid and shapes

import { GRID_SIZE } from "./logic/gameEngine";

export const calculateGridCell = (
  screenX: number,
  screenY: number,
  gridX: number,
  gridY: number
): { i: number; j: number } => {
  const effectiveCellSize = CELL_SIZE + CELL_MARGIN * 2;

  const j = Math.floor((screenX - gridX) / effectiveCellSize);
  const i = Math.floor((screenY - gridY) / effectiveCellSize);

  // Clamp to ensure safe range
  const clampedI = Math.max(0, Math.min(i, GRID_SIZE - 1));
  const clampedJ = Math.max(0, Math.min(j, GRID_SIZE - 1));

  return { i: clampedI, j: clampedJ };
};
