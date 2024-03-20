import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Preload from "../screens/Preload/index";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="Preload"
            
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={Signin} />
            <Stack.Screen name="SignUp" component={Signup} />
        </Stack.Navigator>
    );
}
