import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import authContext from "../auth/context";

function Message({ content, time, sent = true, sender }) {
  const { user } = useContext(authContext);
  const isSender = user.phoneNumber === sender;

  console.log(sent);

  return (
    <View style={[styles.container, isSender && styles.isSender]}>
      <Text selectable style={styles.text}>
        {content}
      </Text>
      <View style={styles.info}>
        <Text style={styles.time}>{time}</Text>
        {sent && isSender && (
          <MaterialCommunityIcons name="check-all" size={14} color="#5c5151" />
        )}
        {!sent && isSender && (
          <MaterialCommunityIcons
            name="progress-clock"
            size={12}
            color="#5c5151"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    padding: 5,
    maxWidth: "80%",
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "flex-end",
    alignSelf: "flex-start",
  },
  isSender: {
    backgroundColor: "#cccefc",
    alignSelf: "flex-end",
  },
  text: {
    color: colors.dark,
    fontSize: 18,
    marginRight: 5,
  },
  time: {
    color: "#5c5151",
    fontSize: 12,
    marginRight: 3,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Message;
