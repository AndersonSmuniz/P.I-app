import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Importa o locale para português do Brasil

const DateCard = ({ date, selectedDate, handleDateSelection }) => {
  const dat = format(date, 'dd/MM/yyyy', { locale: ptBR });
  const dayWeek = format(date, 'EEEE', { locale: ptBR }).toUpperCase(); // Formata o dia da semana em maiúsculas

  return (
    <TouchableOpacity
      style={[
        styles.dateCard,
        selectedDate === dat && styles.selectedDateCard,
      ]}
      onPress={() => handleDateSelection(dat)}
    >
      <Text style={styles.dayOfWeek}>{dayWeek}</Text>
      <Text style={styles.dateText}>{dat}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateCard: {
    backgroundColor: "#9A7400",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
    height: 120,
  },
  selectedDateCard: {
    backgroundColor: "#FEC000",
  },
  dayOfWeek: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
});

export default DateCard;
