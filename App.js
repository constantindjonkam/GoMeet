import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import AppNavigation from "./app/navigation/AppNavigation";
import AuthNavigation from "./app/navigation/AuthNavigation";
import AuthContext from "./app/auth/context";
import { auth } from "./app/config/firebase";
import { spyUserStatus } from "./app/api/userStatus";
import MessagesContext from "./app/context/MessagesContext";
import { getMessages, getPrivateMessages } from "./app/api/messages";

export default function App() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = () => {
    auth.onAuthStateChanged(setUser);
  };

  const getAllMessages = () => {
    getPrivateMessages(setMessages, "testchat");
  };

  if (user) {
    spyUserStatus(user.phoneNumber);
  }

  if (!isReady)
    return (
      <AppLoading
        startAsync={() => {
          restoreUser();
          getAllMessages();
        }}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <NavigationContainer>
          {user ? <AppNavigation /> : <AuthNavigation />}
          {/* <AppNavigation /> */}
        </NavigationContainer>
      </MessagesContext.Provider>
    </AuthContext.Provider>
  );
}
