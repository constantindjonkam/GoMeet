import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import colors from "../config/colors";

function Avatar({ size = 40, imageUri, onPress, style }) {
  return (
    <View style={style}>
      {imageUri && (
        <TouchableWithoutFeedback onPress={onPress}>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.image, { height: size, width: size }]}
          />
        </TouchableWithoutFeedback>
      )}
      {!imageUri && (
        <View
          onPress={onPress}
          style={[styles.image, { height: size, width: size }]}
        >
          <Fontisto name="person" size={size / 2} color={colors.grey} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;
