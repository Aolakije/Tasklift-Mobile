import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, FONTS, SPACING } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  // Mock user data - will come from your backend later
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@tasklift.com',
    username: '@johndoe',
    bio: 'Product Manager | Task Management Enthusiast',
    joinDate: 'January 2024',
    profilePicture: null, // We'll add image picker later
  });
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(user);

  const stats = [
    { label: 'Tasks', value: '48', icon: 'checkmark-circle' },
    { label: 'Projects', value: '12', icon: 'folder' },
    { label: 'Notes', value: '27', icon: 'document-text' },
  ];

  const menuItems = [
    { icon: 'settings-outline', title: 'Settings', subtitle: 'App preferences', screen: 'settings' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage alerts' },
    { icon: 'lock-closed-outline', title: 'Privacy & Security', subtitle: 'Account security' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'information-circle-outline', title: 'About', subtitle: 'App version 1.0.0' },
  ];
  const pickImage = async () => {
  // Request permission
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to upload a profile picture!');
    return;
  }

  // Launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setUser({ ...user, profilePicture: result.assets[0].uri });
  }
};
const handleSaveProfile = () => {
  setUser(editData);
  setEditMode(false);
  Alert.alert('Success', 'Profile updated successfully!');
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
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('dashboard')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditMode(!editMode)}>
            <Ionicons name={editMode ? "close" : "create-outline"} size={24} color={COLORS.white} />
        </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            {editMode && (
        <View style={styles.editForm}>
            <Text style={styles.editFormTitle}>Edit Profile</Text>
            
            <View style={styles.editSection}>
            <Text style={styles.editLabel}>Name</Text>
            <TextInput
                style={styles.editInput}
                value={editData.name}
                onChangeText={(text) => setEditData({...editData, name: text})}
                placeholder="Enter your name"
            />
            </View>

            <View style={styles.editSection}>
            <Text style={styles.editLabel}>Email</Text>
            <TextInput
                style={styles.editInput}
                value={editData.email}
                onChangeText={(text) => setEditData({...editData, email: text})}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            </View>

            <View style={styles.editSection}>
            <Text style={styles.editLabel}>Username</Text>
            <TextInput
                style={styles.editInput}
                value={editData.username}
                onChangeText={(text) => setEditData({...editData, username: text})}
                placeholder="Enter your username"
            />
            </View>

            <View style={styles.editSection}>
            <Text style={styles.editLabel}>Bio</Text>
            <TextInput
                style={[styles.editInput, { minHeight: 80 }]}
                value={editData.bio}
                onChangeText={(text) => setEditData({...editData, bio: text})}
                placeholder="Tell us about yourself"
                multiline
            />
            </View>

            <TouchableOpacity onPress={handleSaveProfile}>
            <LinearGradient
                colors={GRADIENTS.button}
                style={styles.saveButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </LinearGradient>
            </TouchableOpacity>
        </View>
        )}
            {/* Profile Picture */}
            <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
              {user.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileImageText}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
              )}
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={16} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            {/* User Info */}
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userUsername}>{user.username}</Text>
            <Text style={styles.userBio}>{user.bio}</Text>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Ionicons name={stat.icon} size={24} color={COLORS.accentOrange} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Account Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={20} color={COLORS.darkGray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color={COLORS.darkGray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Member Since</Text>
                  <Text style={styles.infoValue}>{user.joinDate}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.menuItem}
                onPress={() => item.screen && navigation.navigate(item.screen)}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={24} color={COLORS.darkGray} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => navigation.logout()}
          >
            <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

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
  editButton: {
    padding: 4,
  },

  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  editForm: {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  marginHorizontal: SPACING.lg,
  marginTop: SPACING.lg,
  borderRadius: 16,
  padding: SPACING.lg,
},
editFormTitle: {
  fontSize: FONTS.large,
  fontWeight: 'bold',
  color: COLORS.darkGray,
  marginBottom: SPACING.md,
},
editSection: {
  marginBottom: SPACING.md,
},
editLabel: {
  fontSize: FONTS.medium,
  fontWeight: '600',
  color: COLORS.darkGray,
  marginBottom: SPACING.xs,
},
editInput: {
  backgroundColor: '#f3f4f6',
  borderRadius: 10,
  padding: SPACING.md,
  fontSize: FONTS.medium,
  color: COLORS.darkGray,
  borderWidth: 1,
  borderColor: '#e5e7eb',
},
saveButton: {
  paddingVertical: SPACING.md,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: SPACING.md,
},
saveButtonText: {
  fontSize: FONTS.medium,
  fontWeight: 'bold',
  color: COLORS.white,
},
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.accentOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: FONTS.xxlarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primaryPurple,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: SPACING.sm,
  },
  userUsername: {
    fontSize: FONTS.medium,
    color: COLORS.pinkMagenta,
    marginTop: 4,
  },
  userBio: {
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 4,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
    marginTop: 2,
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  infoContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
  },
  infoValue: {
    fontSize: FONTS.medium,
    color: COLORS.darkGray,
    fontWeight: '600',
    marginTop: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: SPACING.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  menuTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  menuSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.darkGray,
    opacity: 0.6,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.error,
  },
});
