import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute, StackActions  } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';
import BackButton from "../../components/BackButton";
import { cancelBooking } from "../../routes/routes";

const BookingDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params;

  // Função para formatar a data e o horário
  const formatDateTime = (dateTime) => {
    return {
      date: moment(dateTime).format('DD/MM/YYYY'),
      time: moment(dateTime).format('HH:mm')
    };
  };

  const { date, time } = formatDateTime(booking.start_booking);

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(booking.id);
      Alert.alert('Sucesso', 'Agendamento cancelado com sucesso.');
      navigation.dispatch(StackActions.replace('MainTabClient'));
    } catch (error) {
      console.error('Erro ao cancelar o agendamento:', error);
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Detalhes do Agendamento</Text>
      </View>
      
      <View style={styles.bookingDetails}>
        {booking.salon.photo && (
          <Image
            source={{ uri: booking.salon.photo }}
            style={styles.salonPhoto}
          />
        )}
        <Text style={styles.bookingText}>Salão: {booking.salon.name}</Text>
        <Text style={styles.bookingText}>Barbeiro: {booking.collaborator.name}</Text>
        <Text style={styles.bookingText}>Serviços: {booking.services.map(service => service.title).join(', ')}</Text>
        <Text style={styles.bookingText}>Data: {date}</Text>
        <Text style={styles.bookingText}>Horário: {time}</Text>
        <Text style={styles.bookingText}>Duração: {booking.time_required} minutos</Text>
        <Text style={styles.bookingText}>Total: R$ {booking.total_amount}</Text>
      </View>

      {booking.status === 1 && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
          <Text style={styles.cancelButtonText}>Cancelar Agendamento</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D343C',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',
    flex: 1,
  },
  bookingDetails: {
    backgroundColor: '#394049',
    padding: 20,
    borderRadius: 8,
  },
  bookingText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  salonPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#FEC200',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingDetails;
