import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Next from "../assets/nav_next.svg";
import { getSalonCategory } from '../routes/routes';

const CategoryComponent = ({ id_salon }) => {
    const navigation = useNavigation();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getSalonCategory(id_salon);
                setCategory(response.data);
            } catch (error) {
                console.log("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, []);

    const navigateToServices = (categoryId, categoryTitle) => {
        navigation.navigate("Services", { id_category: categoryId, title_category: categoryTitle });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços</Text>
            {category.map((categoryItem, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.serviceContainer}
                    onPress={() => navigateToServices(categoryItem.id, categoryItem.title)}
                >
                    <View style={styles.serviceInfo}>
                        <View style={styles.serviceDetails}>
                            <Text style={styles.serviceName}>{categoryItem.title}</Text>
                            <Next width="30" height="30" fill="#fff" />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    serviceContainer: {
        backgroundColor: "#343840",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    serviceInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    serviceDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CategoryComponent;
