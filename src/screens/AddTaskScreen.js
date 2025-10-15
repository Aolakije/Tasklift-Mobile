import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function AddTaskScreen({ navigation, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => setDatePickerVisibility(true);
const hideDatePicker = () => setDatePickerVisibility(false);

const handleConfirm = (date) => {
  const formattedDate = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  setDueDate(formattedDate);
  hideDatePicker();
};


  const handleCreateTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      dueDate: dueDate || 'No date',
    };

    // Call parent callback to add task
    if (onAddTask) {
      onAddTask(newTask);
    }

    Alert.alert('Success', 'Task created successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('tasks'),
      },
    ]);
  };

  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('tasks')}
              style={styles.backButton}
            >
              <Ionicons name="close" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Task</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* Task Title */}
            <View style={styles.section}>
              <Text style={styles.label}>Task Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="What do you need to do?"
                placeholderTextColor={COLORS.darkGray}
                value={title}
                onChangeText={setTitle}
                multiline
                maxLength={100}
              />
              <Text style={styles.charCount}>{title.length}/100</Text>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add more details about this task..."
                placeholderTextColor={COLORS.darkGray}
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={500}
              />
              <Text style={styles.charCount}>{description.length}/500</Text>
            </View>

            {/* Priority */}
            <View style={styles.section}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityContainer}>
                {['low', 'medium', 'high'].map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityButton,
                      priority === p && styles.priorityButtonActive,
                    ]}
                    onPress={() => setPriority(p)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      priority === p && styles.priorityButtonTextActive,
                    ]}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Due Date */}
            <View style={styles.section}>
                <Text style={styles.label}>Due Date</Text>
                <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
                    <Ionicons name="calendar-outline" size={20} color={COLORS.darkGray} />
                    <Text style={styles.dateInputText}>
                    {dueDate ? dueDate : 'YYYY-MM-DD'}
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                </View>

            {/* Quick Tags */}
                        <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.tagsContainer}>
                {['Work', 'Personal', 'Shopping', 'Health'].map(tag => (
                <TouchableOpacity
                    key={tag}
                    style={[
                    styles.tag,
                    selectedCategory === tag && styles.selectedTag // highlight when selected
                    ]}
                    onPress={() => setSelectedCategory(tag)} // set the selected category
                >
                    <Text
                    style={[
                        styles.tagText,
                        selectedCategory === tag && styles.selectedTagText // change text color
                    ]}
                    >
                    {tag}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>
            </View>


            <View style={{ height: 40 }} />
          </ScrollView>

          {/* Bottom Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.navigate('tasks')}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateTask}>
              <LinearGradient
                colors={GRADIENTS.button}
                style={styles.createButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="checkmark" size={24} color={COLORS.white} />
                <Text style={styles.createButtonText}>Create Task</Text>
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
  keyboardView: {
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
  headerTitle: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
    marginTop: 4,
    textAlign: 'right',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  priorityButtonActive: {
    backgroundColor: COLORS.accentOrange,
    borderColor: COLORS.accentOrange,
  },
  priorityButtonText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.white,
  },
  priorityButtonTextActive: {
    color: COLORS.white,
  },
  dateInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  dateInputText: {
    flex: 1,
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  tagText: {
    fontSize: FONTS.small,
    color: COLORS.white,
    fontWeight: '600',
    },
    selectedTag: {
    backgroundColor: COLORS.primaryPurple, // or any highlight color you want
    borderColor: COLORS.primaryPurple,
    },

    selectedTagText: {
    color: COLORS.white,
    fontWeight: 'bold',
    },

  actionContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.md,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
},
  cancelButtonText: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  createButton: {
    flex: 1,
    padding: 9,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  createButtonText: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});