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
import { Task_context } from "./task_Context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import Bottom_Nav from "../components/BottomNav";

const Project_page = ({ navigation }) => {
  const [task_Title, set_Task_title] = useState("");
  const [taskDescrip, set_Task_descrip] = useState("");
  const [due_Date, set_Due_date] = useState(new Date());
  const [isDatePicker_Visible, setDatePicker_Visibility] = useState(false);
  const [isTimePicker_Visible, setTimePicker_Visibility] = useState(false);
  const [email, set_Email] = useState("");
  const [user_Emails, set_User_emails] = useState([]);

  const { add_Task, check_User_exists } = useContext(Task_context);

  const handle_Add_task = async () => {
    if (!task_Title || !taskDescrip) {
      Alert.alert(
        "Validation Error",
        "Project title and description are required"
      );
      return;
    }

    try {
      const userUIDs = await Promise.all(
        user_Emails.map(async (email) => {
          const userExists = await check_User_exists(email);
          if (userExists) {
            return email;
          } else {
            return null;
          }
        })
      ).then((results) => results.filter((email) => email !== null));

      console.log("Adding task with:", { task_Title, taskDescrip, due_Date }); // Debug log before addTask
      const projectData = {
        task_Title,
        taskDescrip,
        due_Date,
        type: "project",
      };
      console.log("Adding project with:", projectData, "and users:", userUIDs); // log project data and users before adding

      await add_Task(projectData, userUIDs);
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
    if (user_Emails.length >= 5) {
      Alert.alert("Error", "Cannot add more than 5 users");
      return;
    }
    try {
      const userExists = await check_User_exists(email);
      if (!userExists) {
        Alert.alert("Error", "User does not exist");
        return;
      }
      set_User_emails([...user_Emails, email]);
      set_Email(""); // clear the input field
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const showDatePicker = () => {
    setDatePicker_Visibility(true);
  };

  const hideDatePicker = () => {
    setDatePicker_Visibility(false);
  };

  const handleConfirmDate = (date) => {
    set_Due_date(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePicker_Visibility(true);
  };

  const hideTimePicker = () => {
    setTimePicker_Visibility(false);
  };

  const handleConfirmTime = (time) => {
    set_Due_date(time);
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
              value={task_Title}
              onChangeText={set_Task_title}
              placeholder="Project title"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.labelText}>Project Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={taskDescrip}
              onChangeText={set_Task_descrip}
              placeholder="Project description"
              placeholderTextColor="#aaa"
              multiline
            />

            <Text style={styles.labelText}>Due Date:</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>{due_Date.toDateString()}</Text>
            </TouchableOpacity>

            <Text style={styles.labelText}>Due Time:</Text>
            <TouchableOpacity
              onPress={showTimePicker}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>
                {due_Date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePicker_Visible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />

            <DateTimePickerModal
              isVisible={isTimePicker_Visible}
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
                onChangeText={set_Email}
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
            {user_Emails.map((userEmail, index) => (
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
              onPress={handle_Add_task}
            >
              <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Bottom_Nav navigation={navigation} />
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

export default Project_page;
