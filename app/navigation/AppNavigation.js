import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

import Chat from "../screens/Chat";
import Home from "../screens/Home";
import Contact from "../screens/Contact";
import colors from "../config/colors";
import { Text } from "react-native";

const Stack = createStackNavigator();

const Test = () => (
  <Text
    onPress={() => console.log("Press")}
    style={{ justifyContent: "space-between" }}
  >
    Gostar <FontAwesome name="search" size={24} color={colors.dark} />
  </Text>
);

export default AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen
      name="Contact"
      component={Contact}
      options={{
        gestureEnabled: true,
        headerShown: true,
        headerTintColor: colors.red,
        headerTitle: () => <Test />,
      }}
    />
  </Stack.Navigator>
);

//mode="modal"
