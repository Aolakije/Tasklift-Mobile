import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function TodoScreen({ navigation }) {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review morning emails', completed: false, priority: 'high' },
    { id: 2, text: 'Team standup meeting', completed: true, priority: 'medium' },
    { id: 3, text: 'Update project documentation', completed: false, priority: 'low' },
    { id: 4, text: 'Code review for PR #145', completed: false, priority: 'high' },
    { id: 5, text: 'Lunch with client', completed: true, priority: 'medium' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      priority: selectedPriority,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
    setModalVisible(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.lightGray;
    }
  };

  const incompleteTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

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
          <Text style={styles.headerTitle}>Today's Todo</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle" size={32} color={COLORS.accentOrange} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{incompleteTodos.length}</Text>
            <Text style={styles.statLabel}>To Do</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTodos.length}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{todos.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Todo List */}
        <ScrollView style={styles.todoList} showsVerticalScrollIndicator={false}>
          {/* Incomplete Todos */}
          {incompleteTodos.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Active</Text>
              {incompleteTodos.map(todo => (
                <View key={todo.id} style={styles.todoItem}>
                  <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
                    <Ionicons name="ellipse-outline" size={24} color={COLORS.darkGray} />
                  </TouchableOpacity>
                  <View style={styles.todoContent}>
                    <Text style={styles.todoText}>{todo.text}</Text>
                    <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(todo.priority) }]} />
                  </View>
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          {/* Completed Todos */}
          {completedTodos.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Completed</Text>
              {completedTodos.map(todo => (
                <View key={todo.id} style={[styles.todoItem, styles.completedItem]}>
                  <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
                    <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
                  </TouchableOpacity>
                  <View style={styles.todoContent}>
                    <Text style={styles.todoTextCompleted}>{todo.text}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          {todos.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-done-outline" size={80} color={COLORS.lightGray} />
              <Text style={styles.emptyText}>No todos yet!</Text>
              <Text style={styles.emptySubtext}>Tap + to add your first todo</Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Add Todo Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Todo</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color={COLORS.darkGray} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="What do you need to do?"
                placeholderTextColor={COLORS.darkGray}
                value={newTodo}
                onChangeText={setNewTodo}
                multiline
                autoFocus
              />

              <Text style={styles.priorityLabel}>Priority</Text>
              <View style={styles.priorityButtons}>
                {['low', 'medium', 'high'].map(priority => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      selectedPriority === priority && styles.priorityButtonActive,
                      { borderColor: getPriorityColor(priority) }
                    ]}
                    onPress={() => setSelectedPriority(priority)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      selectedPriority === priority && { color: getPriorityColor(priority) }
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity onPress={addTodo}>
                <LinearGradient
                  colors={GRADIENTS.button}
                  style={styles.addButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.addButtonText}>Add Todo</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  headerTitle: {
    fontSize: FONTS.xxlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONTS.xxlarge,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    marginTop: 4,
    opacity: 0.6,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  todoList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
    opacity: 0.8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  completedItem: {
    opacity: 0.6,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  todoText: {
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    flex: 1,
  },
  todoTextCompleted: {
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    textDecorationLine: 'line-through',
    flex: 1,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONTS.medium,
    color: COLORS.lightGray,
    marginTop: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.xl,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  priorityLabel: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  priorityButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  priorityButtonActive: {
    backgroundColor: 'rgba(217, 94, 40, 0.1)',
  },
  priorityButtonText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    textTransform: 'capitalize',
  },
  addButton: {
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});