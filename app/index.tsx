import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import GameGrid from '../components/GameGrid';
import ScoreBoard from '../components/ScoreBoard';
import ShapePreview from '../components/ShapePreview';
import { canPlaceShape, clearLines, createEmptyGrid, placeShape, SHAPES } from '../logic/gameEngine';

export default function HomeScreen() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [score, setScore] = useState(0);
  const [currentShape, setCurrentShape] = useState(SHAPES[0]);

  const handleCellTap = (x: number, y: number) => {
    if (!canPlaceShape(grid, currentShape, x, y)) {
      Alert.alert('Invalid move!');
      return;
    }
    const newGrid = placeShape(grid, currentShape, x, y);
    const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
    setGrid(clearedGrid);
    setScore(score + linesCleared * 10);
    setCurrentShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
  };

  return (
    <View style={styles.container}>
      <ScoreBoard score={score} />
      <GameGrid grid={grid} onCellTap={handleCellTap} />
      <Text style={styles.previewLabel}>Next Shape:</Text>
      <ShapePreview shape={currentShape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F2B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  previewLabel: {
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
  },
});
