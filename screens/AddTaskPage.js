import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TaskContext } from "./TaskContext";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "../components/BottomNav";

const AddTaskPage = ({ navigation }) => {
  // State variables for task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // access addTask function from TaskContext
  const { addTask } = useContext(TaskContext);

  // function to handle adding a task
  const handleAddTask = async () => {
    if (!taskTitle || !taskDescription) {
      Alert.alert(
        "Validation Error",
        "Task title and description are required"
      );
      return;
    }
    try {
      const task = {
        taskTitle,
        taskDescription,
        priority,
        dueDate,
        type: "task",
      };
      await addTask(task);
      console.log("Task added successfully:", task); // task information
      Alert.alert("Success", "Task added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const currentDueDate = new Date(dueDate);
    const selectedHours = time.getHours();
    const selectedMinutes = time.getMinutes();
    currentDueDate.setHours(selectedHours);
    currentDueDate.setMinutes(selectedMinutes);
    setDueDate(currentDueDate);
    hideTimePicker();
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      {/* scroll view content container which wraps all of the child views */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Task</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Task Title:</Text>
          <TextInput
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Task title"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.labelText}>Task Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Task description"
            placeholderTextColor="#aaa"
            multiline
          />
          {/* Priority level section */}
          <Text style={styles.labelText}>Priority Level:</Text>
          <View style={styles.priorityContainer}>
            {["Low", "Med", "High", "Critical"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityButton,
                  priority === level && styles.selectedPriority,
                ]}
                onPress={() => setPriority(level)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === level && styles.selectedPriorityText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Due date section */}
          <Text style={styles.labelText}>Due Date:</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
            <Text style={styles.buttonText}>{dueDate.toDateString()}</Text>
          </TouchableOpacity>
          {/* Due date section */}
          <Text style={styles.labelText}>Due Time:</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
            <Text style={styles.buttonText}>
              {dueDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {/* Selection of time and date section */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddTask}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    flexGrow: 1,
    padding: 20,
    paddingBottom: 70,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    color: "#fff",
  },
  textArea: {
    height: 100,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  priorityButton: {
    backgroundColor: "#3b3b3b",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  selectedPriority: {
    backgroundColor: "#4caf50",
  },
  priorityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedPriorityText: {
    color: "#000",
  },
  dateButton: {
    backgroundColor: "#3b3b3b",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    flex: 1,
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#d32f2f",
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddTaskPage;
