import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomNav from "../../components/BottomNav";

const HowToUsePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerText}>How to Use</Text>
        <View style={styles.section}>
          <Icon name="plus" size={40} color="#fff" />
          <Text style={styles.sectionHeader}>Add Task</Text>
          <Text style={styles.sectionText}>
            Use this button to add a new task. You can set the task title,
            description, priority, due date, and time.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="tasks" size={40} color="#fff" />
          <Text style={styles.sectionHeader}>Project</Text>
          <Text style={styles.sectionText}>
            Use this button to add a new project. You can set the project title,
            description, due date, time, and assign it to multiple users.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="calendar" size={40} color="#fff" />
          <Text style={styles.sectionHeader}>Calendar</Text>
          <Text style={styles.sectionText}>
            Use this button to view all your tasks and projects in a calendar
            view. You can see tasks that are due on specific dates.
          </Text>
        </View>
        <View style={styles.section}>
          <Icon name="trophy" size={40} color="#fff" />
          <Text style={styles.sectionHeader}>Achievements</Text>
          <Text style={styles.sectionText}>
            Use this button to view your achievements. You can see your current
            level, XP, and milestones you have reached.
          </Text>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 70,
  },
  headerText: {
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
  sectionHeader: {
    color: "#fff",
    fontSize: 24,
    marginVertical: 10,
  },
  sectionText: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 16,
  },
});

export default HowToUsePage;
