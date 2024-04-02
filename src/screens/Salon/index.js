import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderClient from "../../components/HeaderClient";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

import Location from "../../assets/location.svg"
import Back from "../../assets/back.svg"

export default function Salon() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity on onPress={()  => navigation.goBack()} >
                <Back width="35" height="35" fill="#fff" />
            </TouchableOpacity>
            <View style={styles.infoSalon}>
                <Image source={{ uri: "https://th.bing.com/th/id/OIP.esfcXL7-1BLqq3a1fDyh1AHaE8?rs=1&pid=ImgDetMain" }} style={styles.image} />
                <View style={styles.infoText}>
                    <Text style={styles.nameSalon}>
                        Nome do Salao
                    </Text>
                    <View style={styles.line} >
                        <Location width="24" height="24" />
                        <Text style={styles.adreess}>Rua x</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#2D343C",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    infoSalon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    infoText: {
        alignItems: "center",
        margin: 10,
        gap: 10,
    },
    nameSalon: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
    },
    adreess: {
        color: "#6B7078",
        fontSize: 16,
    },
    line: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 10,
    },
});