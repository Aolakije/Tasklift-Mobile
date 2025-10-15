import React, { useState } from 'react';
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

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '09:00 AM',
      duration: '1 hour',
      type: 'meeting',
      color: COLORS.accentOrange,
    },
    {
      id: 2,
      title: 'Project Review',
      time: '11:00 AM',
      duration: '30 mins',
      type: 'work',
      color: COLORS.pinkMagenta,
    },
    {
      id: 3,
      title: 'Lunch Break',
      time: '12:30 PM',
      duration: '1 hour',
      type: 'personal',
      color: COLORS.success,
    },
    {
      id: 4,
      title: 'Client Call',
      time: '02:00 PM',
      duration: '45 mins',
      type: 'meeting',
      color: COLORS.warning,
    },
    {
      id: 5,
      title: 'Code Review',
      time: '04:00 PM',
      duration: '1 hour',
      type: 'work',
      color: COLORS.error,
    },
  ];

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           selectedDate.getMonth() === today.getMonth() &&
           selectedDate.getFullYear() === today.getFullYear();
  };

  return (
    <LinearGradient
      colors={GRADIENTS.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('dashboard')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={32} color={COLORS.accentOrange} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Month Navigator */}
          <View style={styles.monthNavigator}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Ionicons name="chevron-back" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Ionicons name="chevron-forward" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <View style={styles.calendarCard}>
            {/* Week Days Header */}
            <View style={styles.weekDaysContainer}>
              {weekDays.map(day => (
                <Text key={day} style={styles.weekDay}>{day}</Text>
              ))}
            </View>

            {/* Calendar Days */}
            <View style={styles.daysContainer}>
              {getDaysInMonth().map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    !day && styles.emptyDay,
                    isToday(day) && styles.today,
                  ]}
                  disabled={!day}
                >
                  {day && (
                    <Text style={[
                      styles.dayText,
                      isToday(day) && styles.todayText,
                    ]}>
                      {day}
                    </Text>
                  )}
                  {day && (day === 15 || day === 20 || day === 25) && (
                    <View style={styles.eventDot} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Today's Events */}
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            {events.map(event => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <Ionicons name="time-outline" size={16} color={COLORS.darkGray} />
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <Text style={styles.eventDuration}>• {event.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.eventMore}>
                  <Ionicons name="ellipsis-vertical" size={20} color={COLORS.darkGray} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 120 }} />
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
    paddingBottom: 0,
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
  backButton: {
  padding: 4,
},
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  monthText: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  calendarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  weekDay: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    width: 40,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  today: {
    backgroundColor: COLORS.accentOrange,
    borderRadius: 9,
    marginTop: 2,
  },
  dayText: {
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
  },
  todayText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.accentOrange,
  },
  eventsSection: {
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  eventColorBar: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: SPACING.md,
  },
  eventTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventTime: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
  },
  eventDuration: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  eventMore: {
    padding: SPACING.md,
    justifyContent: 'center',
  },
});