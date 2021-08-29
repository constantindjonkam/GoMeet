import React from "react";
import { StyleSheet, TextInput, Text, Alert } from "react-native";
import { auth, provider } from "../config/firebase";

import Button from "../components/Button";
import usePhoneVerification from "../hooks/usePhoneVerification";
import colors from "../config/colors";
import Screen from "../components/Screen";

function Confirmation({ number, navigation, route }) {
  const phone = usePhoneVerification();

  const confirmCode = () => {
    if (!/^[0-9]*$/.test(phone.code) || phone.code.length !== 6)
      return Alert.alert("Invalid code");
    const credential = provider.credential(
      route.params.verificationId,
      phone.code
    );
    auth
      .signInWithCredential(credential)
      .then(({ user: { displayName, photoURL } }) => {
        navigation.navigate("SetProfile", { displayName, photoURL });
      })
      .catch((ex) => alert(ex.toString()));
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.h1}>Verifications for {number}...</Text>
      <Text style={styles.h4}>
        We sent a code to {number}. Enter it below to continue.{" "}
        <Text style={{ color: colors.blue }}>Wrong number?</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={phone.code}
        onChangeText={phone.handleCodeChange}
        keyboardType="number-pad"
        placeholder="- - -   - - -"
      />
      <Text style={styles.text}>Enter 6-digits code</Text>
      <Button title="Verify" onPress={confirmCode} />
      <Text style={styles.footer}>
        Didn't recieve SMS?{" "}
        <Text style={{ color: colors.blue }} onPress={phone.handleSubmit}>
          Try again
        </Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  input: {
    padding: 10,
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    width: 102,
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 20,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: colors.grey,
    flex: 0.5,
  },
  h4: {
    fontSize: 16,
    textAlign: "center",
    color: colors.primary,
  },
  text: {
    textAlign: "center",
    marginBottom: 50,
    marginTop: 10,
    color: colors.grey,
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
  },
});

export default Confirmation;
