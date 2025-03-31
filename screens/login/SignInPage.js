import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import { Task_context } from "../task_Context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignIn_Page = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, set_Loading] = useState(false);
  const { save_User_profile, check_User_exists } = useContext(Task_context);

  const handle_SignIn = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required");
      return;
    }

    set_Loading(true);

    try {
      // to check if user does exists
      const user_Exists = await check_User_exists(email);

      if (!user_Exists) {
        set_Loading(false);
        Alert.alert("Error in Sign In!", "User not found with this email.");
        return;
      }

      // Get user data from AsyncStorage if user exists.
      const users = usersJson ? JSON.parse(usersJson) : [];
      const usersJson = await AsyncStorage.getItem("users");

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        set_Loading(false);
        Alert.alert("Error in sign In", "Wrong password.");
        return;
      }

      save_User_profile(user); // Setting the user profile in context
      await AsyncStorage.setItem("currentUserEmail", email); // saving the log in user's email
      console.log("User successfully logged in:", user); // logging message of success

      set_Loading(false);
      navigation.navigate("Home"); // navigating to homescreen
    } catch (error) {
      set_Loading(false);
      Alert.alert("Error in sign In", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#995"
        secureTextEntry
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#995"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <View style={styles.button_Container}>
        {loading ? (
          <ActivityIndicator size="large" color="#f57d03" />
        ) : (
          <Button title="Sign In" onPress={handle_SignIn} color="#f57d03" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
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
  button_Container: {
    marginTop: 20,
    width: "80%",
    borderRadius: 25,
  },
  input: {
    backgroundColor: "#331",
    width: "80%",
    padding: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#f57d03",
    borderRadius: 10,
    color: "white",
  },
  
});

export default SignIn_Page;
