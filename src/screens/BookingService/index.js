import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getBarbersService, getScheduleBarber } from "../../routes/routes";
import BackButton from "../../components/BackButton";
import BarberCard from "../../components/BarberCard";
import TimeCard from "../../components/TimeCard";
import ServiceCard from "../../components/ServiceCard";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { UserContext } from "../../contexts/Usercontext";

LocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
};

LocaleConfig.defaultLocale = 'pt-BR';

const BookingService = () => {
  const route = useRoute();
  const { state: { listServices, currentSalon }, dispatch } = useContext(UserContext);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigation = useNavigation();
  console.log(currentSalon)
  // Configurações do calendário
  const calendarTheme = {
    calendarBackground: '#2D343C',
    textSectionTitleColor: '#fff',
    selectedDayBackgroundColor: '#E5734F',
    selectedDayTextColor: '#fff',
    todayTextColor: '#E5734F',
    dayTextColor: '#fff',
    textDisabledColor: '#666',
    arrowColor: '#fff',
    monthTextColor: '#fff',
    indicatorColor: '#fff',
  };

  // Função para buscar os barbeiros que oferecem o serviço selecionado
  const fetchBarbers = async () => {
    try {
      const response = await getBarbersService(currentSalon.id);
      console.log("barbeiros", listServices, response.data);
      setBarbers(response.data);
    } catch (error) {
      console.log("Error fetching barbers:", error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  // Função para lidar com a seleção de uma data no calendário
  const handleDayPress = async (day) => {
    const today = new Date();
    const selected = new Date(day.dateString);
    const previousDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    if (selected > previousDay) {
      setSelectedDate(day.dateString);
      try {
        const serviceIds = listServices.map(service => service.id);
        const response = await getScheduleBarber(selectedBarber.auth, day.dateString, serviceIds);
        setAvailableSlots(response.data.horarios_livres);
      } catch (error) {
        console.log("Error fetching barber schedule:", error);
      }
    }
  };

  // Função para selecionar o barbeiro
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
  };

  // Função para selecionar o horário
  const handleTimeSelection = (time) => {
    // Implemente conforme necessário
  };

  // Função para confirmar o agendamento
  const confirmBooking = () => {
    // Implemente a lógica para confirmar o agendamento aqui
  };
  const handleAddService = () => {
    navigation.navigate("Cart")
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Reserva</Text>
      </View>

      {/* Botão para adicionar outro serviço */}
      <View style={styles.moreService}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>+ Adicionar Serviços</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de barbeiros disponíveis */}
      <View style={styles.barberList}>
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id}
            item={barber}
            selectedBarber={selectedBarber}
            onPress={() => handleBarberSelection(barber)}
          />
        ))}
      </View>
      <View style={styles.line} />

      {/* Calendário */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDate ? { [selectedDate]: { selected: true, disableTouchEvent: true } } : {}}
        theme={calendarTheme}
      />

      {/* Cards dos horários disponíveis */}
      <View style={styles.line} />
      <View style={styles.timeContainer}>
        {availableSlots.map((time, index) => (
          <TimeCard key={index} time={time} onPress={() => handleTimeSelection(time)} />
        ))}
      </View>

      {/* Card dos serviços selecionados */}
      <ServiceCard selectedServices={listServices} />

      {/* Botão para confirmar o agendamento */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
        <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#2D343C",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
  },
  barberList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },

  confirmButton: {
    backgroundColor: "#E5734F",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40
  },
  confirmButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16,
  },
  moreService:{
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  }
});

export default BookingService;
