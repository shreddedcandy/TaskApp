import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task_context } from "../task_Context";
import Bottom_Nav from "../../components/BottomNav";

const ChangeNNPage = ({ navigation }) => {
  const [new_Nickname, setNewNN] = useState("");
  const { user_Profile, save_User_profile } = useContext(Task_context);

  const handle_ChangeNN = async () => {
    if (!new_Nickname) {
      Alert.alert("Validation Error", "Nickname is required");
      return;
    }

    try {
      const updated_Profile = { ...user_Profile, nickname: new_Nickname };
      await AsyncStorage.setItem("userProfile", JSON.stringify(updated_Profile)); // save updated profile to AsyncStorage
      save_User_profile(updated_Profile); // update context with new user profile
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
          value={new_Nickname}
          onChangeText={setNewNN}
          placeholder="New Nickname"
          placeholderTextColor="#999"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Change Nickname"
            onPress={handle_ChangeNN}
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

export default ChangeNNPage;
