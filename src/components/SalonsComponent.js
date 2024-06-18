import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image } from "react-native";

import Location from "../assets/location.svg"
import { useNavigation } from "@react-navigation/native";

const SalonsComponent = ({ salonsList }) => {
    const navigation = useNavigation();
    console.log(salonsList)
   
    return (
        <ScrollView >
            {salonsList.map((salon, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("Salon", { salonId: salon.id })}>
                    <Image source={{ uri: salon.photo }} style={styles.image} />
                    <View>
                        <Text style={styles.textCard}>{salon.name_salon}</Text>
                        <View style={styles.line} >
                            <Location width="24" height="24" />
                            <Text style={styles.address}>{salon.address}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        marginVertical: 10,
        width: "auto",
        height: 100,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius: 30,
        alignContent: 'center',
        alignItems: "center"
    },
    image: {
        margin: 10,
        alignSelf: 'flex-start',
        alignItems: "center",
        alignContent: "center",
        borderRadius: 40,
        height: 80,
        width: 80,
    },
    textCard: {
        padding: 10,
        alignContent: "center",
        color: "#fff",
        fontSize: 16,
    },
    line: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 10,
    },
    address: {
        color: "#6B7078",
        fontSize: 16,
    },
});
export default SalonsComponent;