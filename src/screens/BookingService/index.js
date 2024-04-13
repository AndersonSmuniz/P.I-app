import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';

import { getBarbersService } from "../../routes/routes";

const BookingService = () => {
  const route = useRoute();
  const selectedService = route.params.selectedService;
  const [barbers, setBarbers] = useState([]);

  // Função para buscar os barbeiros que oferecem o serviço selecionado
  const fetchBarbers = async () => {
    try {
      const response = await getBarbersService(selectedService.id);

      setBarbers(response.data);
    } catch (error) {
      console.log("Error fetching barbers:", error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []); // Executa apenas uma vez quando o componente é montado

  const [selectedBarber, setSelectedBarber] = useState(null);

  // Função para selecionar o barbeiro
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
  };

  // Função para ir para a tela de seleção de mais serviços
  const handleMoreServicesSelection = () => {
    // Implemente aqui a navegação para a tela de seleção de mais serviços
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o barbeiro</Text>

      {/* Lista de barbeiros disponíveis */}
      <View style={styles.barberList}>
        {/* Mapeamento dos barbeiros disponíveis */}
        {barbers.map((barber, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.barberItem,
              selectedBarber === barber && styles.selectedBarberItem,
            ]}
            onPress={() => handleBarberSelection(barber)}
          >
            <Text style={styles.barberName}>{barber.collaborator_details.full_name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão para selecionar mais serviços */}
      <TouchableOpacity
        style={styles.moreServicesButton}
        onPress={handleMoreServicesSelection}
      >
        <Text style={styles.moreServicesButtonText}>Escolher mais serviços</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D343C",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  barberList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  barberItem: {
    backgroundColor: "#FEC000",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedBarberItem: {
    backgroundColor: "#343840",
  },
  barberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343840",
  },
  moreServicesButton: {
    backgroundColor: "#343840",
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  moreServicesButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default BookingService;
