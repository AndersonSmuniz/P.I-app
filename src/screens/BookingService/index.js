import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDays, format } from 'date-fns';
import DateCard from "../../components/DateCards";

import Back from "../../assets/back.svg";
import { getBarbersService, getScheduleBarber } from "../../routes/routes";


const BookingService = () => {
  const route = useRoute();
  const selectedService = route.params.selectedService;
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigation = useNavigation();


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
  }, []);

  // Função para selecionar o barbeiro
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
  };

  // Função para selecionar a data
  const handleDateSelection = async (date) => {
    const [day, month, year] = date.split('/');
    const isoDate = `${year}-${month}-${day}`;

    setSelectedDate(date);
    try {
      const services = [selectedService]
      const serviceIds = services.map(service => service.id).join(',');
      const response = await getScheduleBarber(selectedBarber.auth, isoDate, serviceIds);
      setAvailableSlots(response.data.horarios_livres);
    } catch (error) {
      console.log("Error fetching barber schedule:", error);
    }
  };

  const renderBarberCards = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={barbers}
        keyExtractor={(item, index) => index.toString()} // Usar o índice como chave única
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.barberCard,
              selectedBarber === item && styles.selectedBarberCard,
            ]}
            onPress={() => handleBarberSelection(item)}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.barberName}>{item.full_name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

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
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Back width="35" height="35" fill="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Escolha o barbeiro</Text>

      {/* Lista de barbeiros disponíveis */}

      <View style={styles.barberList}>
        {/* Renderização dos cards dos barbeiros */}
        {renderBarberCards()}
      </View>

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
    </ScrollView>
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
  scroll: {
    height: 5
  },
  barberList: {
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 0.4,
    borderColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default BookingService;
