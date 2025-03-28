import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { TaskContext } from "./TaskContext";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "../components/BottomNav";

const { width } = Dimensions.get("window");

const AchievementPage = ({ navigation }) => {
  const { userProfile, levels } = useContext(TaskContext); // accessing userProfile and levels from TaskContext

  // Function to get the current level of the user
  const getCurrentLevel = () => {
    if (!userProfile || !levels || levels.length === 0) {
      return {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image for the initial level
      };
    }

    const currentLevel = levels.find(
      (level) => level.name === userProfile.level
    );

    return (
      currentLevel || {
        name: "Task Apprentice",
        xp: 0,
        threshold: 300,
        image: require("../assets/ig2.jpg"), // default image if no current level found
      }
    );
  };

  const currentLevel = getCurrentLevel();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {userProfile && (
          <View style={styles.currentLevel}>
            <LinearGradient
              colors={["#0f0c29", "#302b63", "#24243e"]}
              style={styles.galaxyBackground}
            >
              <Text style={styles.header}>Current Level</Text>
              <Image source={currentLevel.image} style={styles.image} />
              <Text style={styles.levelName}>{currentLevel.name}</Text>
              <Text style={styles.xp}>
                {`${userProfile.xp} / ${currentLevel.threshold} XP`}
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
                <Text style={styles.xp}>{`${level.threshold} XP`}</Text>
              </LinearGradient>
            </View>
          ))}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    flex: 1,
  },
  scrollContainer: {
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
  xp: {
    color: "#fff",
    fontSize: 18,
  },
  currentLevel: {
    width: width * 0.9,
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  galaxyBackground: {
    width: "100%",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
});

export default AchievementPage;
