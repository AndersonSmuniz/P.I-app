import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { getBarbersService } from '../routes/routes'; // Importe a função que busca os colaboradores

const BarbersComponent = ({ id_salon }) => {
    const [barbers, setBarbers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar os colaboradores
    const loadBarbers = async () => {
        try {
            const response = await getBarbersService(id_salon);
            setBarbers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar colaboradores:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBarbers();
    }, [id_salon]);

    const renderItem = ({ item }) => (
        <View style={styles.barberContainer}>
            <Image source={{ uri: item.photo }} style={styles.barberPhoto} />
            <Text style={styles.barberName}>{item.full_name}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#fff" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={barbers}
                renderItem={renderItem}
                keyExtractor={(item) => item.auth.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D343C',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    barberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#394049',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    barberPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    barberName: {
        color: '#fff',
        fontSize: 18,
    },
});

export default BarbersComponent;
