import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Colors, Spacing, Typography, BorderRadius, Shadow } from '../constants/theme';
import { ConversationFeedback } from '../types/feedback';
import { ScoreCard } from '../components/ScoreCard';
import { InsightCard } from '../components/InsightCard';
import { KeyMomentCard } from '../components/KeyMomentCard';
import { Button } from '../components/Button';

type FeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedback'>;
type FeedbackScreenRouteProp = RouteProp<RootStackParamList, 'Feedback'>;

interface Props {
  navigation: FeedbackScreenNavigationProp;
  route: FeedbackScreenRouteProp;
}

export const FeedbackScreen: React.FC<Props> = ({ navigation, route }) => {
  const { conversationId } = route.params;
  const [feedback, setFeedback] = useState<ConversationFeedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch feedback from backend
    // For now, using mock data
    setTimeout(() => {
      const mockFeedback: ConversationFeedback = {
        id: conversationId,
        overallScore: 78,
        scores: [
          {
            category: 'Communication',
            score: 85,
            maxScore: 100,
            icon: '💬',
          },
          {
            category: 'Clarity',
            score: 72,
            maxScore: 100,
            icon: '🎯',
          },
          {
            category: 'Enthusiasm',
            score: 90,
            maxScore: 100,
            icon: '⚡',
          },
          {
            category: 'Relevance',
            score: 65,
            maxScore: 100,
            icon: '🔍',
          },
        ],
        insights: [
          {
            type: 'strength',
            title: 'Strong Opening',
            description: 'You provided a confident and concise introduction that immediately captured attention.',
            icon: '✨',
          },
          {
            type: 'strength',
            title: 'Good Energy',
            description: 'Your enthusiasm for the role came through clearly, showing genuine interest.',
            icon: '🚀',
          },
          {
            type: 'improvement',
            title: 'Connect to Company Values',
            description: 'Try to explicitly mention how your experience aligns with the company\'s mission and values.',
            icon: '🎯',
          },
          {
            type: 'improvement',
            title: 'Use Specific Examples',
            description: 'When discussing your skills, provide concrete examples with measurable outcomes (e.g., "increased efficiency by 30%").',
            icon: '📊',
          },
          {
            type: 'tip',
            title: 'The STAR Method',
            description: 'For behavioral questions, structure your answers using Situation, Task, Action, Result to tell compelling stories.',
            icon: '💡',
          },
          {
            type: 'tip',
            title: 'Ask Thoughtful Questions',
            description: 'Prepare 2-3 questions about the role, team, or company culture to show your genuine interest.',
            icon: '❓',
          },
        ],
        keyMoments: [
          {
            timestamp: '0:45',
            quote: 'I\'ve been passionate about AI and machine learning for the past three years.',
            feedback: 'Great way to show your genuine interest! Consider adding a specific project or achievement to make this even stronger.',
            sentiment: 'positive',
          },
          {
            timestamp: '2:15',
            quote: 'I have experience with various projects.',
            feedback: 'This is too vague. Instead, say something like "I led a team of 4 to build a recommendation system that increased user engagement by 25%."',
            sentiment: 'negative',
          },
          {
            timestamp: '4:30',
            quote: 'I really admire your company\'s commitment to innovation.',
            feedback: 'Good start, but try to be more specific about which innovations or recent projects caught your attention.',
            sentiment: 'neutral',
          },
        ],
        summary: 'Overall, you did a solid job presenting yourself! Your enthusiasm and communication skills stood out. To take it to the next level, focus on providing more specific examples and connecting your experience directly to the company\'s values and needs.',
        nextSteps: [
          'Research specific company projects and reference them in your answers',
          'Prepare 3-4 STAR method stories for common behavioral questions',
          'Practice quantifying your achievements with specific metrics',
          'Develop thoughtful questions about team dynamics and growth opportunities',
        ],
        conversationLength: '5:30',
        completedAt: new Date(),
      };
      
      setFeedback(mockFeedback);
      setLoading(false);
    }, 1500);
  }, [conversationId]);

  const getOverallGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: Colors.success, label: 'Excellent' };
    if (score >= 80) return { grade: 'B', color: Colors.success, label: 'Very Good' };
    if (score >= 70) return { grade: 'C', color: Colors.warning, label: 'Good' };
    if (score >= 60) return { grade: 'D', color: Colors.warning, label: 'Needs Work' };
    return { grade: 'F', color: Colors.error, label: 'Keep Practicing' };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>⏳</Text>
        <Text style={styles.loadingText}>Analyzing your performance...</Text>
      </View>
    );
  }

  if (!feedback) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load feedback</Text>
      </View>
    );
  }

  const overallGrade = getOverallGrade(feedback.overallScore);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Overall Score Header */}
      <View style={styles.overallScoreCard}>
        <Text style={styles.celebrationEmoji}>🎉</Text>
        <Text style={styles.completedText}>Practice Session Complete!</Text>
        
        <View style={styles.gradeContainer}>
          <View style={[styles.gradeBadge, { backgroundColor: overallGrade.color }]}>
            <Text style={styles.gradeText}>{overallGrade.grade}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <Text style={styles.scoreNumber}>{feedback.overallScore}/100</Text>
            <Text style={styles.scoreLabel}>{overallGrade.label}</Text>
          </View>
        </View>
        
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>⏱️ {feedback.conversationLength}</Text>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.metaText}>
            {feedback.completedAt.toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{feedback.summary}</Text>
        </View>
      </View>

      {/* Detailed Scores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
        {feedback.scores.map((score, index) => (
          <ScoreCard key={index} score={score} />
        ))}
      </View>

      {/* Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights & Tips</Text>
        {feedback.insights.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </View>

      {/* Key Moments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Moments</Text>
        <Text style={styles.sectionDescription}>
          Notable moments from your conversation with specific feedback
        </Text>
        {feedback.keyMoments.map((moment, index) => (
          <KeyMomentCard key={index} moment={moment} />
        ))}
      </View>

      {/* Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Action Items for Next Time</Text>
        <View style={styles.nextStepsCard}>
          {feedback.nextSteps.map((step, index) => (
            <View key={index} style={styles.nextStepItem}>
              <View style={styles.nextStepNumber}>
                <Text style={styles.nextStepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.nextStepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Practice Again"
          onPress={() => navigation.navigate('ScenarioSelect')}
          size="large"
          style={styles.actionButton}
        />
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate('Home')}
          variant="outline"
          size="large"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  loadingText: {
    ...Typography.h3,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    ...Typography.h3,
    color: Colors.error,
  },
  overallScoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadow.medium,
  },
  celebrationEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  completedText: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  gradeBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
    ...Shadow.medium,
  },
  gradeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.background,
  },
  scoreDetails: {
    alignItems: 'flex-start',
  },
  scoreNumber: {
    ...Typography.h1,
    color: Colors.text,
    fontWeight: 'bold',
  },
  scoreLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  metaDivider: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginHorizontal: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  sectionDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  summaryText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  nextStepsCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nextStepItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  nextStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  nextStepNumberText: {
    ...Typography.bodySmall,
    color: Colors.background,
    fontWeight: 'bold',
  },
  nextStepText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
    lineHeight: 24,
  },
  actionsContainer: {
    marginTop: Spacing.lg,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
});