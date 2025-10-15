import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';

export default function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Actually implement theme switching across app
    alert(`Theme will switch to ${!isDarkMode ? 'Dark' : 'Light'} mode\n\n(Full implementation coming next!)`);
  };

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: 'moon-outline',
          title: 'Dark Mode',
          subtitle: isDarkMode ? 'Dark Purple Theme' : 'Light Purple Theme',
          type: 'switch',
          value: isDarkMode,
          onToggle: toggleDarkMode,
        },
        {
          icon: 'color-palette-outline',
          title: 'Theme Color',
          subtitle: 'Purple (Default)',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Push Notifications',
          subtitle: 'Receive task reminders',
          type: 'switch',
          value: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          icon: 'mail-outline',
          title: 'Email Notifications',
          subtitle: 'Get updates via email',
          type: 'switch',
          value: emailNotifications,
          onToggle: () => setEmailNotifications(!emailNotifications),
        },
        {
          icon: 'volume-high-outline',
          title: 'Sound',
          subtitle: 'Notification sounds',
          type: 'switch',
          value: soundEnabled,
          onToggle: () => setSoundEnabled(!soundEnabled),
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: 'cloud-download-outline',
          title: 'Sync',
          subtitle: 'Auto-sync with cloud',
          type: 'navigate',
        },
        {
          icon: 'trash-outline',
          title: 'Clear Cache',
          subtitle: '124 MB',
          type: 'navigate',
        },
      ],
    },
  ];

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
            onPress={() => navigation.navigate('profile')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Theme Preview */}
          <View style={styles.themePreview}>
            <Text style={styles.previewTitle}>Current Theme</Text>
            <View style={styles.previewContainer}>
              <View style={[styles.previewBox, { backgroundColor: COLORS.primaryPurple }]}>
                <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={40} color={COLORS.white} />
              </View>
              <Text style={styles.previewText}>
                {isDarkMode ? 'Dark Purple' : 'Light Purple'}
              </Text>
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={24} color={COLORS.darkGray} />
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#d1d5db', true: COLORS.accentOrange }}
                      thumbColor={COLORS.white}
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
                  )}
                </View>
              ))}
            </View>
          ))}

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>TaskLift Mobile v1.0.0</Text>
            <Text style={styles.appInfoSubtext}>Made with ❤️ for productivity</Text>
          </View>

          <View style={{ height: 40 }} />
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
  themePreview: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  previewTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  previewBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  previewText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  section: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
    opacity: 0.8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  settingSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  appInfoText: {
    fontSize: FONTS.medium,
    color: COLORS.white,
    opacity: 0.7,
  },
  appInfoSubtext: {
    fontSize: FONTS.small,
    color: COLORS.white,
    opacity: 0.5,
    marginTop: 4,
  },
});