import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Constants from "expo-constants";

import colors from "../config/colors";
import Button from "../components/Button";

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.inside}>
        <Text style={styles.header}>Welcome !</Text>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.inside}>
        <Text style={styles.text}>
          If you continue, you agree to our terms and service.
        </Text>
        <Button title="Continue" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white2,
    flex: 1,
    padding: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 150,
  },
  header: {
    fontSize: 50,
    color: colors.dark,
    fontWeight: "bold",
  },
  inside: {
    paddingVertical: 60,
    alignItems: "center",
  },
  text: {
    color: colors.dark,
    paddingVertical: 40,
  },
});

export default Welcome;
