import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import colors from "../config/colors";
import useContacts from "../hooks/useContacts";
import { chatTimestamp } from "../utility/time";
import Avatar from "./Avatar";
import { getUserScrollStatus } from "../api/userStatus";
import authContext from "../auth/context";

function ChatCard({ onPress, phoneNumber, lastMessage, unread }) {
  const [read, setRead] = useState(0);
  const contacts = useContacts();

  const { user } = useContext(authContext);

  useEffect(() => getUserScrollStatus(user.phoneNumber, setRead), []);

  console.log(read, unread);

  const contact = contacts.find(
    (c) => c.phoneNumber.replace(/[^+\d]+/g, "") === phoneNumber
  );

  const contactName = contact?.name || phoneNumber;

  return (
    <TouchableHighlight
      underlayColor={colors.white2}
      onPress={() => onPress({ contactName, phoneNumber })}
    >
      <View style={styles.container}>
        <Avatar size={65} />
        <View style={styles.text}>
          <Text style={styles.chatName} numberOfLines={1}>
            {contactName}
          </Text>
          <Text numberOfLines={1} style={styles.message}>
            {lastMessage.message}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.message} numberOfLines={1}>
            {chatTimestamp(lastMessage.date)}
          </Text>
          {unread - read - 1 > 0 ? (
            <Text numberOfLines={1} style={styles.badge}>
              {unread - read - 1}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0e6e6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: colors.white2,
  },
  text: {
    marginLeft: 15,
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  message: {
    color: colors.grey,
    fontSize: 16,
  },
  right: {
    marginLeft: 15,
    alignItems: "flex-end",
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: colors.white,
    borderRadius: 30,
    fontWeight: "bold",
  },
});

export default ChatCard;
