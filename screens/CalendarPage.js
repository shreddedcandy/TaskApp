import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Task_context } from "./task_Context";
import { Calendar } from "react-native-calendars";
import Bottom_Nav from "../components/BottomNav";

const Calendar_Page = ({ navigation }) => {
  const { tasks, fetch_Tasks } = useContext(Task_context);
  const [marked_Dates, setMarked_dates] = useState({}); // state to store marked dates for the calendar

  // fetch tasks when the component mounts
  useEffect(() => {
    fetch_Tasks(); // ensure fetches tasks correctly
  }, []);

  // update marked dates whenever tasks change
  useEffect(() => {
    const dates = {};
    tasks
      .filter((task) => !task.completed) // Filter out completed tasks
      .forEach((task) => {
        // ensure task.dueDate is a date object
        // const dateStr = new Date(task.due_Date).toISOString().split("T")[0];
        const dueDate = new Date(task.due_Date);
        if (!isNaN(dueDate)) {
        const dateStr = dueDate.toISOString().split("T")[0];
        dates[dateStr] = {
          marked: true,
          dotColor: task.overdue ? "#ff4d4d" : "#39FF14",
        };
      
} else {
  console.warn("Invalid due_Date found in task:", task);
}
        dates[dateStr] = {
          marked: true,
          dotColor: task.overdue ? "#ff4d4d" : "#39FF14", // set dot color based on whether the task is overdue
        };
      });
    setMarked_dates(dates); // update marked dates state
  }, [tasks]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          markedDates={marked_Dates} // Pass marked dates to the calendar
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
            const selected_Date = new Date(day.dateString); // convert selected date string to date object
            const selected_Tasks = tasks
              .filter(
                (task) =>
                  new Date(task.due_Date).toDateString() ===
                    selected_Date.toDateString() && !task.completed
              )
              .map((task) => ({
                ...task,
                due_Date: new Date(task.due_Date).toISOString(), // ensure dueDate is in ISO format
              }));
            navigation.navigate("TasksForDay", { tasks: selected_Tasks }); // navigate to TasksForDay screen with selected taskss
          }}
        />
        <View style={styles.tasks_Container}>
          <Text style={styles.header}>Overdue Tasks</Text>
          {tasks
            .filter((task) => task.overdue && !task.completed) // filter out overdue tasks that are not completed
            .map((task, index) => (
              <View key={index} style={styles.task}>
                <Text style={styles.task_Title}>{task.taskTitle}</Text>
                <Text style={styles.taskDescrip}>
                  {task.taskDescription}
                </Text>
                <Text style={styles.taskDue_date}>
                  Due Date: {new Date(task.due_Date).toLocaleDateString()}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingBottom: 70,
  },
  tasks_Container: {
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
  task_Title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  taskDescrip: {
    fontSize: 14,
    color: "#ccc",
  },
  taskDue_date: {
    fontSize: 12,
    color: "#000",
  },
});

export default Calendar_Page;
