import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Bottom_Nav = ({ navigation }) => {
  return (
    <View style={styles.bottom_Nav}>
      <TouchableOpacity
        style={styles.nav_Button}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nav_Button}
        onPress={() => navigation.navigate("Setting")}
      >
        <Icon name="cog" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Bottom_Nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFA726",
    paddingVertical: 10,
  },
  nav_Button: {
    flex: 1,
    alignItems: "center",
  },
  
});

export default Bottom_Nav;
