import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography, Shadow } from '../constants/theme';
import { ConversationTypeOption } from '../types/scenario';

interface Props {
  option: ConversationTypeOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const ConversationTypeCard: React.FC<Props> = ({ option, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{option.icon}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, isSelected && styles.selectedText]}>
            {option.title}
          </Text>
          <Text style={styles.duration}>{option.duration}</Text>
        </View>
        <Text style={[styles.description, isSelected && styles.selectedDescription]}>
          {option.description}
        </Text>
      </View>

      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadow.small,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
    ...Shadow.medium,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
  },
  selectedText: {
    color: Colors.primary,
  },
  duration: {
    ...Typography.caption,
    color: Colors.textLight,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  selectedDescription: {
    color: Colors.text,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  checkmarkText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});