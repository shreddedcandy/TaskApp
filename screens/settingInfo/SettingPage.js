import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottom_Nav from "../../components/BottomNav";

const Setting_Page = () => {
  const nav = useNavigation();

  // Function to handle user logout
  const handle_Logout = async () => {
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
      <View style={styles.content_Container}>
        <Text style={styles.header}>Setting</Text>
        <Text style={styles.sub_Header}>Account information</Text>

        {/* Button to navigate to ChangeNickname page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangeNickname")}
          >
          <Text style={styles.button_Text}>Change nickname</Text>
        </TouchableOpacity>

        {/* Button to navigate to ChangePassword page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.button_Text}>Change Password</Text>
        </TouchableOpacity>

        {/* Button to navigate to HowToUse page */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HowToUse")}
        >
          <Text style={styles.button_Text}>How to use?</Text>
        </TouchableOpacity>

        {/* Button to handle user logout */}
        <TouchableOpacity style={styles.logout_Button} onPress={handle_Logout}>
          <Text style={styles.button_Text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
  content_Container: {
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
  sub_Header: {
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
  logout_Button: {
    backgroundColor: "#cc7a00",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    marginTop: 40,
  },
  button_Text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Setting_Page;
