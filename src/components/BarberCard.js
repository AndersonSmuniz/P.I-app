import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const BarberCard = ({ item, selectedBarber, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.barberCard,
        selectedBarber === item && styles.selectedBarberCard,
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.barberName}>{item.full_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  barberCard: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  selectedBarberCard: {
    borderBottomWidth:1,
    borderColor: "#fff",
  },
  barberName: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default BarberCard;
