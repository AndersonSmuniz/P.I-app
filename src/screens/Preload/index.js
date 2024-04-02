import React, { useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Container, LoadingIcon } from "./styles";
import DiskBarber from "../../assets/logo/DiskBarber.svg";

export default () => {
    const navigation = useNavigation()
    useEffect(() => {
        // Função assíncrona para armazenar dados no AsyncStorage
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('token', '');
                console.log('Data stored successfully!');
            } catch (error) {
                console.error('Failed to store data:', error);
            }
        };

        // Função assíncrona para recuperar dados do AsyncStorage
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token);
                if (token !== 'null') {
                    console.log('Data retrieved successfully:', token);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainTabClient'}]
                    });
                } else {
                    navigation.navigate("SignIn")
                }
            } catch (error) {
                console.error('Failed to retrieve data:', error);
            }
        };

        // Chamada das funções de armazenamento e recuperação de dados
        // storeData();
        getData();
    }, []);

    return (
        <Container>
            <DiskBarber width="100%" height="160" />
            <LoadingIcon size="large" color={"#FEC200"} />
        </Container>
    );
};
