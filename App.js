import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import UsercontextProvider from "./src/contexts/Usercontext";
import MainStack from "./src/stacks/MainStack"

export default () => {

  return (
    <UsercontextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UsercontextProvider>

  );
}