import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import UsercontextProvider from "./src/contexts/Usercontext";
import MainStack from "./src/stacks/MainStack"
import { StatusBar } from "expo-status-bar";

export default () => {

  return (
    <UsercontextProvider>
      <NavigationContainer>
        <MainStack />
        <StatusBar style="light"/>
      </NavigationContainer>
    </UsercontextProvider>

  );
}