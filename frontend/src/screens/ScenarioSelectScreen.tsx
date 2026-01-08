import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ConversationTypeCard } from '../components/ConversationTypeCard';
import { CompanySelector } from '../components/CompanySelector';
import { Button } from '../components/Button';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { ConversationType, Company, ConversationTypeOption } from '../types/scenario';
import { RootStackParamList } from '../types/navigation';

type ScenarioSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScenarioSelect'>;

interface Props {
  navigation: ScenarioSelectScreenNavigationProp;
}


const CONVERSATION_TYPES: ConversationTypeOption[] = [
  {
    id: 'elevator_pitch',
    title: 'Elevator Pitch',
    description: 'Quick 30-60 second introduction at a career fair or networking event',
    icon: '🚀',
    duration: '1-2 min',
  },
  {
    id: 'coffee_chat',
    title: 'Coffee Chat',
    description: 'Casual conversation to learn about a company and role',
    icon: '☕',
    duration: '5-10 min',
  },
  {
    id: 'phone_screen',
    title: 'Phone Screen',
    description: 'Initial screening call with a recruiter',
    icon: '📞',
    duration: '10-15 min',
  },
  {
    id: 'interview',
    title: 'Full Interview',
    description: 'Comprehensive behavioral and technical interview',
    icon: '💼',
    duration: '15-30 min',
  },
];

export const ScenarioSelectScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<ConversationType | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [recruiterContext, setRecruiterContext] = useState('');

  const canStart = selectedType !== null && selectedCompany !== null;

  const handleStart = () => {
    if (canStart) {
      navigation.navigate('Conversation', {
        conversationType: selectedType,
        company: selectedCompany,
        recruiterContext,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Set Up Your Practice</Text>
          <Text style={styles.subtitle}>
            Configure your interview scenario and get ready to practice
          </Text>
        </View>

        {/* Conversation Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conversation Type</Text>
          <Text style={styles.sectionDescription}>
            Choose the type of conversation you want to practice
          </Text>
          
          {CONVERSATION_TYPES.map((option) => (
            <ConversationTypeCard
              key={option.id}
              option={option}
              isSelected={selectedType === option.id}
              onSelect={() => setSelectedType(option.id)}
            />
          ))}
        </View>

        {/* Company Section */}
        <View style={styles.section}>
          <CompanySelector
            selectedCompany={selectedCompany}
            onSelect={setSelectedCompany}
          />
        </View>

        {/* Recruiter Context Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recruiter Context</Text>
          <Text style={styles.sectionDescription}>
            Add details about the recruiter (optional but helpful!)
          </Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Stanford graduate, worked at Google for 5 years, originally from India, interested in AI/ML projects..."
            value={recruiterContext}
            onChangeText={setRecruiterContext}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>💡 Examples to include:</Text>
            <Text style={styles.exampleText}>• Alma mater or university</Text>
            <Text style={styles.exampleText}>• Previous work experience</Text>
            <Text style={styles.exampleText}>• Nationality or cultural background</Text>
            <Text style={styles.exampleText}>• Areas of interest or expertise</Text>
            <Text style={styles.exampleText}>• Communication style preferences</Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Start Practice Session"
            onPress={handleStart}
            size="large"
            disabled={!canStart}
            style={styles.startButton}
          />
          
          {!canStart && (
            <Text style={styles.helpText}>
              Please select a conversation type and company to continue
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Typography.body,
    minHeight: 120,
  },
  examplesContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  examplesTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  exampleText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  buttonContainer: {
    marginTop: Spacing.lg,
  },
  startButton: {
    width: '100%',
  },
  helpText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});