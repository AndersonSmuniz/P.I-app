import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderClient from "../../components/HeaderClient";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SearchIcon from "../../assets/search.svg";

import SalonsComponent from "../../components/SalonsComponent.js"
import SalonsFavoritesComponent from "../../components/SalonsFavoritesComponent.js"

import { getSalons, getSalonsFavorites } from "../../routes/routes.js"

const HomeClient = () => {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [activeLink, setActiveLink] = useState('All');
    const [salonsList, setSalonsList] = useState([]);
    const [userName, setUserName] = useState('');
    

    useEffect(() => {
        fetchSalons();
        retrieveUsername();
    }, []);

    const retrieveUsername = async () => {
        try {
            const username = await AsyncStorage.getItem('Username');
            if (username !== null) {
                setUserName(username);
            }
        } catch (error) {
            console.log('Error retrieving username:', error);
        }
    };

    const fetchSalons = async () => {
        try {
            console.log("fetching salons");
            const response = await getSalons();
            console.log(response.data);
            setSalonsList(response.data);
        } catch (error) {
            console.log("Error fetching salons:", error);
        }
    };
    const fetchSalonsFavorites = async () => {
        try {
        const response = await getSalons();
        const salons = response.data;
        const favorites = salons.filter(salon => salon.is_favorite);
        setSalonsList(favorites);

            setSalonsList(favorites);
        } catch (error) {
            console.log("Error fetching salons:", error);
        }
    };

    const handleAllClick = (activeText) => {
        if (activeText == "All") {
            setActiveLink('All');
            fetchSalons();
        } else {
            setActiveLink('Favorites');
            fetchSalonsFavorites();
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <HeaderClient userName={userName} hasNotification={true} />
            <View style={[styles.searchContainer, isFocused && styles.focusedContainer]}>
                <TouchableOpacity
                    onPress={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <Animatable.View
                        animation={isFocused ? 'rotate' : null}
                        duration={1000}
                        iterationCount={1}
                    >
                        <SearchIcon width={24} height={24} fill="#fff" />
                    </Animatable.View>
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar o salão"
                    placeholderTextColor="#888"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>

            <View style={styles.containerTitle} >
                <Text style={styles.title} >Salões</Text>
            </View>
            <View style={styles.listings}>
                <TouchableOpacity onPress={() => handleAllClick('All')} style={activeLink === 'All' ? styles.activeLink : styles.link}>
                    <Text style={styles.linkText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAllClick('Favorites')} style={activeLink === 'Favorites' ? styles.activeLink : styles.link}>
                    <Text style={styles.linkText}>Favorites</Text>
                </TouchableOpacity>
            </View>
            {activeLink === 'All' && <SalonsComponent salonsList={salonsList} />}
            {activeLink === 'Favorites' && <SalonsFavoritesComponent salonsList={salonsList} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#2D343C",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    searchContainer: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 30,
        borderWidth: 1,
        borderColor: "#2D343C",
    },
    focusedContainer: {
        borderColor: "#FFF",
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        paddingHorizontal: 10,
    },
    containerTitle: {

    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
    },
    listings: {
        flexDirection: "row",
    },
    link: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    linkText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    activeLink: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 15,
    },

});

export default HomeClient;
