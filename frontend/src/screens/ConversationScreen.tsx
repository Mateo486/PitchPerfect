import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Colors, Spacing, Typography, BorderRadius, Shadow } from '../constants/theme';
import { ConversationType, Company } from '../types/scenario';
import { RootStackParamList } from '../types/navigation';

type ConversationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Conversation'>;
type ConversationScreenRouteProp = RouteProp<RootStackParamList, 'Conversation'>;

interface Props {
  navigation: ConversationScreenNavigationProp;
  route: ConversationScreenRouteProp;
}


type ConversationState = 'idle' | 'listening' | 'processing' | 'speaking';

interface Message {
  id: string;
  role: 'user' | 'recruiter';
  text: string;
  timestamp: Date;
}

export const ConversationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { conversationType, company, recruiterContext } = route.params;
  
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  
  // Animation for microphone pulse
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (conversationState === 'listening') {
      // Pulse animation when listening
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [conversationState]);

  const handleStartSession = async () => {
    setIsSessionStarted(true);
    setConversationState('processing');
    
    // TODO: Initialize conversation with backend
    // This will send the scenario config to your backend
    // and get the first message from the AI recruiter
    
    // Simulated recruiter greeting for now
    setTimeout(() => {
      const greeting: Message = {
        id: '1',
        role: 'recruiter',
        text: `Hi! Thanks for taking the time to chat with me today. I'm a recruiter at ${company?.name}. Tell me a bit about yourself and what interests you about our company.`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
      setConversationState('idle');
    }, 1500);
  };

  const handleMicrophonePress = async () => {
    if (conversationState === 'idle') {
      // Start recording
      setConversationState('listening');
      
      // TODO: Start audio recording
      // await startRecording();
      
    } else if (conversationState === 'listening') {
      // Stop recording and process
      setConversationState('processing');
      
      // TODO: Stop recording and send to backend
      // const audioData = await stopRecording();
      // const response = await sendToBackend(audioData);
      
      // Simulated response for now
      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          text: 'This is a simulated user response. Audio recording will be implemented next.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate AI response
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'recruiter',
            text: 'That\'s interesting! Can you tell me more about your experience with similar projects?',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessage]);
          setConversationState('idle');
        }, 2000);
      }, 1000);
    }
  };

  const handleEndSession = () => {
    // TODO: Send conversation to backend for feedback generation
    navigation.navigate('Feedback', { conversationId: 'temp-id' });
  };

  const getConversationTypeTitle = () => {
    const titles = {
      elevator_pitch: 'Elevator Pitch',
      coffee_chat: 'Coffee Chat',
      phone_screen: 'Phone Screen',
      interview: 'Interview',
    };
    return titles[conversationType];
  };

  const getMicrophoneIcon = () => {
    if (conversationState === 'listening') return '🎤';
    if (conversationState === 'processing') return '⏳';
    if (conversationState === 'speaking') return '🔊';
    return '🎤';
  };

  const getMicrophoneText = () => {
    if (conversationState === 'listening') return 'Listening...';
    if (conversationState === 'processing') return 'Processing...';
    if (conversationState === 'speaking') return 'Speaking...';
    return 'Tap to speak';
  };

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.companyName}>{company?.name}</Text>
          <Text style={styles.conversationType}>{getConversationTypeTitle()}</Text>
        </View>
        {isSessionStarted && (
          <TouchableOpacity onPress={handleEndSession} style={styles.endButton}>
            <Text style={styles.endButtonText}>End</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.recruiterBubble,
            ]}
          >
            <Text style={styles.messageRole}>
              {message.role === 'user' ? 'You' : 'Recruiter'}
            </Text>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Microphone Button */}
      <View style={styles.microphoneContainer}>
        {!isSessionStarted ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartSession}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonIcon}>▶️</Text>
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.microphoneWrapper}>
            <TouchableOpacity
              onPress={handleMicrophonePress}
              activeOpacity={0.8}
              disabled={conversationState === 'processing' || conversationState === 'speaking'}
            >
              <Animated.View
                style={[
                  styles.microphoneButton,
                  conversationState === 'listening' && styles.listeningButton,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Text style={styles.microphoneIcon}>{getMicrophoneIcon()}</Text>
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.microphoneText}>{getMicrophoneText()}</Text>
          </View>
        )}
      </View>

      {/* Status Indicator */}
      {conversationState !== 'idle' && isSessionStarted && (
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, styles[`${conversationState}Dot`]]} />
          <Text style={styles.statusText}>
            {conversationState === 'listening' && 'Listening to your response'}
            {conversationState === 'processing' && 'Processing your answer'}
            {conversationState === 'speaking' && 'Recruiter is speaking'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flex: 1,
  },
  companyName: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  conversationType: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  endButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  endButtonText: {
    ...Typography.bodySmall,
    color: Colors.background,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadow.small,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  recruiterBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  messageRole: {
    ...Typography.caption,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    opacity: 0.7,
  },
  messageText: {
    ...Typography.body,
    color: Colors.text,
  },
  microphoneContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  startButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.large,
  },
  startButtonIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  startButtonText: {
    ...Typography.h3,
    color: Colors.background,
    fontWeight: 'bold',
  },
  microphoneWrapper: {
    alignItems: 'center',
  },
  microphoneButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.medium,
  },
  listeningButton: {
    backgroundColor: Colors.error,
  },
  microphoneIcon: {
    fontSize: 48,
  },
  microphoneText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    fontWeight: '600',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  listeningDot: {
    backgroundColor: Colors.error,
  },
  processingDot: {
    backgroundColor: Colors.warning,
  },
  speakingDot: {
    backgroundColor: Colors.success,
  },
  statusText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
});