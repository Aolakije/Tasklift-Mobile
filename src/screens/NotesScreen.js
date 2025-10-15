import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function NotesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock notes data - we'll connect to your API later
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Meeting Notes - Q4 Planning',
      content: 'Discussed Q4 objectives, timeline, and resource allocation. Key points: increase team size, focus on mobile development...',
      category: 'Work',
      color: COLORS.accentOrange,
      isPinned: true,
      createdAt: '2024-10-14',
      updatedAt: '2024-10-14',
    },
    {
      id: 2,
      title: 'Project Ideas',
      content: 'New feature ideas for the mobile app: dark mode, offline support, push notifications, biometric authentication...',
      category: 'Ideas',
      color: COLORS.pinkMagenta,
      isPinned: false,
      createdAt: '2024-10-13',
      updatedAt: '2024-10-13',
    },
    {
      id: 3,
      title: 'Code Snippets',
      content: 'Useful React Native code snippets and patterns. Navigation setup, state management, API integration examples...',
      category: 'Development',
      color: COLORS.success,
      isPinned: true,
      createdAt: '2024-10-12',
      updatedAt: '2024-10-14',
    },
    {
      id: 4,
      title: 'Personal Tasks',
      content: 'Weekend errands: grocery shopping, car maintenance, dentist appointment, gym membership renewal...',
      category: 'Personal',
      color: COLORS.warning,
      isPinned: false,
      createdAt: '2024-10-11',
      updatedAt: '2024-10-11',
    },
    {
      id: 5,
      title: 'Design Inspiration',
      content: 'Collection of design ideas and color schemes for the new project. Focus on minimalism and accessibility...',
      category: 'Design',
      color: COLORS.error,
      isPinned: false,
      createdAt: '2024-10-10',
      updatedAt: '2024-10-12',
    },
    {
      id: 6,
      title: 'Learning Resources',
      content: 'Useful tutorials and courses: React Native advanced patterns, GraphQL, TypeScript best practices...',
      category: 'Learning',
      color: COLORS.accentOrange,
      isPinned: false,
      createdAt: '2024-10-09',
      updatedAt: '2024-10-09',
    },
  ]);

  const togglePin = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort: pinned notes first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const renderNoteCard = (note) => (
    <TouchableOpacity 
      key={note.id}
      style={viewMode === 'grid' ? styles.noteCardGrid : styles.noteCardList}
      activeOpacity={0.7}
    >
      {/* Note Header */}
      <View style={styles.noteHeader}>
        <View style={[styles.categoryDot, { backgroundColor: note.color }]} />
        <TouchableOpacity onPress={() => togglePin(note.id)}>
          <Ionicons 
            name={note.isPinned ? "pin" : "pin-outline"} 
            size={20} 
            color={note.isPinned ? COLORS.accentOrange : COLORS.darkGray} 
          />
        </TouchableOpacity>
      </View>

      {/* Note Content */}
      <Text style={styles.noteTitle} numberOfLines={2}>{note.title}</Text>
      <Text style={styles.noteContent} numberOfLines={viewMode === 'grid' ? 4 : 2}>
        {note.content}
      </Text>

      {/* Note Footer */}
      <View style={styles.noteFooter}>
        <View style={[styles.categoryBadge, { backgroundColor: note.color }]}>
          <Text style={styles.categoryText}>{note.category}</Text>
        </View>
        <Text style={styles.noteDate}>{note.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>My Notes</Text>
          <TouchableOpacity 
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Ionicons 
              name={viewMode === 'grid' ? 'list' : 'grid'} 
              size={24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            placeholderTextColor={COLORS.darkGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{notes.length}</Text>
            <Text style={styles.statLabel}>Total Notes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {notes.filter(n => n.isPinned).length}
            </Text>
            <Text style={styles.statLabel}>Pinned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {new Set(notes.map(n => n.category)).size}
            </Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>

        {/* Notes List/Grid */}
        <ScrollView 
          style={styles.notesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={viewMode === 'grid' ? styles.gridContainer : null}
        >
          {sortedNotes.length > 0 ? (
            sortedNotes.map(note => renderNoteCard(note))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={80} color={COLORS.lightGray} />
              <Text style={styles.emptyStateText}>No notes found</Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery ? 'Try a different search' : 'Create your first note!'}
              </Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <LinearGradient
            colors={GRADIENTS.button}
            style={styles.floatingButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add" size={32} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  viewModeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    padding: SPACING.md,
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
    marginTop: 4,
  },
  notesList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noteCardGrid: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    width: '48%',
  },
  noteCardList: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  noteTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  noteContent: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  noteDate: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.7,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyStateText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.md,
  },
  emptyStateSubtext: {
    fontSize: FONTS.medium,
    color: COLORS.lightGray,
    marginTop: SPACING.xs,
  },
  floatingButton: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});