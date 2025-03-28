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
import { TaskContext } from "../TaskContext";

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveUserProfile, checkUserExists } = useContext(TaskContext);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required");
      return;
    }

    setLoading(true);

    try {
      // check if the user exists
      const userExists = await checkUserExists(email);

      if (!userExists) {
        setLoading(false);
        Alert.alert("Sign In Error", "No user found with this email.");
        return;
      }

      // If user exists, get user data from AsyncStorage
      const usersJson = await AsyncStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        setLoading(false);
        Alert.alert("Sign In Error", "Incorrect password.");
        return;
      }

      saveUserProfile(user); // Set the user profile in context
      await AsyncStorage.setItem("currentUserEmail", email); // save the log in user's email
      console.log("User successfully logged in:", user); // log success message

      setLoading(false);
      navigation.navigate("Home"); // navigate to home screen
    } catch (error) {
      setLoading(false);
      Alert.alert("Sign In Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>
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
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#f57d05" />
        ) : (
          <Button title="Sign In" onPress={handleSignIn} color="#f57d05" />
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
  input: {
    backgroundColor: "#333",
    width: "80%",
    padding: 15,
    marginVertical: 15,
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

export default SignInPage;
