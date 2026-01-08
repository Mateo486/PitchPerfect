import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadow } from '../constants/theme';
import { FeedbackScore } from '../types/feedback';

interface Props {
  score: FeedbackScore;
}

export const ScoreCard: React.FC<Props> = ({ score }) => {
  const percentage = (score.score / score.maxScore) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 80) return Colors.success;
    if (percentage >= 60) return Colors.warning;
    return Colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{score.icon}</Text>
        <Text style={styles.category}>{score.category}</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: getScoreColor() }]}>
          {score.score}
        </Text>
        <Text style={styles.maxScore}>/{score.maxScore}</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: getScoreColor() }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  category: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  score: {
    ...Typography.h1,
    fontWeight: 'bold',
  },
  maxScore: {
    ...Typography.h3,
    color: Colors.textLight,
    marginLeft: Spacing.xs,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});