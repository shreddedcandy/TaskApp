import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Setting")}
      >
        <Icon name="cog" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFA726",
    paddingVertical: 10,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomNav;
