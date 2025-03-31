import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { task_Context } from "./task_Context";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome";
import Bottom_Nav from "../components/BottomNav";

const HomePg = ({ navigation }) => {
  const { tasks, delete_Task, complete_Task, user_Profile, fetch_Tasks, levels } =
    useContext(task_Context);

  useEffect(() => {
    fetch_Tasks(); // fetch tasks directly without checking user email, using local storage now
  }, []);

  // Confirmation for task deletion
  const handle_DeleteTask = (taskId) => {
    console.log("Attempting to delete task with ID:", taskId); // Log before showing alert
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"), // Log cancellation
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Task deleted with ID:", taskId); // Log deletion
            delete_Task(taskId);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // Mark task as completed
  const handle_CompleteTask = (taskId) => {
    console.log("Marking task as complete with ID:", taskId); // Log task completion
    complete_Task(taskId);
  };

  // get the current level of the user
  const getCurrLevel = () => {
    if (!user_Profile || !levels || levels.length === 0) {
      return {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image for the initial level
      };
    }

    const currLevel = levels.find(
      (level) => level.name === user_Profile.level
    );

    return (
      currLevel || {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image if no current level found
      }
    );
  };

  // Calculate the progress for the user's level
  const currLevel = getCurrLevel();
  const progress = user_Profile ? user_Profile.xp / currLevel.threshold : 0;

  return (
    <View style={styles.container}>
      {/* Header section displaying user's name and profile */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>
          Welcome, {user_Profile ? user_Profile.nickname : ""}
        </Text>
        {user_Profile && (
          <View style={styles.profileContainer}>
            <Image source={currLevel.image} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.levelText}>{user_Profile.level}</Text>
              <Progress.Bar
                progress={progress}
                width={150}
                height={10}
                borderRadius={5}
                unfilledColor="#2d2d2d"
                color="#39FF14"
                borderWidth={1}
                borderColor="#39FF14"
                style={styles.progressBar}
              />
              <Text style={styles.xpText}>
                {user_Profile.xp} / {currLevel.threshold} XP
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Action buttons for navigating to different screens */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton]}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        {/* to project */}
        <TouchableOpacity
          style={[styles.actionButton, styles.projectButton]}
          onPress={() => navigation.navigate("Project")}
        >
          <Icon name="tasks" size={20} color="#fff" />
        </TouchableOpacity>
        {/* to calendar */}
        <TouchableOpacity
          style={[styles.actionButton, styles.calendarButton]}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Icon name="calendar" size={20} color="#fff" />
        </TouchableOpacity>
        {/* to achievement */}
        <TouchableOpacity
          style={[styles.actionButton, styles.achievementButton]}
          onPress={() => navigation.navigate("Achievement")}
        >
          <Icon name="trophy" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scroll view for displaying tasks */}
      <ScrollView contentContainerStyle={styles.taskContainer}>
        {tasks
          .filter((task) => !task.completed)
          .map((task, index) => (
            <View
              key={index}
              style={[
                styles.task,
                {
                  backgroundColor: task.overdue ? "#ff4d4d" : "#3e3e3e",
                  opacity: task.completed ? 0.5 : 1,
                },
              ]}
            >
              {task.type === "task" && (
                <Text style={styles.taskPriority}>{task.priority}</Text>
              )}
              <Text style={styles.taskTitle}>
                {task.type === "task" ? "Task: " : "Project: "} {task.taskTitle}
              </Text>
              <Text style={styles.taskDescription}>
                Description: {task.taskDescription}
              </Text>
              <Text style={styles.taskDueDate}>
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
              <Text style={styles.taskDueTime}>
                Due Time:{" "}
                {new Date(task.dueDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <View style={styles.buttonRow}>
                {!task.completed && (
                  <TouchableOpacity
                    style={[styles.button, styles.completeButton]}
                    onPress={() => handle_CompleteTask(task.id)}
                  >
                    <Text style={styles.buttonText}>Complete</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handle_DeleteTask(task.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
      {/* Bottom navigation component */}
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
    backgroundColor: "#000",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: "#39ff14",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderColor: "#3914",
    borderWidth: 2,
  },
  profileInfo: {
    alignItems: "flex-start",
  },
  progressBar: {
    marginVertical: 10,
  },
  levelText: {
    color: "#39ff14",
    fontSize: 14,
    fontWeight: "bold",
  },
  xpText: {
    color: "#39ff14",
    fontSize: 12,
  },
  actionContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#1e1e1e",
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  projectButton: {
    backgroundColor: "#3b5998",
  },
  calendarButton: {
    backgroundColor: "#ffa726",
  },
  achievementButton: {
    backgroundColor: "#ffeb3b",
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 70,
  },
  task: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#3e3e3e",
    borderColor: "#39ff14",
    borderWidth: 1,
    position: "relative",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#39FF14",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#000",
  },
  taskPriority: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ffeb3b",
    padding: 5,
    borderRadius: 100,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  taskDueDate: {
    fontSize: 14,
    color: "#000",
  },
  taskDueTime: {
    fontSize: 14,
    color: "#000",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  completeButton: {
    backgroundColor: "#4caf50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomePg;
