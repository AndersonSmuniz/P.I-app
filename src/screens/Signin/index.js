import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, LogoContainer, InputContainer, Button, ButtonText } from "../../assets/styles/styles.js";
import DiskBarber from "../../assets/logo/DiskBarber.svg";
import { login_client } from "../../routes/routes.js"
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    // Função pra o login
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
                navigation.reset({
                    routes:[{name:"MainTabClient"}]
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
                    onChangeText={setUsername}
                />

                {/* Rótulo e campo de senha */}
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholderTextColor="#000"
                    style={[styles.input, styles.lastInput]}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Link para redefinir senha */}
                <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                {/* Botão para entrar */}
                <Button style={styles.loginButton} onPress={handleLogin}>
                    <ButtonText>Entrar</ButtonText>
                </Button>

                {/* Link para tela de cadastro */}
                <TouchableOpacity onPress={() => navigation.reset({ routes: [{ name: 'ChooseRole' }] })}>
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
        marginBottom: 10
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
    }
});

export default LoginScreen;
