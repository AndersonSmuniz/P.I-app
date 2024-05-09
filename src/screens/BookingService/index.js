import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getBarbersService, getScheduleBarber } from "../../routes/routes";
import BackButton from "../../components/BackButton";
import BarberCard from "../../components/BarberCard";
import TimeCard from "../../components/TimeCard";
import ServiceCard from "../../components/ServiceCard";
import { Calendar, LocaleConfig } from 'react-native-calendars';

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
  const selectedService = route.params.selectedService;
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigation = useNavigation();

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

  // Função para lidar com a seleção de uma data no calendário
  const handleDayPress = async (day) => {
    const today = new Date();
    const selected = new Date(day.dateString);
    const previousDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    if (selected > previousDay) {
      setSelectedDate(day.dateString);
      try {
        const services = [selectedService]
        const serviceIds = services.map(service => service.id).join(',');
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Reseva</Text>
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
      <ServiceCard selectedService={selectedService}/>

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
    justifyContent: "center",
    marginBottom: 20,
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
  },
  confirmButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default BookingService;
