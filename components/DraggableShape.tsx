import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CELL_MARGIN, CELL_SIZE } from '../constants';

export default function DraggableShape({ shape }: { shape: number[][] }) {
  return (
    <View style={styles.container}>
      {shape.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            <View
              key={j}
              style={[styles.cell, cell ? styles.filled : styles.empty]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    borderRadius: 3,
  },
  empty: {
    backgroundColor: '#2E2E3F',
  },
  filled: {
    backgroundColor: '#3D8BFF',
  },
});
