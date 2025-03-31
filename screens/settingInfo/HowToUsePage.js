import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Bottom_Nav from "../../components/BottomNav";

const How_ToUse_Page = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content_Container}>
        <Text style={styles.header_Text}>How to Use</Text>
        <View style={styles.section}>
          <Icon name="plus" size={40} color="#fff" />
          <Text style={styles.section_Header}>Add Task</Text>
          <Text style={styles.section_Text}>
            Use this button to add a new task. You can set the task title,
            description, priority, due date, and time.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="tasks" size={40} color="#fff" />
          <Text style={styles.section_Header}>Project</Text>
          <Text style={styles.section_Text}>
            Use this button to add a new project. You can set the project title,
            description, due date, time, and assign it to multiple users.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="calendar" size={40} color="#fff" />
          <Text style={styles.section_Header}>Calendar</Text>
          <Text style={styles.section_Text}>
            Use this button to view all your tasks and projects in a calendar
            view. You can see tasks that are due on specific dates.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="trophy" size={40} color="#fff" />
          <Text style={styles.section_Header}>Achievements</Text>
          <Text style={styles.section_Text}>
            Use this button to view your achievements. You can see your current
            level, XP, and milestones you have reached.
          </Text>
        </View>
      </ScrollView>
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content_Container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 70,
  },
  header_Text: {
    color: "#f57d05",
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#333",
    alignItems: "center",
    width: "100%",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  section_Header: {
    color: "#fff",
    fontSize: 24,
    marginVertical: 10,
  },
  section_Text: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 16,
  },
});

export default How_ToUse_Page;
