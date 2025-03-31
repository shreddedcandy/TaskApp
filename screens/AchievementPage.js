import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Task_context } from "./task_Context";
import { LinearGradient } from "expo-linear-gradient";
import Bottom_Nav from "../components/BottomNav";

const { width } = Dimensions.get("window");

const Achievement_Page = ({ navigation }) => {
  const { user_Profile, levels } = useContext(Task_context); // accessing userProfile and levels from TaskContext

  // Function to get the current level of the user
  const getCurrLevel = () => {
    if (!user_Profile || !levels || levels.length === 0) {
      return {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image for the initial level
      };
    }

    const currLevel = levels.find(
      (level) => level.name === userProfile.level
    );

    return (
      currLevel || {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image if no current level found
      }
    );
  };

  const currLevel = getCurrLevel();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll_Container}>
        {userProfile && (
          <View style={styles.currLevel}>
            <LinearGradient
              colors={["#0f0c29", "#302b63", "#24243e"]}
              style={styles.galaxy_Background}
            >
              <Text style={styles.header}>Current Level</Text>
              <Image source={currLevel.image} style={styles.image} />
              <Text style={styles.levelName}>{currLevel.name}</Text>
              <Text style={styles.XP}>
                {`${userProfile.xp} / ${currLevel.threshold} XP`}
              </Text>
            </LinearGradient>
          </View>
        )}
        <Text style={styles.header}>Achievements</Text>
        {levels &&
          levels.map((level, index) => (
            <View key={index} style={styles.card}>
              <LinearGradient
                colors={["#FFD700", "#FFA500"]}
                style={styles.gradient}
              >
                <Image
                  source={level.image || require("../assets/ig2.jpg")}
                  style={styles.image}
                />
                <Text style={styles.levelName}>{level.name}</Text>
                <Text style={styles.XP}>{`${level.threshold} XP`}</Text>
              </LinearGradient>
            </View>
          ))}
      </ScrollView>
      <Bottom_Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    flex: 1,
  },
  scroll_Container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingBottom: 70,
  },
  header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    width: width * 0.9,
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
  },
  gradient: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
  levelName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  XP: {
    color: "#fff",
    fontSize: 18,
  },
  currLevel: {
    width: width * 0.9,
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  galaxy_Background: {
    width: "100%",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
});

export default Achievement_Page;
