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
import { Task_context } from "./task_Context";

import { LinearGradient } from "expo-linear-gradient";
import Bottom_Nav from "../components/BottomNav";

const Add_TaskPage = ({ navigation }) => {
  // State variables for task
  const [task_Title, set_TaskTitle] = useState("");
  const [taskDescrip, setTaskDescrip] = useState("");
  const [priority, set_Priority] = useState("Low");
  const [due_Date, setDue_date] = useState(new Date());
  const [isDatePicker_Visible, setDatePicker_Visibility] = useState(false);
  const [isTimePicker_Visible, setTimePicker_Visibility] = useState(false);

  // access addTask function from TaskContext
  const { add_Task } = useContext(Task_context);

  // function to handle adding a task
  const handle_AddTask = async () => {
    if (!task_Title || !taskDescrip) {
      Alert.alert(
        "Validation Error",
        "Task title and description are required"
      );
      return;
    }
    try {
      const task = {
        task_Title,
        taskDescrip,
        priority,
        due_Date,
        type: "task",
      };
      await add_Task(task);
      console.log("Task added successfully:", task); // task information
      Alert.alert("Success", "Task added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const showDatePicker = () => {
    setDatePicker_Visibility(true);
  };

  const hide_DatePicker = () => {
    setDatePicker_Visibility(false);
  };

  const handle_ConfirmDate = (date) => {
    setDue_Date(date);
    hide_DatePicker();
  };

  const showTimePicker = () => {
    setTimePicker_Visibility(true);
  };

  const hideTimePicker = () => {
    setTimePicker_Visibility(false);
  };

  const handle_ConfirmTime = (time) => {
    const currDueDate = new Date(due_Date);
    const selectedHrs = time.getHours();
    const selectedMins = time.getMinutes();
    currDueDate.setHours(selectedHrs);
    currDueDate.setMinutes(selectedMins);
    setDue_date(currDueDate);
    hideTimePicker();
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      {/* scroll view content container which wraps all of the child views */}
      <ScrollView contentContainerStyle={styles.scroll_Container}>
        <View style={styles.header}>
          <Text style={styles.header_Text}>Add Task</Text>
        </View>

        <View style={styles.input_Container}>
          <Text style={styles.label_Text}>Task Title:</Text>
          <TextInput
            style={styles.input}
            value={task_Title}
            onChangeText={set_TaskTitle}
            placeholder="Task title"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label_Text}>Task Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={taskDescrip}
            onChangeText={setTaskDescrip}
            placeholder="Task description"
            placeholderTextColor="#aaa"
            multiline
          />
          {/* Priority level section */}
          <Text style={styles.label_Text}>Priority Level:</Text>
          <View style={styles.priorityContainer}>
            {["Low", "Med", "High", "Critical"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityButton,
                  priority === level && styles.selectedPriority,
                ]}
                onPress={() => set_Priority(level)}
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
          <Text style={styles.label_Text}>Due Date:</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
            <Text style={styles.button_Text}>{due_Date.toDateString()}</Text>
          </TouchableOpacity>
          {/* Due date section */}
          <Text style={styles.label_Text}>Due Time:</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
            <Text style={styles.button_Text}>
              {due_Date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {/* Selection of time and date section */}
          <DateTimePickerModal
            isVisible={isDatePicker_Visible}
            mode="date"
            onConfirm={handle_ConfirmDate}
            onCancel={hide_DatePicker}
          />

          <DateTimePickerModal
            isVisible={isTimePicker_Visible}
            mode="time"
            onConfirm={handle_ConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.button_Text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handle_AddTask}
          >
            <Text style={styles.button_Text}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Bottom_Nav navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll_Container: {
    justifyContent: "center",
    flexGrow: 1,
    padding: 20,
    paddingBottom: 70,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  header_Text: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  input_Container: {
    marginBottom: 20,
  },
  label_Text: {
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
  button_Text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Add_TaskPage;
