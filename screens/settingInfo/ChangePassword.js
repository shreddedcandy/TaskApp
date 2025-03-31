import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottom_Nav from "../../components/BottomNav";

const ChangePWPage = ({ navigation }) => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmNewPW, setConfirmNewPW] = useState("");

  const handle_ChangePassword = async () => {
    if (!currPassword || !newPW || !confirmNewPW) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    if (newPW !== confirmNewPW) {
      Alert.alert("Validation Error", "New passwords do not match");
      return;
    }

    try {
      // Retrieve current user's email from AsyncStorage
      const user_Email = await AsyncStorage.getItem("currentUserEmail");
      console.log("Retrieved userEmail:", userEmail);

      if (user_Email) {
        // Retrieve the list of all users from AsyncStorage
        const users_Json = await AsyncStorage.getItem("users");
        const users = users_Json ? JSON.parse(users_Json) : [];

        // Find the user with the matching email
        const user = users.find((user) => user.email === user_Email.trim());
        console.log("Retrieved userProfile:", user);

        if (user) {
          // Check if the current password matches the one stored for the user
          if (user.password !== currPassword) {
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
          value={currPassword}
          onChangeText={setCurrPassword}
          placeholder="Current Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPW}
          onChangeText={setNewPW}
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmNewPW}
          onChangeText={setConfirmNewPW}
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Change Password"
            onPress={handle_ChangePassword}
            color="#f57d05"
          />
        </View>
      </View>
      <Bottom_Nav navigation={navigation} />
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

export default ChangePWPage;
