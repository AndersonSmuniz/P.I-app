import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DateCard = ({ date, selectedDate, handleDateSelection }) => {
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });
  const dayOfMonth = format(date, 'dd', { locale: ptBR });
  const dayOfWeek = format(date, 'EEEEEE', { locale: ptBR }).toUpperCase(); 

  return (
    <TouchableOpacity
      style={[
        styles.dateCard,
        selectedDate === formattedDate && styles.selectedDateCard,
      ]}
      onPress={() => handleDateSelection(formattedDate)}
    >
      <Text style={[styles.dayOfWeek, selectedDate === formattedDate && styles.whiteText]}>
        {dayOfWeek}
      </Text>
      <Text style={styles.dateText}>{dayOfMonth}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateCard: {
    borderWidth: 1,
    borderColor: '#FEC000',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 60,
    height: 100,
  },
  selectedDateCard: {
    backgroundColor: "#FEC000",
  },
  dayOfWeek: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FEC000",
    textTransform: "uppercase",
    marginBottom: 20,
    textAlign: "center",
  },
  whiteText: {
    color: "#fff",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default DateCard;
