import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function BottomNav({ currentScreen, navigation }) {
  const navItems = [
    
    { screen: 'todo', icon: 'list', label: 'To-do' },
    { screen: 'calendar', icon: 'calendar', label: 'Calendar' },
    { screen: 'dashboard', icon: 'home', label: 'Home' },
    { screen: 'aichat', icon: 'sparkles', label: 'AI' },
    { screen: 'profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons
              name={isActive ? item.icon : `${item.icon}-outline`}
              size={24}
              color={isActive ? COLORS.accentOrange : COLORS.darkGray}
            />
            <Text style={[
              styles.navLabel,
              isActive && styles.navLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    paddingVertical: SPACING.sm,
    paddingBottom: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  navLabel: {
    fontSize: 11,
    color: COLORS.darkGray,
    marginTop: 4,
    fontWeight: '500',
  },
  navLabelActive: {
    color: COLORS.accentOrange,
    fontWeight: '700',
  },
});