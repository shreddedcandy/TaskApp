import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task_context } from "../task_Context";

const SignUp_Page = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, set_Loading] = useState(false);

  const { save_User_profile, add_User, check_User_exists } = useContext(Task_context); // use the saveUserProfile and addUser functions from TaskContext

  const handle_SignUp = async () => {
    if (!email || !password || !nickname) {
      Alert.alert(
        "Validation Error",
        "Email, Password, and Nickname are required"
      );
      return;
    }

    set_Loading(true);

    try {
      // Check if the email is already registered
      const userExists = await check_User_exists(email);

      if (userExists) {
        set_Loading(false);
        Alert.alert(
          "Email Already Registered",
          "You have an account with this email address."
        );
        return; // stop the signup process if user already exists
      }

      const userProfile = {
        xp: 0,
        level: "Task Apprentice",
        nickname,
        email,
        password,
      };

      // Add the new user to AsyncStorage
      await add_User(userProfile);
      save_User_profile(userProfile); // update context with new user profile
      await AsyncStorage.setItem("currentUserEmail", email); // set current user email for session persistence
      console.log("User successfully created:", userProfile); // success message

      set_Loading(false);
      navigation.navigate("Home"); // Navigate to home screen
    } catch (error) {
      set_Loading(false);
      Alert.alert("Sign Up Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="Nickname"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry //sensitive text like passwords stay secure.
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#f57d05" />
        ) : (
          <Button title="Sign Up" onPress={handle_SignUp} color="#f57d05" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    marginVertical: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: "#f57d05",
    borderRadius: 10,
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 25,
  },
});

export default SignUp_Page;
