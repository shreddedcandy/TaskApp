import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../../components/BottomNav";

const SettingPage = () => {
  const navigation = useNavigation();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Clear the user data from AsyncStorage to log out
      await AsyncStorage.removeItem("currentUserEmail");
      await AsyncStorage.removeItem("userProfile");
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Sign Out error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Setting</Text>
        <Text style={styles.subHeader}>Account information</Text>

        {/* Button to navigate to ChangeNickname page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangeNickname")}
        >
          <Text style={styles.buttonText}>Change nickname</Text>
        </TouchableOpacity>

        {/* Button to navigate to ChangePassword page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        {/* Button to navigate to HowToUse page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HowToUse")}
        >
          <Text style={styles.buttonText}>How to use?</Text>
        </TouchableOpacity>

        {/* Button to handle user logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 70,
  },
  header: {
    fontSize: 32,
    textAlign: "left",
    fontWeight: "bold",
    color: "#cc7a00",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a87522",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#cc7a00",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#cc7a00",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SettingPage;
