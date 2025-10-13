import React, { useState } from 'react';
import LoginScreen from '../../src/screens/LoginScreen';
import RegisterScreen from '../../src/screens/RegisterScreen';
import DashboardScreen from '../../src/screens/DashboardScreen';
import TaskScreen from '../../src/screens/TaskScreen';
import ProjectsScreen from '../../src/screens/ProjectsScreen';  

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

  // If logged in, show the appropriate screen
  if (isAuthenticated) {
    if (currentScreen === 'tasks') {
      return <TaskScreen navigation={navigation} />;
    }
    if (currentScreen === 'projects') {
      return <ProjectsScreen navigation={navigation} />;
    }
    return <DashboardScreen navigation={navigation} />;
  }

  // Otherwise show Login or Register
  if (currentScreen === 'register') {
    return <RegisterScreen navigation={navigation} />;
  }

  return <LoginScreen navigation={navigation} />;
}