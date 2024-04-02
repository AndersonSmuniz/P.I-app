import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Bell from "../assets/Bell.svg";
import BellNotify from "../assets/Bell-notif.svg";

const HeaderClient = ({ userName, hasNotification }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Bem Vindo</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.iconContainer}>
                {hasNotification ?
                    <BellNotify style={styles.icon} /> :
                    <Bell style={styles.icon} />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 5,
    },
    userName: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "300",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10, // espaçamento entre ícones
    },
});

export default HeaderClient;
