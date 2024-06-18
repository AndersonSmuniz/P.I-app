import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Preload from "../screens/Preload";
import Signin from "../screens/Signin";
import Signup_client from "../screens/Signup_client";
import ChooseRoleScreen from "../screens/ChooseRoleScreen"; 
import SignupClientSecondPartScreen from "../screens/SignupClientSecondPart";
import MainTabClient from "./MainTabClient";
import Salon from "../screens/Salon";
import BookingService from "../screens/BookingService";
import ServicesCategory from "../screens/ServicesCategory";
import CartService from "../screens/CartService";
import BookingDetails from "../screens/BookingDetails";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false,
            }}
            
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={Signin} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="Signup_client" component={Signup_client} />
            <Stack.Screen name="SignupClientSecondPart" component={SignupClientSecondPartScreen} />
            <Stack.Screen name="MainTabClient" component={MainTabClient} />
            
            <Stack.Screen name="Salon" component={Salon} />
            <Stack.Screen name="Services" component={ServicesCategory} />
            <Stack.Screen name="Cart" component={CartService} />
            <Stack.Screen name="Booking" component={BookingService} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} />
        </Stack.Navigator>
    );
}
