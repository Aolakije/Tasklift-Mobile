import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import RegisterScreen from '../../src/screens/RegisterScreen';
import DashboardScreen from '../../src/screens/DashboardScreen';
import TasksScreen from '../../src/screens/TasksScreen';
import ProjectsScreen from '../../src/screens/ProjectsScreen';
import NotesScreen from '../../src/screens/NotesScreen';
import AIChatScreen from '../../src/screens/AIChatScreen';
import ProfileScreen from '../../src/screens/ProfileScreen';
import SettingsScreen from '../../src/screens/SettingsScreen';
import TodoScreen from '../../src/screens/TodoScreen';
import CalendarScreen from '../../src/screens/CalendarScreen';
import DocumentsScreen from '../../src/screens/DocumentsScreen';
import BottomNav from '../../src/components/BottomNav';
import AddTaskScreen from '../../src/screens/AddTaskScreen';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Navigation object
  const navigation = {
    navigate: (screen) => {
      setCurrentScreen(screen.toLowerCase());
    },
    login: () => {
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    },
    logout: () => {
      setIsAuthenticated(false);
      setCurrentScreen('login');
    },
  };

  // Screens that should show bottom nav
  const screensWithBottomNav = ['calendar','dashboard', 'todo' , 'aichat', 'profile'];
  const showBottomNav = isAuthenticated && screensWithBottomNav.includes(currentScreen);

  // Render the current screen
  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'register') {
        return <RegisterScreen navigation={navigation} />;
      }
      return <LoginScreen navigation={navigation} />;
    }

    // Authenticated screens
    switch (currentScreen) {
      case 'tasks':
        return <TasksScreen navigation={navigation} />;
      case 'projects':
        return <ProjectsScreen navigation={navigation} />;
      case 'notes':
        return <NotesScreen navigation={navigation} />;
      case 'aichat':
        return <AIChatScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      case 'settings':
        return <SettingsScreen navigation={navigation} />;
      case 'todo':
        return <TodoScreen navigation={navigation} />;
      case 'calendar':
        return <CalendarScreen navigation={navigation} />;
      case 'documents':
        return <DocumentsScreen navigation={navigation} />;
      case 'addtask':
        return <AddTaskScreen navigation={navigation} />;
      default:
        return <DashboardScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      {showBottomNav && <BottomNav currentScreen={currentScreen} navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});