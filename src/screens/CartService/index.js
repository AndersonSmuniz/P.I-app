import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { UserContext } from "../../contexts/Usercontext"
import CategoryComponent from '../../components/CategoryComponent';

import Location from "../../assets/location.svg"
import Back from "../../assets/back.svg"
import Scissors from "../../assets/scissors.svg"

const CartService = () => {
    const [selectedIcon, setSelectedIcon] = useState('services');
    const navigation = useNavigation();
    const route = useRoute();
    const { state } = useContext(UserContext);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
    };
    const salonData = state.currentSalon;
    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Back width="35" height="35" fill="#fff" />
            </TouchableOpacity>
            
            {/* renderiza componentes com base no icine pressionado */}
            {selectedIcon === 'services' && <CategoryComponent id_salon={salonData.id} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenLoad: {
        flex: 1,
        backgroundColor: "#2D343C",
        alignItems:"center",
        justifyContent: "center",
    },
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
    address: {
        color: "#6B7078",
        fontSize: 12,
    },
    line: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        backgroundColor: "#6B7078",
        padding: 10,
        borderRadius: 20,
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        color: '#D7D1D1',
        fontSize: 12,
        marginTop: 5,
        paddingBottom: 3,
    },
    selectedIcon: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    selectedText: {
        color: '#fff',
    }
});

export default CartService;
