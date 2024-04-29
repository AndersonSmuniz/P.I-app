import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import ServiceComponent from "../../components/ServiceComponent";
import Back from "../../assets/back.svg";


const ServiceCategory = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const title_category = route.params.title_category;
    const id_category = route.params.id_category;

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Back width="35" height="35" fill="#fff" />
            </TouchableOpacity>
            <ScrollView>
                <ServiceComponent id_category={id_category} title_category={title_category} />
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
})

export default ServiceCategory;