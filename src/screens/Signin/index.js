import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, LogoContainer, InputContainer, Button, ButtonText } from "../../assets/styles/styles.js";
import DiskBarber from "../../assets/logo/DiskBarber.svg";
import { clientInfo, login_client } from "../../routes/routes.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

    // Função para alternar visibilidade da senha
    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    // Função para login
    const handleLogin = async () => {
        if (username !== "" && password !== "") {
            const data = {
                'username': username,
                'password': password
            }
            console.log(data);
            try {
                const response = await login_client(data);
                console.log(response);

                const tokenString = JSON.stringify(response.data);
                await AsyncStorage.setItem('token', tokenString);
                // Obter informações 
                const userResponse = await clientInfo();
                const userName = userResponse.user.username;
                await AsyncStorage.setItem('Username', userName);
                navigation.reset({
                    routes: [{ name: "MainTabClient" }]
                });

            } catch (error) {
                console.error("Erro durante login: ", error);
                alert("Ocorreu um erro no login.");
            }
        } else {
            alert("Preencha todos os campos.")
        };
    };

    return (
        <Container>
            <DiskBarber width="100%" height={160} />
            {/* Seção do logo e nome do aplicativo */}
            <LogoContainer>
                <Text style={styles.appName}>AgendaBarbeiro</Text>
            </LogoContainer>

            {/* Formulário de login */}
            <InputContainer>
                {/* Rótulo e campo de username */}
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholderTextColor="#000"
                    style={styles.input}
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                />

                {/* Rótulo e campo de senha */}
                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholderTextColor="#000"
                        style={[styles.input_password, styles.lastInput, { flex: 1 }]}
                        secureTextEntry={secureTextEntry}
                        value={password}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.eye} onPress={toggleSecureTextEntry}>
                        <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Link para redefinir senha */}
                <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                {/* Botão para entrar */}
                <Button style={styles.loginButton} onPress={handleLogin}>
                    <ButtonText>Entrar</ButtonText>
                </Button>

                {/* Link para tela de cadastro */}
                <TouchableOpacity onPress={() => navigation.navigate('Signup_client')}>
                    <Text style={styles.signupLink}>É novo por aqui? Se cadastre!</Text>
                </TouchableOpacity>
            </InputContainer>
        </Container>
    );
}

const styles = StyleSheet.create({
    appName: {
        color: "#FEC200",
        fontSize: 24,
        marginTop: 20
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
        paddingBottom:20,
        marginBottom: 10
    },
    input_password: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        marginBottom: 10,
        paddingTop:10,
        paddingStart:10,
    },
    eye:{
        marginRight:10
    },
    lastInput: {
        marginBottom: 20
    },
    forgotPassword: {
        color: "#fff",
        marginBottom: 10
    },
    loginButton: {
        backgroundColor: "#FEC200",
        marginTop: 20,
    },
    signupLink: {
        color: "#fff",
        textAlign: "right",
        marginTop: 20
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 0,
        marginBottom: 20
    }
});

export default LoginScreen;
