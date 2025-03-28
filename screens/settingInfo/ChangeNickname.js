import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskContext } from "../TaskContext";
import BottomNav from "../../components/BottomNav";

const ChangeNicknamePage = ({ navigation }) => {
  const [newNickname, setNewNickname] = useState("");
  const { userProfile, saveUserProfile } = useContext(TaskContext);

  const handleChangeNickname = async () => {
    if (!newNickname) {
      Alert.alert("Validation Error", "Nickname is required");
      return;
    }

    try {
      const updatedProfile = { ...userProfile, nickname: newNickname };
      await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile)); // save updated profile to AsyncStorage
      saveUserProfile(updatedProfile); // update context with new user profile
      Alert.alert("Success", "Nickname updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Change Nickname</Text>
        <TextInput
          style={styles.input}
          value={newNickname}
          onChangeText={setNewNickname}
          placeholder="New Nickname"
          placeholderTextColor="#999"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Change Nickname"
            onPress={handleChangeNickname}
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

export default ChangeNicknamePage;
