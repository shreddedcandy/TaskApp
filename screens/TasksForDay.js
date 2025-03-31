import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Bottom_Nav from "../components/BottomNav";

const Tasks_For_day = ({ route, navigation }) => {
  const { tasks } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Tasks for the Day</Text>
        {tasks && tasks.length > 0 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id} // unique key for each item
            renderItem={({ item }) => {
              const dueDate = new Date(item.dueDate); // convert back to date object

              return (
                <View
                  style={[
                    styles.task,
                    item.overdue && styles.overdueTask, // overdue style if the task is overdue
                  ]}
                >
                  <Text style={styles.taskTitle}>{item.taskTitle}</Text>
                  <Text style={styles.taskDescription}>
                    {item.taskDescription}
                  </Text>
                  <Text style={styles.taskDueDate}>
                    Due Date: {dueDate.toLocaleDateString()}
                  </Text>
                  <Text style={styles.taskDueTime}>
                    Due Time:{" "}
                    {dueDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  {item.overdue && (
                    <Text style={styles.overdueText}>Overdue</Text>
                  )}
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noTasksText}>No tasks for today!</Text>
        )}
      </View>
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  task: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  overdueTask: {
    backgroundColor: "#ff4d4d",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#fff",
  },
  taskDueDate: {
    fontSize: 12,
    color: "#fff",
  },
  taskDueTime: {
    fontSize: 12,
    color: "#fff",
  },
  overdueText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    marginTop: 5,
  },
  noTasksText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Tasks_For_day;
