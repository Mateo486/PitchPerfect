import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ScenarioSelect: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🎯</Text>
        <Text style={styles.title}>PitchPerfect</Text>
        <Text style={styles.subtitle}>
          Master your interview skills with AI-powered practice sessions
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <Card variant="elevated" style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>AI Recruiter</Text>
          <Text style={styles.featureDescription}>
            Practice with realistic AI that adapts to your responses
          </Text>
        </Card>

        <Card variant="elevated" style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureTitle}>Instant Feedback</Text>
          <Text style={styles.featureDescription}>
            Get detailed analysis and actionable insights after each session
          </Text>
        </Card>

        <Card variant="elevated" style={styles.featureCard}>
          <Text style={styles.featureIcon}>🏢</Text>
          <Text style={styles.featureTitle}>Company-Specific</Text>
          <Text style={styles.featureDescription}>
            Tailor your practice to specific companies and their values
          </Text>
        </Card>
      </View>

      {/* CTA Button */}
      <View style={styles.ctaContainer}>
        <Button
          title="Start Practicing"
          onPress={() => navigation.navigate('ScenarioSelect')}
          size="large"
          style={styles.ctaButton}
        />
        
        <Text style={styles.helpText}>
          Build confidence through realistic practice sessions
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>5+</Text>
          <Text style={styles.statLabel}>Scenarios</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Companies</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>Practice</Text>
        </View>
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
  },
  hero: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  featuresContainer: {
    marginBottom: Spacing.xl,
  },
  featureCard: {
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  ctaButton: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  helpText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
});