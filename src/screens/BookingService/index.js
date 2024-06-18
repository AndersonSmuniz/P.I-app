import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import { createBooking, getBarbersService, getScheduleBarber } from "../../routes/routes";
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
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const calendarTheme = {
    calendarBackground: '#2D343C',
    textSectionTitleColor: '#fff',
    selectedDayBackgroundColor: '#FEC200',
    selectedDayTextColor: '#fff',
    todayTextColor: '#FEC200',
    dayTextColor: '#fff',
    textDisabledColor: '#666',
    arrowColor: '#fff',
    monthTextColor: '#fff',
    indicatorColor: '#fff',
  };

  const fetchBarbersAndSetInitialValues = async () => {
    try {
      const response = await getBarbersService(currentSalon.id);
      const barbersList = response.data;
      setBarbers(barbersList);

      if (barbersList.length > 0) {
        const firstBarber = barbersList[0];
        const today = new Date().toISOString().split('T')[0];
        setSelectedBarber(firstBarber);
        setSelectedDate(today);

        const serviceIds = listServices.map(service => service.id);
        const scheduleResponse = await getScheduleBarber(firstBarber.auth, today, serviceIds);
        setAvailableSlots(scheduleResponse.data.horarios_livres);
      }
    } catch (error) {
      console.log("Error fetching barbers and setting initial values:", error);
    }
  };

  useEffect(() => {
    fetchBarbersAndSetInitialValues();
  }, []);

  const handleDayPress = async (day) => {
    const today = new Date();
    const selected = new Date(day.dateString);
    const previousDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    if (selected > previousDay) {
      setSelectedDate(day.dateString);
      setLoading(true);
      try {
        const serviceIds = listServices.map(service => service.id);
        console.log(serviceIds);
        const response = await getScheduleBarber(selectedBarber.auth, day.dateString, serviceIds);
        setAvailableSlots(response.data.horarios_livres);
      } catch (error) {
        console.log("Error fetching barber schedule:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
    if (selectedDate) {
      handleDayPress({ dateString: selectedDate });
    }
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const confirmBooking = async () => {
    const datetime = `${selectedDate}T${selectedTime}:00`;
    const data = {
      salon: currentSalon.id,
      collaborator: selectedBarber.auth,
      services: listServices.map(service => service.id),
      date_shedule: selectedDate,
      start_booking: datetime,
    };
    try {
      const response = await createBooking(data);
      navigation.dispatch(StackActions.replace("Salon", {salonId: currentSalon.id}))

    } catch (error) {
      navigation.navigate("Preload");
    }
  };

  const handleAddService = () => {
    navigation.navigate("Cart");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.navigate("Salon", { salonId: currentSalon.id })} />
        <Text style={styles.title}>Reserva</Text>
      </View>

      <View style={styles.moreService}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>+ Adicionar Serviços</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.barberList}>
        {barbers.map((barber, index) => (
          <BarberCard
            key={index}
            item={barber}
            selectedBarber={selectedBarber}
            onPress={() => handleBarberSelection(barber)}
          />
        ))}
      </View>
      <View style={styles.line} />

      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDate ? { [selectedDate]: { selected: true, disableTouchEvent: true } } : {}}
        theme={calendarTheme}
      />

      <View style={styles.line} />
      {loading ? (
        <ActivityIndicator size="large" color="#FEC200" />
      ) : availableSlots.length > 0 ? (
        <View style={styles.timeContainer}>
          {availableSlots.map((time, index) => (
            <TimeCard
              key={index}
              time={time}
              onPress={() => handleTimeSelection(time)}
              selected={time === selectedTime}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noSlotsText}>Sem horário disponível</Text>
      )}

      <ServiceCard selectedServices={listServices} />

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
  noSlotsText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#FEC200",
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
  moreService: {
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  }
});

export default BookingService;
