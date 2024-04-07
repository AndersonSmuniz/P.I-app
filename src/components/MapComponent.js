import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mapa do Salão</Text>
            {/* Aqui você pode adicionar a integração com o mapa, como usando uma biblioteca como react-native-maps */}
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

export default MapComponent;
