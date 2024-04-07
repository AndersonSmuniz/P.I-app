import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native'; // Importe o hook useRoute

const BookingService = () => {
  const route = useRoute(); // Use o hook useRoute para acessar os parâmetros da rota
  const selectedService = route.params.selectedService; // Acesse os parâmetros da rota

  const [selectedBarber, setSelectedBarber] = useState(null);

  // Função para selecionar o barbeiro
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
    // Implemente aqui a lógica para buscar os horários disponíveis do barbeiro selecionado
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
        {selectedService.barbers.map((barber, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.barberItem,
              selectedBarber === barber && styles.selectedBarberItem,
            ]}
            onPress={() => handleBarberSelection(barber)}
          >
            <Text style={styles.barberName}>{barber.name}</Text>
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
    backgroundColor: "#fff",
    padding: 20,
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
