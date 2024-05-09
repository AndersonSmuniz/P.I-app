import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ServiceCard = ({ selectedService }) => {
  return (
    <View style={styles.selectedServicesContainer}>
      <Text style={styles.subtitle}>Agendar</Text>
      {[selectedService].map((service, index) => (
        <View key={index} style={styles.serviceItem}>
          <Text style={styles.serviceName}>{service.title}</Text>
          <Text style={styles.servicePrice}>R${service.price}</Text>
        </View>
      ))}
      <Text style={styles.totalPrice}>Total: R$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedServicesContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#343840",
    borderRadius: 10,
    padding: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  serviceName: {
    color: "#fff",
  },
  servicePrice: {
    color: "#fff",
  },
  totalPrice: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
});

export default ServiceCard;
