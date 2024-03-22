import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook useNavigation
import DiskBarber from "../../assets/logo/DiskBarber.svg";

export default function App() {
    const navigation = useNavigation(); // Instancia a navegação

    return (
        <View style={styles.container}>
            <>
                <DiskBarber style={styles.logo} width="100%" height={160} />
            </>
            {/* Botão para Usuário */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signup_client")}>
                <Text style={styles.buttonText}>Usuário</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            {/* Botão para Profissional */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Signup_profi")}>
                <Text style={styles.buttonText}>Profissional</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D343C',
        alignItems: 'center',
    },
    logo: {
        marginVertical: "15%"
    },
    button: {
        width: '80%',
        padding: 15,
    },
    buttonText: {
        color: '#FFD700',
        fontSize: 30,
        fontWeight: '300',
        textAlign: 'center',
    },
    separator: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: '80%',
        marginVertical: 15,
    },
});
