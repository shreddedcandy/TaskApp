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
import { TaskContext } from "./TaskContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "../components/BottomNav";

const ProjectPage = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmails, setUserEmails] = useState([]);

  const { addTask, checkUserExists } = useContext(TaskContext);

  const handleAddTask = async () => {
    if (!taskTitle || !taskDescription) {
      Alert.alert(
        "Validation Error",
        "Project title and description are required"
      );
      return;
    }

    try {
      const userUIDs = await Promise.all(
        userEmails.map(async (email) => {
          const userExists = await checkUserExists(email);
          if (userExists) {
            return email;
          } else {
            return null;
          }
        })
      ).then((results) => results.filter((email) => email !== null));

      console.log("Adding task with:", { taskTitle, taskDescription, dueDate }); // Debug log before addTask
      const projectData = {
        taskTitle,
        taskDescription,
        dueDate,
        type: "project",
      };
      console.log("Adding project with:", projectData, "and users:", userUIDs); // log project data and users before adding

      await addTask(projectData, userUIDs);
      console.log(
        "Project added successfully:",
        projectData,
        "for users:",
        userUIDs
      ); // log success message

      Alert.alert("Success", "Project added successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Error occurred during addTask:", error); // Debug log for errors
      Alert.alert("Error", error.message);
    }
  };

  const handleAddUser = async () => {
    if (userEmails.length >= 5) {
      Alert.alert("Error", "Cannot add more than 5 users");
      return;
    }
    try {
      const userExists = await checkUserExists(email);
      if (!userExists) {
        Alert.alert("Error", "User does not exist");
        return;
      }
      setUserEmails([...userEmails, email]);
      setEmail(""); // clear the input field
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
    setDueDate(time);
    hideTimePicker();
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Add Project</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Project Title:</Text>
            <TextInput
              style={styles.input}
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="Project title"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.labelText}>Project Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={taskDescription}
              onChangeText={setTaskDescription}
              placeholder="Project description"
              placeholderTextColor="#aaa"
              multiline
            />

            <Text style={styles.labelText}>Due Date:</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>{dueDate.toDateString()}</Text>
            </TouchableOpacity>

            <Text style={styles.labelText}>Due Time:</Text>
            <TouchableOpacity
              onPress={showTimePicker}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>
                {dueDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>

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

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>User Email:</Text>
            <View style={styles.userInputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Max 5 collaborator"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                style={styles.addUserButton}
                onPress={handleAddUser}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {userEmails.map((userEmail, index) => (
              <Text key={index} style={styles.userEmail}>
                {userEmail}
              </Text>
            ))}
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
              <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
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
    flex: 1,
  },
  textArea: {
    height: 100,
  },
  dateButton: {
    backgroundColor: "#3b3b3b",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  userInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addUserButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
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
  userEmail: {
    color: "#fff",
    marginTop: 5,
  },
});

export default ProjectPage;
