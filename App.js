import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TaskProvider } from "./screens/TaskContext";

import LandingPage from "./screens/LandingPage";
import SignInPage from "./screens/login/SignInPage";
import SignUpPage from "./screens/login/SignUpPage";
import HomePage from "./screens/HomePage";
import AddTaskPage from "./screens/AddTaskPage";
import ProjectPage from "./screens/ProjectPage";
import CalendarPage from "./screens/CalendarPage";
import TasksForDay from "./screens/TasksForDay";
import AchievementPage from "./screens/AchievementPage";

import SettingPage from "./screens/settingInfo/SettingPage";
import ChangeNicknamePage from "./screens/settingInfo/ChangeNickname";
import ChangePasswordPage from "./screens/settingInfo/ChangePassword";
import HowToUsePage from "./screens/settingInfo/HowToUsePage";

// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    // wrap the navigation container with the TaskProvider to provide global state management
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }} // Hide header for landing page
          />
          <Stack.Screen name="SignIn" component={SignInPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AddTask" component={AddTaskPage} />
          <Stack.Screen name="Project" component={ProjectPage} />
          <Stack.Screen name="Calendar" component={CalendarPage} />
          <Stack.Screen name="TasksForDay" component={TasksForDay} />
          <Stack.Screen name="Achievement" component={AchievementPage} />
          <Stack.Screen name="Setting" component={SettingPage} />
          <Stack.Screen name="ChangeNickname" component={ChangeNicknamePage} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
          <Stack.Screen name="HowToUse" component={HowToUsePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
