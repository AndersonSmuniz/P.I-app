import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { getSalonServices } from '../routes/routes';

import Close from "../assets/close.svg"

const ServiceComponent = ({ id_category, title_category }) => {
    const navigation = useNavigation();

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getSalonServices(id_category);
                setServices(response.data);
            } catch (error) {
                console.log("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleServicePress = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    const handleScheduleService = (selectedService) => {
        console.log(selectedService);
        navigation.navigate("Booking", { selectedService: selectedService });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title_category}</Text>
            {services.map((service, index) => (
                <TouchableOpacity key={index} style={styles.serviceContainer} onPress={() => handleServicePress(service)}>
                    <View style={styles.serviceInfo}>
                        <Image source={{ uri: service.image }} style={styles.image} />
                        <View style={styles.serviceDetails}>
                            <Text style={styles.serviceName}>{service.title}</Text>
                            <Text numberOfLines={2} style={styles.serviceDescription}>{service.description}</Text>
                            <Text style={styles.servicePrice}>{service.price} R$</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <Modal
                visible={selectedService !== null}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <View>
                                <Close width="35" height="35" />
                            </View>
                        </TouchableOpacity>
                        <ScrollView>
                            <View style={styles.serviceInfo}>
                                <Image source={{ uri: selectedService?.image }} style={styles.imageSelected} />
                                <Text style={styles.modalTitle}>{selectedService?.title}</Text>
                            </View>
                            <Text style={styles.modalDescription}>{selectedService?.description}</Text>
                            <Text style={styles.modalPrice}>{selectedService?.price} R$</Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.scheduleButton} onPress={() => handleScheduleService(selectedService)}>
                            <Text style={styles.scheduleButtonText}>Agendar serviço</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    image: {
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    imageSelected: {
        borderRadius: 20,
        width: 120,
        height: 120,
    },
    serviceDetails: {
        marginHorizontal: 10,
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    serviceDescription: {
        fontSize: 14,
        marginTop: 5,
        color: "#D7D1D1",
    },
    servicePrice: {
        marginTop: 5,
        fontSize: 14,
        color: "#FEC000",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#343840",
        width: "100%",
        height: "45%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        color: "#D7D1D1",
        marginVertical: 10,
    },
    modalPrice: {
        fontSize: 16,
        color: "#FEC000",
        marginBottom: 10,
    },
    closeButton: {
        justifyContent: "flex-end",
        alignItems:"flex-end"
    },
    closeButtonText: {
        fontSize: 20,
        color: "#fff",
    },
    scheduleButton: {
        backgroundColor: "#FEC000",
        padding: 10,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
    },
    scheduleButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#343840",
    },
});

export default ServiceComponent;
