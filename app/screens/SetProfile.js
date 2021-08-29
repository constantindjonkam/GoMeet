import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import Button from "../components/Button";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";

function SetProfile({ route }) {
  const [imageUri, setImageUri] = useState(route.params.photoURL);
  const [username, setUsername] = useState(route.params.displayName);

  const { logIn } = useAuth();

  const handleProfile = () => {
    usersApi
      .updateUser(username)
      .then(() => logIn())
      .catch(() => alert("Couldn't update profile"));
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Your Profile</Text>
      </View>
      <ImageInput onSelect={setImageUri} imageUri={imageUri} />
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setUsername}
        value={username}
      />
      <Button title="Ok" style={styles.button} onPress={handleProfile} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: colors.red,
    padding: 20,
    margin: -20,
    marginBottom: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  input: {
    padding: 10,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 2,
    marginTop: 20,
    backgroundColor: colors.light,
  },
  button: {
    width: 100,
    alignSelf: "center",
    marginTop: 100,
  },
});

export default SetProfile;
