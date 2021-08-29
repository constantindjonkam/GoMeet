import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Confirmation from "../screens/Confirmation";
import SetProfile from "../screens/SetProfile";

const Stack = createStackNavigator();

export default AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="SetProfile" component={SetProfile} />
  </Stack.Navigator>
);

//mode="modal"
