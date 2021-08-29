import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function TimeDivider({ date }) {
  return <Text style={styles.container}>{date}</Text>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    backgroundColor: colors.grey,
    color: colors.white,
    margin: 10,
    borderRadius: 30,
  },
});

export default TimeDivider;
