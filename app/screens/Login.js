import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { options, provider } from "../config/firebase";

import Screen from "../components/Screen";
import Picker from "../components/Picker";
import CountryCode from "../components/CountryCode";
import countries from "../config/countries";
import colors from "../config/colors";
import Button from "../components/Button";
import usePhoneVerification from "../hooks/usePhoneVerification";

function Login({ navigation }) {
  const recaptcha = useRef(null);
  const phone = usePhoneVerification(navigation);

  const handleSubmit = () => {
    if (
      !phone.error &&
      phone.phoneNumber.length >= 6 &&
      phone.phoneNumber.length <= 17
    ) {
      const fullPhoneNumber = "+" + phone.countryInfo.code + phone.phoneNumber;
      new provider()
        .verifyPhoneNumber(fullPhoneNumber, recaptcha.current)
        .then((id) => {
          navigation.navigate("Confirmation", { verificationId: id });
        })
        .catch(Alert.alert);
    } else Alert.alert("Your number is invalid");
  };

  return (
    <Screen style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptcha}
        firebaseConfig={options}
      />
      <Text style={styles.h1}>Please enter phone number</Text>
      <Text style={styles.h4}>
        GoMeet will send an SMS with a confirmation code to your phone number
      </Text>
      <View>
        <Picker
          PickerItemComponent={CountryCode}
          items={countries}
          placeholder={phone.countryInfo.country || phone.error}
          onSelectItem={phone.setCountryInfo}
        />
        <View style={styles.number}>
          <View style={styles.code}>
            <Text>+</Text>
            <TextInput
              style={styles.input}
              value={phone.countryInfo.code}
              onChangeText={phone.handleCode}
              keyboardType="number-pad"
              placeholder=""
            />
          </View>
          <TextInput
            style={styles.input}
            value={phone.phoneNumber}
            onChangeText={phone.handleChange}
            keyboardType="number-pad"
            placeholder="phone number"
          />
        </View>
      </View>
      <Button
        title={
          <View style={styles.text}>
            <Text style={{ color: colors.white, marginRight: 10 }}>
              Send Code
            </Text>
            <MaterialIcons name="sms" size={24} color="white" />
          </View>
        }
        onPress={handleSubmit}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    padding: 15,
  },
  number: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  input: {
    padding: 10,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
  code: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: colors.grey,
  },
  h4: {
    fontSize: 16,
    textAlign: "center",
    color: colors.blue,
  },
});

export default Login;
