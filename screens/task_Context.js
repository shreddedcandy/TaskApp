import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create TaskContext to provide task related state and functions
export const Task_context = createContext();

// TaskProvider component to wrap around children components and provide context
export const Task_provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user_Profile, set_User_profile] = useState({
    xp: 0,
    level: "Task Apprentice",
  });

  const levels = [
    {
      name: "Task Apprentice",
      xp: 0,
      threshold: 300,
      image: require("../assets/ig2.jpg"),
    },
    {
      name: "Time Manager",
      xp: 0,
      threshold: 600,
      image: require("../assets/ig3.jpg"),
    },
    {
      name: "Productivity Specialist",
      xp: 600,
      threshold: 1000,
      image: require("../assets/ig1.jpg"),
    },
    {
      name: "Task Virtuoso",
      xp: 1000,
      threshold: 1600,
      image: require("../assets/ig4.jpg"),
    },
    {
      name: "Efficiency Expert",
      xp: 1600,
      threshold: 2200,
      image: require("../assets/ig5.jpg"),
    },
    {
      name: "Task Maestro",
      xp: 2200,
      threshold: 3000,
      image: require("../assets/ig6.jpg"),
    },
  ];

  useEffect(() => {
    fetch_Tasks(); // load tasks for the current user
    load_User_profile();
    initializeUsers(); // ensure users are loaded or initialized from AsyncStorage
  }, []);

  const load_User_profile = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem("currentUserEmail");
      if (!currentUserEmail) {
        console.log("No user logged in. Please sign in."); // Updated log for clarity
        // Handle redirection to SignIn or SignUp if needed
        return;
      }

      const usersJson = await AsyncStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];

      const loadedUserProfile = users.find(
        (user) => user.email === currentUserEmail
      ) || {
        xp: 0,
        level: "Task Apprentice",
      };

      set_User_profile(loadedUserProfile);
    } catch (e) {
      console.error("Failed to load user profile from AsyncStorage:", e);
    }
  };

  const fetch_Tasks = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem("currentUserEmail");
      if (!currentUserEmail) return;

      const tasksJson = await AsyncStorage.getItem(`tasks_${currentUserEmail}`);
      const loadedTasks = tasksJson ? JSON.parse(tasksJson) : [];
      const updatedTasks = checkOverdueTasks(loadedTasks);
      setTasks(updatedTasks);
      //console.log("Tasks loaded:", updatedTasks); // Log loaded tasks
    } catch (e) {
      console.error("Failed to fetch tasks from AsyncStorage", e);
    }
  };

  const checkOverdueTasks = (tasks) => {
    const currentTime = new Date();
    return tasks.map((task) => {
      if (new Date(task.dueDate) < currentTime && !task.completed) {
        return { ...task, overdue: true };
      }
      return task;
    });
  };

  const saveTasks = async (newTasks) => {
    try {
      const updatedTasks = checkOverdueTasks(newTasks);
      const currentUserEmail = await AsyncStorage.getItem("currentUserEmail"); // Get current user's email
      if (!currentUserEmail) return;

      await AsyncStorage.setItem(
        `tasks_${currentUserEmail}`,
        JSON.stringify(updatedTasks)
      ); // save tasks under the current user's email key
      setTasks(updatedTasks);
      console.log("Tasks saved:", updatedTasks);
    } catch (e) {
      console.error("Failed to save tasks to AsyncStorage", e);
    }
  };

  const save_User_profile = async (newUserProfile) => {
    try {
      const usersJson = await AsyncStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];

      const updatedUsers = users.map((user) =>
        user.email === newUserProfile.email ? newUserProfile : user
      );

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      set_User_profile(newUserProfile);
      console.log("User profile saved:", newUserProfile); // saved user profile
    } catch (e) {
      console.error("Failed to save user profile to AsyncStorage", e);
    }
  };

  const add_Task = async (task, collaborators = []) => {
    const newTask = { id: Date.now().toString(), ...task, completed: false };
    //console.log("Adding task:", newTask, "for collaborators:", collaborators);

    const currentUserEmail = await AsyncStorage.getItem("currentUserEmail");
    if (!currentUserEmail) return;

    const allEmails = [currentUserEmail, ...collaborators]; // Include current user and collaborators

    for (const email of allEmails) {
      const userTasksJson = await AsyncStorage.getItem(`tasks_${email}`);
      const userTasks = userTasksJson ? JSON.parse(userTasksJson) : [];
      const updatedTasks = [...userTasks, newTask];
      await AsyncStorage.setItem(
        `tasks_${email}`,
        JSON.stringify(updatedTasks)
      ); // save updated tasks for each user
    }
    //console.log("Task added successfully for users:", allEmails)
    fetch_Tasks(); // refresh tasks for the current user
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    saveTasks(updatedTasks);
    incrementXP(100); // Increase XP by 100 for completing a task
  };

  const incrementXP = (xp) => {
    let newXP = user_Profile.xp + xp;
    let newLevel = user_Profile.level;

    const currentLevelIndex = levels.findIndex(
      (level) => level.name === user_Profile.level
    );
    // When level is not found
    if (currentLevelIndex === -1) {
      save_User_profile({ ...user_Profile, xp: newXP });
      return;
    }

    const currentLevel = levels[currentLevelIndex];

    if (newXP >= currentLevel.threshold) {
      let xpOverflow = newXP - currentLevel.threshold;
      const nextLevelIndex = currentLevelIndex + 1;

      if (nextLevelIndex < levels.length) {
        newLevel = levels[nextLevelIndex].name;
        newXP = xpOverflow;
      } else {
        newXP = currentLevel.threshold;
      }
    }

    save_User_profile({ ...user_Profile, xp: newXP, level: newLevel });
  };

  const initializeUsers = async () => {
    try {
      const usersJson = await AsyncStorage.getItem("users");
      if (!usersJson) {
        await AsyncStorage.setItem("users", JSON.stringify([]));
      }
    } catch (e) {
      console.error("Failed to initialize users in AsyncStorage", e);
    }
  };

  const check_UserExists = async (email) => {
    try {
      const usersJson = await AsyncStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];
      const exists = users.some((user) => user.email === email);
      console.log("User exists check for:", email, exists); // check user existence
      return exists;
    } catch (e) {
      console.error("Failed to check if user exists", e);
      return false;
    }
  };

  const add_User = async (user) => {
    try {
      const usersJson = await AsyncStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];
      if (!users.some((u) => u.email === user.email)) {
        users.push(user);
        await AsyncStorage.setItem("users", JSON.stringify(users));
      }
    } catch (e) {
      console.error("Failed to add user to AsyncStorage", e);
    }
  };

  return (
    <Task_context.Provider
      value={{
        tasks,
        add_Task,
        deleteTask,
        completeTask,
        user_Profile,
        incrementXP,
        levels,
        save_User_profile,
        fetch_Tasks,
        check_UserExists,
        add_User,
      }}
    >
      {children}
    </Task_context.Provider>
  );
};
