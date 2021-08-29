import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import Avatar from "../components/Avatar";
import ChatCard from "../components/ChatCard";
import { getChats } from "../api/chats";
import authContext from "../auth/context";
import useMessages from "../context/useMessages";

function Home({ imageUrl, navigation }) {
  const [chats, setChats] = useState([]);
  const { user } = useContext(authContext);
  const { messages } = useMessages();

  useEffect(() => {
    getChats(setChats, user.phoneNumber);
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>GoMeet</Text>
        <View style={styles.headerRight}>
          <FontAwesome name="search" size={24} color={colors.light} />
          <MaterialIcons
            name="contacts"
            size={30}
            color={colors.light}
            onPress={() => navigation.navigate("Contact")}
          />
          <Avatar imageUri={imageUrl} />
        </View>
      </View>

      <ScrollView>
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            onPress={(contactName) =>
              navigation.navigate("Chat", {
                chatId: chat.id,
                chatName: contactName,
              })
            }
            lastMessage={messages[0]}
            phoneNumber={chat.members.filter((m) => m !== user.phoneNumber)[0]}
            unread={chat.total}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: colors.red,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appName: {
    color: colors.light,
    fontSize: 26,
    fontWeight: "bold",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    justifyContent: "space-between",
  },
});

export default Home;
