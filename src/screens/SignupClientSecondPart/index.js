import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, InputContainer, Button, ButtonText } from "../../assets/styles/styles.js";

const SignupClientSecondPartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { fullName, phoneNumber, birthdate } = route.params;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [formProgress, setFormProgress] = useState(50);

    const handleConfirm = () => {
        navigation.navigate('SignupFinishedScreen');
    };

    const updateFormProgress = () => {
        const totalFields = 3; 
        const filledFields = [email, password, confirmPassword].filter(field => field.trim() !== '').length; 
        const progress = 50 + (filledFields / totalFields) * 50; 
        setFormProgress(progress);
    };

    useEffect(() => {
        updateFormProgress();
    }, [email, password, confirmPassword]);

    return (
        <Container>
            <Text style={styles.title}>Cadastro</Text>

            {/* Barra indicadora de progresso */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${formProgress}%` }]} />
            </View>

            {/* Campos de entrada para o cadastro */}
            <InputContainer>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Botão para confirmar parte 2 */}
                <Button style={styles.button} onPress={handleConfirm}>
                    <ButtonText>Finalizar Cadastro</ButtonText>
                </Button>
            </InputContainer>
        </Container>
    );
}

// Estilos
const styles = StyleSheet.create({
    progressContainer: {
        width: '80%',
        height: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    progressBar: {
        height: 8,
        backgroundColor: '#FEC200',
        borderRadius: 10,
    },

    title: {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        color: "#fff",
        marginBottom: 5,
        fontWeight: "300"
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        padding: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#FEC200",
        marginTop: 20,
    },
});

export default SignupClientSecondPartScreen;
