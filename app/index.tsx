import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  StyleSheet,
  View
} from "react-native";
import DraggableShape from "../components/DraggableShape";
import GameGrid from "../components/GameGrid";
import ScoreBoard from "../components/ScoreBoard";
import { calculateGridCell } from "../constants";
import {
  canPlaceShape,
  clearLines,
  createEmptyGrid,
  GRID_SIZE,
  placeShape,
  SHAPES,
} from "../logic/gameEngine";

export default function HomeScreen() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [score, setScore] = useState(0);
  const [currentShape, setCurrentShape] = useState(SHAPES[0]);
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const [shapeSize, setShapeSize] = useState({ width: 0, height: 0 });

  const gridRef = useRef<View>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const layout = evt.nativeEvent;
      setTouchOffset({
        x: layout.locationX,
        y: layout.locationY,
      });
      shapeRef.current?.measure((_x, _y, width, height) => {
        setShapeSize({ width, height });
      });
      pan.extractOffset();
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (evt, gesture) => {
      const moveX = gesture.moveX;
      const moveY = gesture.moveY;

      // ✅ Correct use of callback with 4 parameters
      gridRef.current?.measureInWindow((gridX, gridY, _w, _h) => {
        const shapeOffsetX = shapeSize.width / 2;
        const shapeOffsetY = shapeSize.height / 2;

        const dropX = moveX - shapeOffsetX;
        const dropY = moveY - shapeOffsetY;

        const cell = calculateGridCell(dropX, dropY, gridX, gridY);
        if (cell === undefined) {
          console.log("Drop rejected: could not calculate grid cell");
          Alert.alert("Invalid move!");
          pan.setValue({ x: 0, y: 0 });
          return;
        }
        const { i, j } = cell;

        console.log("Drop coords:", { dropX, dropY });
        console.log("Grid coords:", { i, j });

        if (
          i < 0 ||
          j < 0 ||
          i + currentShape.length > GRID_SIZE ||
          j + currentShape[0].length > GRID_SIZE
        ) {
          console.log("Drop rejected: out of grid bounds");
          Alert.alert("Invalid move!");
          pan.setValue({ x: 0, y: 0 });
          return;
        }

        if (canPlaceShape(grid, currentShape, i, j)) {
          const newGrid = placeShape(grid, currentShape, i, j);
          const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
          setGrid(clearedGrid);
          setScore(score + linesCleared * 10);
          setCurrentShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
        } else {
          console.log("Drop rejected: shape doesn't fit");
          Alert.alert("Invalid move!");
        }

        pan.setValue({ x: 0, y: 0 });
      });
    },
  });

  const shapeRef = useRef<View>(null);

  return (
    <View style={styles.container}>
      <ScoreBoard score={score} />
      <GameGrid ref={gridRef} grid={grid} onCellTap={() => {}} />
      <Animated.View
        ref={shapeRef}
        {...panResponder.panHandlers}
        style={[styles.draggable, { transform: pan.getTranslateTransform() }]}
      >
        <DraggableShape shape={currentShape} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F2B",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 200,
  },
  previewLabel: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
  },
  draggable: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
});
