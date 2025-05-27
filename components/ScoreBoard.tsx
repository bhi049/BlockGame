import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ScoreBoard({ score }: { score: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Score</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#aaa',
  },
  score: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
