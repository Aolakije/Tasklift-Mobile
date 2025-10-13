import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function DashboardScreen({ navigation }) {
  // Mock data - we'll connect to your API later
  const stats = {
    totalTasks: 24,
    completedTasks: 12,
    activeProjects: 5,
    notes: 8,
  };

  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back! 👋</Text>
              <Text style={styles.username}>TYC</Text>
            </View>
            <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.logout()}>
                <Ionicons name="log-out-outline" size={32} color={COLORS.white} />
            </TouchableOpacity>
          </View>       

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {/* Tasks Card */}
                <TouchableOpacity 
                style={styles.statCard}
                onPress={() => navigation.navigate('tasks')} >              
                <View style={[styles.iconBox, { backgroundColor: COLORS.accentOrange }]}>
                <Ionicons name="checkmark-done" size={34} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.totalTasks}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
            </TouchableOpacity>

            {/* Completed Card */}
            <TouchableOpacity style={styles.statCard}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.success }]}>
                <Ionicons name="checkmark-circle" size={34} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.completedTasks}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            {/* Projects Card */}
                <TouchableOpacity 
                style={styles.statCard}
                onPress={() => navigation.navigate('projects')}>              
                <View style={[styles.iconBox, { backgroundColor: COLORS.pinkMagenta }]}>
                <Ionicons name="folder-open" size={34} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.activeProjects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </TouchableOpacity>

            {/* Notes Card */}
            <TouchableOpacity style={styles.statCard}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.warning }]}>
                <Ionicons name="document-text" size={34} color={COLORS.white} />
              </View>
              <Text style={styles.statNumber}>{stats.notes}</Text>
              <Text style={styles.statLabel}>Notes</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={GRADIENTS.button}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="add-circle" size={24} color={COLORS.white} />
                <Text style={styles.actionButtonText}>Create New Task</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.actionButtonWhite}
                onPress={() => navigation.navigate('projects')}
                >
                <Ionicons name="folder-open-outline" size={24} color={COLORS.primaryPurple} />
                <Text style={styles.actionButtonTextDark}>View All Projects</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.actionButtonWhite}>
              <Ionicons name="document-text-outline" size={24} color={COLORS.primaryPurple} />
              <Text style={styles.actionButtonTextDark}>My Notes</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            
            <View style={styles.activityCard}>
              <View style={styles.activityIconBox}>
                <Ionicons name="checkmark" size={20} color={COLORS.success} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Task Completed</Text>
                <Text style={styles.activitySubtitle}>Finish project proposal</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityCard}>
              <View style={styles.activityIconBox}>
                <Ionicons name="add" size={20} color={COLORS.accentOrange} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Project Created</Text>
                <Text style={styles.activitySubtitle}>Mobile App Development</Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityCard}>
              <View style={styles.activityIconBox}>
                <Ionicons name="document" size={20} color={COLORS.pinkMagenta} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Note Added</Text>
                <Text style={styles.activitySubtitle}>Meeting notes with team</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    paddingTop: SPACING.xl,
  },
  greeting: {
    fontSize: FONTS.medium,
    color: COLORS.lightGray,
  },
  username: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statNumber: {
    fontSize: FONTS.xxlarge,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.medium,
    color: COLORS.lightGray,
    marginTop: 4,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  actionButton: {
    marginBottom: SPACING.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: FONTS.medium,
    fontWeight: 'bold',
  },
  actionButtonWhite: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  actionButtonTextDark: {
    color: COLORS.primaryPurple,
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: FONTS.small,
    color: COLORS.lightGray,
    opacity: 0.7,
  },
});