import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function AIChatScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hi! I'm your TaskLift AI Assistant 🤖\n\nI can help you:\n• Plan and organize tasks\n• Create projects\n• Manage your schedule\n• Answer questions about productivity\n\nWhat would you like help with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  // Quick action suggestions
  const quickActions = [
    { icon: 'add-circle', text: 'Create a task', action: 'create_task' },
    { icon: 'folder', text: 'Start a project', action: 'create_project' },
    { icon: 'calendar', text: 'Plan my week', action: 'plan_week' },
    { icon: 'bulb', text: 'Get suggestions', action: 'suggestions' },
  ];

  // Simulate AI response (we'll connect to real API later)
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple keyword-based responses (will be replaced with real AI API)
    if (lowerMessage.includes('task') && lowerMessage.includes('create')) {
      return "I can help you create a task! 📝\n\nPlease tell me:\n1. Task title\n2. Description\n3. Priority (high/medium/low)\n4. Due date\n\nFor example: 'Create a high priority task called Review Code due tomorrow'";
    }
    
    if (lowerMessage.includes('project')) {
      return "Let's create a project! 🚀\n\nI'll need:\n1. Project name\n2. Description\n3. Expected completion date\n4. Team members (if any)\n\nTell me about your project!";
    }
    
    if (lowerMessage.includes('plan') && lowerMessage.includes('week')) {
      return "Great! Let me help you plan your week 📅\n\nBased on your current tasks:\n• Monday: Focus on high-priority tasks\n• Tuesday-Wednesday: Project work\n• Thursday: Team meetings & reviews\n• Friday: Wrap up & planning\n\nWould you like me to create tasks for any of these?";
    }
    
    if (lowerMessage.includes('suggest') || lowerMessage.includes('help')) {
      return "Here are some productivity tips 💡:\n\n1. Start with your most important task\n2. Break large projects into smaller tasks\n3. Set realistic deadlines\n4. Review your progress weekly\n5. Take regular breaks\n\nWhich area would you like to focus on?";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! 👋 How can I assist you with your tasks and projects today?";
    }

    // Default response
    return "I understand you're asking about: '" + userMessage + "'\n\n🤖 I'm here to help with:\n• Creating and managing tasks\n• Planning projects\n• Organizing your schedule\n• Productivity tips\n\nCould you please provide more details?";
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: getAIResponse(userMessage.text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      create_task: "I want to create a new task",
      create_project: "Help me start a new project",
      plan_week: "Help me plan my week",
      suggestions: "Give me productivity suggestions",
    };

    setMessage(actionMessages[action]);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('dashboard')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsContainer}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.action)}
            >
              <Ionicons name={action.icon} size={20} color={COLORS.accentOrange} />
              <Text style={styles.quickActionText}>{action.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.type === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {msg.type === 'ai' && (
                <View style={styles.aiAvatar}>
                  <Ionicons name="sparkles" size={16} color={COLORS.white} />
                </View>
              )}
              <View style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  msg.type === 'user' ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.type === 'user' ? styles.userMessageTime : styles.aiMessageTime,
                ]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={[styles.messageBubble, styles.aiMessage]}>
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color={COLORS.white} />
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={90}
        >
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="attach" size={24} color={COLORS.lightGray} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Ask me anything..."
              placeholderTextColor={COLORS.darkGray}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />

            <TouchableOpacity 
              style={styles.sendButton}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <LinearGradient
                colors={message.trim() ? GRADIENTS.button : ['#ccc', '#999']}
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="send" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
  },
  menuButton: {
    padding: 4,
  },
  quickActionsContainer: {
    maxHeight: 60,
    marginBottom: SPACING.md,
  },
  quickActionsContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    gap: SPACING.xs,
  },
  quickActionText: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    padding: SPACING.xl,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  messagesContent: {
    paddingTop: SPACING.md,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 40,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accentOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
    marginTop: 4,
  },
  messageContent: {
    maxWidth: '75%',
    padding: SPACING.sm,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  userMessage: {
    marginLeft: 'auto',
  },
  messageBubble: {
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    padding: SPACING.sm,
    paddingLeft: SPACING.md,
    maxWidth: '80%',
    marginRight: SPACING.md,
  },
  userMessage: {
    backgroundColor: COLORS.accentOrange,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: SPACING.sm, 
    marginBottom: SPACING.sm,
    padding: -5,
},
  aiMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    marginTop: SPACING.sm, 
    marginBottom: SPACING.sm,
  },
  messageText: {
    fontSize: FONTS.medium,
    lineHeight: 22,
  },
  userMessageText: {
    color: COLORS.white,
  },
  aiMessageText: {
    color: COLORS.darkGray,
  },
  messageTime: {
    fontSize: FONTS.small - 2,
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  aiMessageTime: {
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: SPACING.md,
    borderRadius: 16,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.darkGray,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 25,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  attachButton: {
    padding: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: SPACING.xs,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});