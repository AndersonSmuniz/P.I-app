import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { getSalonServices } from '../routes/routes';

const ServiceComponent = ({id_salon}) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getSalonServices(id_salon);
                setServices('sdadsadas',response.data); 
            } catch (error) {
                console.log("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços {id_salon}</Text>
            {services.map((service, index) => (
                <View key={index} style={styles.serviceContainer}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>Preço: {service.price}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    serviceContainer: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    servicePrice: {
        fontSize: 14,
        color: "#fff",
    },
});

export default ServiceComponent;
