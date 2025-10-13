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

export default function ProjectsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock projects data - we'll connect to your API later
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Mobile App Development',
      description: 'Building TaskLift mobile app with React Native',
      status: 'active',
      progress: 65,
      taskCount: 12,
      completedTasks: 8,
      dueDate: '2024-11-15',
      color: COLORS.accentOrange,
    },
    {
      id: 2,
      name: 'Website Redesign',
      description: 'Redesigning company website with modern UI',
      status: 'active',
      progress: 40,
      taskCount: 15,
      completedTasks: 6,
      dueDate: '2024-10-30',
      color: COLORS.pinkMagenta,
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'Integrate third-party APIs for data sync',
      status: 'completed',
      progress: 100,
      taskCount: 8,
      completedTasks: 8,
      dueDate: '2024-10-10',
      color: COLORS.success,
    },
    {
      id: 4,
      name: 'Database Migration',
      description: 'Migrate database to new cloud infrastructure',
      status: 'planning',
      progress: 15,
      taskCount: 20,
      completedTasks: 3,
      dueDate: '2024-12-01',
      color: COLORS.warning,
    },
    {
      id: 5,
      name: 'Security Audit',
      description: 'Complete security audit and implement fixes',
      status: 'active',
      progress: 55,
      taskCount: 10,
      completedTasks: 5,
      dueDate: '2024-11-05',
      color: COLORS.error,
    },
  ]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return COLORS.accentOrange;
      case 'completed': return COLORS.success;
      case 'planning': return COLORS.warning;
      default: return COLORS.lightGray;
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Text style={styles.headerTitle}>Projects</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color={COLORS.accentOrange} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            placeholderTextColor={COLORS.darkGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {projects.filter(p => p.status === 'active').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {projects.filter(p => p.status === 'completed').length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Projects List */}
        <ScrollView 
          style={styles.projectsList}
          showsVerticalScrollIndicator={false}
        >
          {filteredProjects.map(project => (
            <TouchableOpacity 
              key={project.id}
              style={styles.projectCard}
              activeOpacity={0.7}
            >
              {/* Color Indicator */}
              <View style={[styles.colorIndicator, { backgroundColor: project.color }]} />

              <View style={styles.projectContent}>
                {/* Header */}
                <View style={styles.projectHeader}>
                  <View style={styles.projectTitleRow}>
                    <Ionicons name="folder" size={24} color={project.color} />
                    <Text style={styles.projectName}>{project.name}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeColor(project.status) }]}>
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.projectDescription}>{project.description}</Text>

                {/* Progress Bar */}
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressPercentage}>{project.progress}%</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { width: `${project.progress}%`, backgroundColor: project.color }
                      ]} 
                    />
                  </View>
                </View>

                {/* Project Meta */}
                <View style={styles.projectMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.darkGray} />
                    <Text style={styles.metaText}>
                      {project.completedTasks}/{project.taskCount} tasks
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.darkGray} />
                    <Text style={styles.metaText}>{project.dueDate}</Text>
                  </View>
                </View>
              </View>

              {/* More Options */}
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          {filteredProjects.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={80} color={COLORS.lightGray} />
              <Text style={styles.emptyStateText}>No projects found</Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery ? 'Try a different search' : 'Create your first project!'}
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
  addButton: {
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
  projectsList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  projectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  colorIndicator: {
    width: 6,
  },
  projectContent: {
    flex: 1,
    padding: SPACING.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  projectTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  projectName: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  projectDescription: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  projectMeta: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
  },
  moreButton: {
    padding: SPACING.md,
    justifyContent: 'flex-start',
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