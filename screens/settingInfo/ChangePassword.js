import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../../components/BottomNav";

const ChangePasswordPage = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Validation Error", "New passwords do not match");
      return;
    }

    try {
      // Retrieve current user's email from AsyncStorage
      const userEmail = await AsyncStorage.getItem("currentUserEmail");
      console.log("Retrieved userEmail:", userEmail);

      if (userEmail) {
        // Retrieve the list of all users from AsyncStorage
        const usersJson = await AsyncStorage.getItem("users");
        const users = usersJson ? JSON.parse(usersJson) : [];

        // Find the user with the matching email
        const user = users.find((user) => user.email === userEmail.trim());
        console.log("Retrieved userProfile:", user);

        if (user) {
          // Check if the current password matches the one stored for the user
          if (user.password !== currentPassword) {
            throw new Error("Current password is incorrect.");
          }

          // Update the user's password
          const updatedUser = { ...user, password: newPassword };
          const updatedUsers = users.map((u) =>
            u.email === updatedUser.email ? updatedUser : u
          );

          // Save the updated users list back to AsyncStorage
          await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

          Alert.alert("Success", "Password updated successfully");
          navigation.goBack();
        } else {
          throw new Error("User profile not found.");
        }
      } else {
        throw new Error("No user is currently signed in.");
      }
    } catch (error) {
      console.log("Error changing password:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Change Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            color="#f57d05"
          />
        </View>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 70,
  },
  headerText: {
    color: "#f57d05",
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    width: "80%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#f57d05",
    borderRadius: 5,
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
});

export default ChangePasswordPage;
