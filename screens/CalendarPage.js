import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TaskContext } from "./TaskContext";
import { Calendar } from "react-native-calendars";
import BottomNav from "../components/BottomNav";

const CalendarPage = ({ navigation }) => {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [markedDates, setMarkedDates] = useState({}); // state to store marked dates for the calendar

  // fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks(); // ensure fetches tasks correctly
  }, []);

  // update marked dates whenever tasks change
  useEffect(() => {
    const dates = {};
    tasks
      .filter((task) => !task.completed) // Filter out completed tasks
      .forEach((task) => {
        // ensure task.dueDate is a date object
        const dateStr = new Date(task.dueDate).toISOString().split("T")[0];
        dates[dateStr] = {
          marked: true,
          dotColor: task.overdue ? "#ff4d4d" : "#39FF14", // set dot color based on whether the task is overdue
        };
      });
    setMarkedDates(dates); // update marked dates state
  }, [tasks]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          markedDates={markedDates} // Pass marked dates to the calendar
          theme={{
            backgroundColor: "#000",
            calendarBackground: "#000",
            textSectionTitleColor: "#b6c1cd",
            dayTextColor: "#fff",
            todayTextColor: "#f57d05",
            selectedDayTextColor: "#fff",
            monthTextColor: "#fff",
            selectedDayBackgroundColor: "#333",
            arrowColor: "#f57d05",
            textDisabledColor: "#555",
          }}
          onDayPress={(day) => {
            const selectedDate = new Date(day.dateString); // convert selected date string to date object
            const selectedTasks = tasks
              .filter(
                (task) =>
                  new Date(task.dueDate).toDateString() ===
                    selectedDate.toDateString() && !task.completed
              )
              .map((task) => ({
                ...task,
                dueDate: new Date(task.dueDate).toISOString(), // ensure dueDate is in ISO format
              }));
            navigation.navigate("TasksForDay", { tasks: selectedTasks }); // navigate to TasksForDay screen with selected taskss
          }}
        />
        <View style={styles.tasksContainer}>
          <Text style={styles.header}>Overdue Tasks</Text>
          {tasks
            .filter((task) => task.overdue && !task.completed) // filter out overdue tasks that are not completed
            .map((task, index) => (
              <View key={index} style={styles.task}>
                <Text style={styles.taskTitle}>{task.taskTitle}</Text>
                <Text style={styles.taskDescription}>
                  {task.taskDescription}
                </Text>
                <Text style={styles.taskDueDate}>
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingBottom: 70,
  },
  tasksContainer: {
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  task: {
    backgroundColor: "#c73c1a",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  taskDescription: {
    fontSize: 14,
    color: "#ccc",
  },
  taskDueDate: {
    fontSize: 12,
    color: "#000",
  },
});

export default CalendarPage;
