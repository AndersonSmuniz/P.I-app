import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';
import { addDays, format } from 'date-fns';
import DateCard from "../../components/DateCards";

import { getBarbersService, getScheduleBarber } from "../../routes/routes";

const BookingService = () => {
  const route = useRoute();
  const selectedService = route.params.selectedService;
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Função para buscar os barbeiros que oferecem o serviço selecionado
  const fetchBarbers = async () => {
    try {
      const response = await getBarbersService(selectedService.salon);
      console.log("barbeiros", selectedService, response.data);
      setBarbers(response.data);
    } catch (error) {
      console.log("Error fetching barbers:", error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []); // Executa apenas uma vez quando o componente é montado

  // Função para selecionar o barbeiro
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
  };

  // Função para selecionar a data
  const handleDateSelection = async (date) => {
    const [day, month, year] = date.split('/');
    const isoDate = `${year}-${month}-${day}`;
  
    setSelectedDate(isoDate);
    console.log(isoDate);
    try {
      const services = [selectedService]
      const serviceIds = services.map(service => service.id).join(',');
      console.log('servicos',serviceIds);
      const response = await getScheduleBarber(selectedBarber.auth, isoDate, serviceIds);
      console.log(response.data);
      setAvailableSlots(response.data.horarios_livres); // Armazena os horários disponíveis no estado
    } catch (error) {
      console.log("Error fetching barber schedule:", error);
    }
  };

  // Função para renderizar os cards dos barbeiros
  const renderBarberCards = () => {
    return barbers.map((barber, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.barberCard,
          selectedBarber === barber && styles.selectedBarberCard,
        ]}
        onPress={() => handleBarberSelection(barber)}
      >
        <Image source={{ uri: barber.photo }} style={styles.image} />
        <Text style={styles.barberName}>{barber.full_name}</Text>
      </TouchableOpacity>
    ));
  };

  // Função para renderizar os cards de datas
  const renderDateCards = () => {
    const nextDays = [];
    let currentDate = new Date();
  
    for (let i = 0; i < 7; i++) {
      const nextDate = addDays(currentDate, i);
      nextDays.push(nextDate);
    }
  
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={nextDays}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => (
          <DateCard
            date={item}
            selectedDate={selectedDate}
            handleDateSelection={handleDateSelection}
          />
        )}
      />
    );
  };

  // Função para renderizar os cards dos horários disponíveis
  const renderTimeCards = () => {
    return availableSlots.map((time, index) => (
      <TouchableOpacity
        key={index}
        style={styles.timeCard}
        onPress={() => handleTimeSelection(time)}
      >
        <Text style={styles.timeText}>{time}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o barbeiro</Text>

      {/* Lista de barbeiros disponíveis */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.barberList}>
          {/* Renderização dos cards dos barbeiros */}
          {renderBarberCards()}
        </View>
      </ScrollView>

      {/* Carrossel de datas */}
      <Text style={styles.subtitle}>Escolha a data</Text>
      {renderDateCards()}

      {/* Cards dos horários disponíveis */}
      <Text style={styles.subtitle}>Escolha o horário</Text>
      <View style={styles.timeContainer}>
        {renderTimeCards()}
      </View>

      {/* Botão para selecionar mais serviços */}
      <TouchableOpacity
        style={styles.moreServicesButton}
        onPress={''}
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  scroll:{
    height: 5
  },
  barberList: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
    marginBottom: 0,
    width: 150,
    height: 200
  },
  barberCard: {
    padding: 0,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    borderRadius: 40,
    height: 100,
    width: 80,
  },
  selectedBarberCard: {
    borderWidth: 0.4,
    borderColor: "#fff",
  },
  barberName: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  moreServicesButton: {
    backgroundColor: "#343840",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  moreServicesButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  timeCard: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default BookingService;
