import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Landing_page = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logo_Container}>
        <Image source={require("../assets/gamiwork.png")} style={styles.logo} />
      </View>
      {/* Subtitle Text */}
      <Text style={styles.subtitle}>Collaborate. Compete. Conquer.</Text>
      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.button_Text}>Sign In</Text>
      </TouchableOpacity>
      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.button_Text}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  logo_Container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 130,
    height: 130,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    marginBottom: 85,
  },
  button: {
    width: "80%",
    backgroundColor: "#f57d05",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  button_Text: {
    color: "white",
    fontSize: 16,
  },
});

export default Landing_page;
