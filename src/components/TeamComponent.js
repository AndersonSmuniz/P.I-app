import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BarbersComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lista de Cabeleireiros do Salão</Text>
            {/* Adicione aqui a lista de cabeleireiros */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
});

export default BarbersComponent;
