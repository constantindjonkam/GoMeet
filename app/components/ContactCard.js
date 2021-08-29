import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Button,
} from "react-native";

import colors from "../config/colors";
import Avatar from "./Avatar";

function ContactCard({ onPress, name, imageUri, isMember }) {
  return (
    <TouchableWithoutFeedback onPress={isMember && onPress}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar imageUri={imageUri} size={50} />
          <Text style={styles.text}>{name}</Text>
        </View>
        {!isMember && (
          <Button title="Invite" color={colors.red} onPress={onPress} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white2,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: colors.dark,
    marginLeft: 20,
  },
});

export default ContactCard;
