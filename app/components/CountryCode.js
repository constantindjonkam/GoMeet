import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import colors from "../config/colors";

function CountryCode({ country, code, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{country}</Text>
        <Text style={styles.code}>+{code}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderTopColor: colors.light,
    borderBottomColor: colors.light,
  },
  text: {
    color: colors.dark,
  },
  code: {
    color: colors.grey,
    fontWeight: "bold",
  },
});

export default CountryCode;
