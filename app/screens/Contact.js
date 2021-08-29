import React from "react";
import { FlatList, StyleSheet, Alert, Text, View } from "react-native";
import { sendSMSAsync, isAvailableAsync } from "expo-sms";
import { FontAwesome } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ContactCard from "../components/ContactCard";
import colors from "../config/colors";
import useContacts from "../hooks/useContacts";

function Contact() {
  const contacts = useContacts();

  const sendSMS = async (phoneNumber) => {
    const isAvailable = await isAvailableAsync();
    if (isAvailable) {
      await sendSMSAsync(
        phoneNumber,
        "I invite you to join GoMeet. You can get it from https://www.gomeet.cf"
      );
    } else
      Alert.alert("Unfortunately there is no SMS available on this device");
  };

  const handleContact = (isMember, phoneNumber) => {
    if (!isMember) return sendSMS(phoneNumber);
    // open phonenumber gomeet chat
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Contacts</Text>
        <FontAwesome name="search" size={24} color={colors.light} />
      </View>
      <FlatList
        data={contacts.sort((a, b) => (a.name > b.name ? 1 : -1))}
        keyExtractor={(item) => item.phoneNumber + item.name}
        renderItem={({ item }) => (
          <ContactCard
            name={item.name || item.phoneNumber}
            onPress={() => handleContact(false, item.phoneNumber)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: colors.red,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Contact;
