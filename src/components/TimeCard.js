import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TimeCard = ({ time, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={[styles.timeCard, selected && styles.selectedTimeCard]}
      onPress={onPress}
    >
      <Text style={styles.timeText}>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    borderWidth: 0.4,
    borderColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#343840",
  },
  selectedTimeCard: {
    backgroundColor: "#FEC200",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default TimeCard;
