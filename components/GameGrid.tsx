import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CELL_SIZE = 30;

export default function GameGrid({ grid, onCellTap }: {
  grid: number[][];
  onCellTap: (x: number, y: number) => void;
}) {
  return (
    <View style={styles.grid}>
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
    margin: 1,
    borderRadius: 4,
  },
  empty: {
    backgroundColor: '#2E2E3F',
  },
  filled: {
    backgroundColor: '#3D8BFF',
  },
});
