import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Container } from "./styles";
import DiskBarber from "../../assets/logo/DiskBarber.svg";
import { refresh_token, check_token } from "../../routes/routes"

export default () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const tokenString = await AsyncStorage.getItem('token');
                if (tokenString) {
                    const tokenJson = JSON.parse(tokenString);
                    console.log('Token JSON:', tokenJson);

                    const data = {
                        "refresh": tokenJson.refresh
                    };

                    const newToken = await refresh_token(data);
                    if (newToken) {
                        const updatedToken = {
                            access: newToken.access,
                            refresh: tokenJson.refresh
                        };
                        await AsyncStorage.setItem('token', JSON.stringify(updatedToken));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainTabClient' }]
                        });
                    } else {
                        navigation.navigate('SignIn');
                    }
                } else {
                    navigation.navigate('SignIn');
                }
            } catch (error) {
                console.error('Failed to retrieve data:', error);
                navigation.navigate('SignIn');
            }
        };
        checkToken();
    }, [navigation]);

    return (
        <Container>
            <DiskBarber width="100%" height="160" />
            <ActivityIndicator size="large" color={"#FEC200"} />
        </Container>
    );
};
