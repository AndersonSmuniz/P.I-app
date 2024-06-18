import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackButton from "../../components/BackButton";
import { getBookings } from "../../routes/routes";
import moment from "moment";
import "moment/locale/pt-br";  // Importa o locale do moment para PT-BR

const Appointments = () => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  // Função para carregar os agendamentos
  const loadBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Função para formatar a data e o horário
  const formatDateTime = (dateTime) => {
    return {
      date: moment(dateTime).format("DD/MM/YYYY"),
      time: moment(dateTime).format("HH:mm")
    };
  };

  // Função para lidar com o clique em um cartão de agendamento
  const handleBookingPress = (booking) => {
    navigation.navigate("BookingDetails", { booking });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Meus Agendamentos</Text>
      </View>

      {/* Lista de agendamentos */}
      <View style={styles.bookingList}>
        {bookings.map((booking, index) => {
          const { date, time } = formatDateTime(booking.start_booking);
          const isUpcoming = booking.status === 1;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.bookingCard, !isUpcoming && styles.bookingCardCompleted]}
              onPress={() => handleBookingPress(booking)}
            >
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingText}>Salão: {booking.salon.name}</Text>
                <Text style={styles.bookingText}>Data: {date}</Text>
                <Text style={styles.bookingText}>Horário: {time}</Text>
              </View>
              {booking.salon.photo && (
                <Image
                  source={{ uri: booking.salon.photo }}
                  style={styles.salonPhoto}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D343C",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#fff",
    flex: 1,
  },
  bookingList: {
    marginTop: 10,
  },
  bookingCard: {
    backgroundColor: "#394049",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  bookingCardCompleted: {
    backgroundColor: "#2D343C",
    opacity: 0.6,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  salonPhoto: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginLeft: 10,
  },
});

export default Appointments;
