import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { KeyMoment } from '../types/feedback';

interface Props {
  moment: KeyMoment;
}

export const KeyMomentCard: React.FC<Props> = ({ moment }) => {
  const getSentimentColor = () => {
    switch (moment.sentiment) {
      case 'positive':
        return Colors.success;
      case 'negative':
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };

  const getSentimentIcon = () => {
    switch (moment.sentiment) {
      case 'positive':
        return '✓';
      case 'negative':
        return '!';
      default:
        return '→';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor() }]}>
          <Text style={styles.sentimentIcon}>{getSentimentIcon()}</Text>
        </View>
        <Text style={styles.timestamp}>{moment.timestamp}</Text>
      </View>
      
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"{moment.quote}"</Text>
      </View>
      
      <Text style={styles.feedback}>{moment.feedback}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sentimentBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  sentimentIcon: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  quoteContainer: {
    backgroundColor: Colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  quoteText: {
    ...Typography.body,
    color: Colors.text,
    fontStyle: 'italic',
  },
  feedback: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});