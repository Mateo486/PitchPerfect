import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { FeedbackInsight } from '../types/feedback';

interface Props {
  insight: FeedbackInsight;
}

export const InsightCard: React.FC<Props> = ({ insight }) => {
  const getBackgroundColor = () => {
    switch (insight.type) {
      case 'strength':
        return '#10b98115'; // Green with transparency
      case 'improvement':
        return '#f59e0b15'; // Orange with transparency
      case 'tip':
        return '#6366f115'; // Blue with transparency
      default:
        return Colors.surface;
    }
  };

  const getBorderColor = () => {
    switch (insight.type) {
      case 'strength':
        return Colors.success;
      case 'improvement':
        return Colors.warning;
      case 'tip':
        return Colors.primary;
      default:
        return Colors.border;
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getBorderColor(),
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{insight.icon}</Text>
        <Text style={styles.title}>{insight.title}</Text>
      </View>
      <Text style={styles.description}>{insight.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});