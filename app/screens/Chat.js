import React, { useCallback, useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import Avatar from "../components/Avatar";
import { TextInput } from "react-native-gesture-handler";
import Message from "../components/Message";
import {
  messageTime,
  convertToDateReadable,
  compareDate,
  lastSeen,
} from "../utility/time";
import TimeDivider from "../components/TimeDivider";
import { useEffect } from "react";
import authContext from "../auth/context";
import {
  getUserScrollStatus,
  getUserStatus,
  storeScrollIndex,
} from "../api/userStatus";
import useMessages from "../context/useMessages";

function Chat({ navigation, route }) {
  const scrollRef = useRef();
  const [message, setMessage] = useState("");
  const [userStatus, setUserStatus] = useState({});
  const [scrollIndex, setScrollIndex] = useState(0);
  // const [index, setIndex] = useState(); we can implement scroll back to last read message later

  const { user } = useContext(authContext);
  const { messages, addMessage } = useMessages();

  useEffect(() => {
    getUserStatus(route.params.chatName.phoneNumber, setUserStatus);
    if (scrollIndex === 0)
      getUserScrollStatus(user.phoneNumber, setScrollIndex);
  }, []);

  let index = 0;
  if (messages.length > 0 && scrollIndex)
    index = Math.abs(messages.length - scrollIndex - 2);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await addMessage(message, route.params.chatId, user.phoneNumber);
    setMessage("");
    if (messages) storeScrollIndex(user.phoneNumber, messages.length);
  };

  const handleNavigation = () => {
    if (messages) storeScrollIndex(user.phoneNumber, messages.length);
    navigation.navigate("Home");
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    // setIndex(viewableItems[0].index);
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="ios-arrow-back"
          size={48}
          style={styles.backIcon}
          onPress={handleNavigation}
        />
        <Avatar size={45} />
        <View style={styles.text}>
          <Text style={styles.chatName}>
            {route.params.chatName.contactName}
          </Text>
          <Text style={styles.detail}>
            {userStatus.state === "offline"
              ? lastSeen(userStatus.last_changed)
              : "Online"}
          </Text>
        </View>
      </View>

      <ImageBackground
        source={require("../assets/chatBg.png")}
        style={styles.messages}
        resizeMode="cover"
      >
        <FlatList
          ref={scrollRef}
          onContentSizeChange={() =>
            messages.length > 0 &&
            scrollRef.current.scrollToIndex({ index, animated: true })
          }
          onScrollToIndexFailed={() => console.log("failed")}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
          inverted
          data={messages}
          keyExtractor={(message) => message.date}
          renderItem={({ item, index }) => (
            <>
              <Message
                content={item.message}
                sender={item.phoneNumber}
                time={messageTime(item?.date)}
                sent={item.sent}
              />
              {compareDate(item?.date, messages[index + 1]?.date) && (
                <TimeDivider date={convertToDateReadable(item?.date)} />
              )}
            </>
          )}
        />
      </ImageBackground>
      <View style={styles.messenger}>
        <Entypo name="emoji-happy" size={30} color={colors.grey} />
        <TextInput
          onChangeText={setMessage}
          value={message}
          style={styles.input}
          multiline
          placeholder="Message..."
        />
        <Ionicons
          onPress={sendMessage}
          name="md-send"
          size={30}
          color={colors.grey}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    padding: 10,
    backgroundColor: colors.red,
    flexDirection: "row",
  },
  backIcon: {
    color: colors.primary,
    paddingLeft: 10,
    paddingRight: 30,
  },
  text: {
    marginLeft: 20,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detail: {
    color: colors.white,
    fontSize: 16,
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  messenger: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default Chat;
