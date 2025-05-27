import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ShapePreview({ shape }: { shape: number[][] }) {
  return (
    <View style={styles.preview}>
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

const CELL_SIZE = 20;
const CELL_MARGIN = 1;

const styles = StyleSheet.create({
  preview: {
    marginTop: 10,
    padding: 5,
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
