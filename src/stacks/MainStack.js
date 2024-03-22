import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Preload from "../screens/Preload";
import Signin from "../screens/Signin";
import Signup_client from "../screens/Signup_client";
import ChooseRoleScreen from "../screens/ChooseRoleScreen"; 
import SignupClientSecondPartScreen from "../screens/SignupClientSecondPart";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="Preload"
            
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={Signin} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="Signup_client" component={Signup_client} />
            <Stack.Screen name="SignupClientSecondPart" component={SignupClientSecondPartScreen} />
            
        </Stack.Navigator>
    );
}
