import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderClient from "../../components/HeaderClient";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

import SearchIcon from "../../assets/search.svg";
import Location from "../../assets/location.svg"

const HomeClient = () => {
    const navigation = useNavigation()
    const [isFocused, setIsFocused] = useState(false);
    const [activeLink, setActiveLink] = useState('All');

    return (
        <SafeAreaView style={styles.screen}>
            <HeaderClient userName="Anderson Muniz" hasNotification={true} />
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
                    placeholder="Pesquisar por nome do salão"
                    placeholderTextColor="#888"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}

                />
            </View>

            <View style={styles.containerTitle} >
                <Text style={styles.title} >Salões</Text>
            </View>
            <View style={styles.listings}>
                <TouchableOpacity onPress={() => setActiveLink('All')} style={activeLink === 'All' ? styles.activeLink : styles.link}>
                    <Text style={styles.linkText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveLink('Favorites')} style={activeLink === 'Favorites' ? styles.activeLink : styles.link}>
                    <Text style={styles.linkText}>Favorites</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("Salon")}>
                    <Image source={{ uri: "https://th.bing.com/th/id/OIP.esfcXL7-1BLqq3a1fDyh1AHaE8?rs=1&pid=ImgDetMain" }} style={styles.image} />
                    <View>
                        <Text style={styles.textCard} >Nome do Salao</Text>
                        <View style={styles.line} >
                            <Location width="24" height="24" />
                            <Text style={styles.adreess}>Rua x</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </ScrollView>
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
    //CARD
    card: {
        flexDirection: "row",
        marginVertical: 10,
        width: "auto",
        height: 100,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius: 30,
        alignContent: 'center',
        alignItems: "center"
    },
    image: {
        margin: 10,
        alignSelf: 'flex-start',
        alignItems: "center",
        alignContent: "center",
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    textCard: {
        padding: 10,
        alignContent: "center",
        color: "#fff",
        fontSize: 16,
    },
    line:{
        flexDirection:'row',
        gap: 5,
        marginLeft: 10,
    },
    adreess:{
        color:"#6B7078",
        fontSize:16,
    }
});

export default HomeClient;
