import React, { forwardRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CELL_MARGIN, CELL_SIZE } from '../constants';

const GameGrid = forwardRef<View, { grid: number[][]; onCellTap: (x: number, y: number) => void }>(
  ({ grid, onCellTap }, ref) => {
    return (
      <View ref={ref} style={styles.grid}>
        {grid.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((cell, j) => (
              <TouchableOpacity
                key={j}
                style={[styles.cell, cell ? styles.filled : styles.empty]}
                onPress={() => onCellTap(i, j)}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }
);

export default GameGrid;

const styles = StyleSheet.create({
  grid: {
    padding: 8,
    backgroundColor: '#1E1E2F',
    borderWidth: 2,
    borderColor: '#3D8BFF',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    borderRadius: 4,
  },
  empty: {
    backgroundColor: '#2E2E3F',
  },
  filled: {
    backgroundColor: '#3D8BFF',
  },
});
