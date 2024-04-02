import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeClient from "../screens/HomeClient";
import Search from "../screens/Seach";
import Appointments from "../screens/Appointments";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";

import TabBar from "../components/TabBar";

const Tab = createBottomTabNavigator();

export default function MainTabClient() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
            tabBar={props => <TabBar{...props} />}
        >

            <Tab.Screen name="Home" component={HomeClient} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Appointments" component={Appointments} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
