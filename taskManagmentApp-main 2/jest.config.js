module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@expo(nent)?|expo-.*|react-native|@react-native|@testing-library|@unimodules|react-native-modal-datetime-picker|@react-native-async-storage|@react-native-community/datetimepicker)/)",
  ],
  moduleNameMapper: {
    "^react-native-vector-icons/(.*)$":
      "<rootDir>/__mocks__/react-native-vector-icons.js", // Updated mapping for all icon sets
    "^expo-linear-gradient$": "<rootDir>/__mocks__/expo-linear-gradient.js",
  },
};
