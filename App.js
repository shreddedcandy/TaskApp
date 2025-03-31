import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TaskProvider } from "./screens/task_Context";

import Landing_page from "./screens/LandingPage";
import SignIn_Page from "./screens/login/SignInPage";
import SignUp_Page from "./screens/login/SignUpPage";
import HomePg from "./screens/HomePage";
import Add_TaskPage from "./screens/AddTaskPage";
import Project_page from "./screens/ProjectPage";
import Calendar_Page from "./screens/CalendarPage";
import Tasks_For_day from "./screens/TasksForDay";
import Achievement_Page from "./screens/AchievementPage";

import Setting_Page from "./screens/settingInfo/SettingPage";
import ChangeNNPage from "./screens/settingInfo/ChangeNickname";
import ChangePWPage from "./screens/settingInfo/ChangePassword";
import How_ToUse_Page from "./screens/settingInfo/HowToUsePage";

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
            component={Landing_page}
            options={{ headerShown: false }} // Hide header for landing page
          />
          <Stack.Screen name="SignIn" component={SignIn_Page} />
          <Stack.Screen name="SignUp" component={SignUp_Page} />
          <Stack.Screen name="Home" component={HomePg} />
          <Stack.Screen name="AddTask" component={Add_TaskPage} />
          <Stack.Screen name="Project" component={Project_page} />
          <Stack.Screen name="Calendar" component={Calendar_Page} />
          <Stack.Screen name="TasksForDay" component={Tasks_For_day} />
          <Stack.Screen name="Achievement" component={Achievement_Page} />
          <Stack.Screen name="Setting" component={Setting_Page} />
          <Stack.Screen name="ChangeNickname" component={ChangeNNPage} />
          <Stack.Screen name="ChangePassword" component={ChangePWPage} />
          <Stack.Screen name="HowToUse" component={How_ToUse_Page} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
