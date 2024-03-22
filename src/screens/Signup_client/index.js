import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, LogoContainer, InputContainer, Button, ButtonText } from "../../assets/styles/styles.js";
import IconAvatar from "../../assets/userphoto.svg";

const SignupClientScreen = () => {
  const navigation = useNavigation();

  const [showAvatarPicker, setShowAvatarPicker] = useState(false); // Estado para controlar a exibição do AvatarPicker

  // Estados para os campos do formulário
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // Estado para acompanhar o progresso do preenchimento do formulário
  const [formProgress, setFormProgress] = useState(0);

  // Função para mostrar o AvatarPicker quando o usuário clica no avatar
  const handleAvatarPress = () => {
    setShowAvatarPicker(true);
  };

  // Função para confirmar e avançar para a próxima tela
  const handleConfirm = () => {
    // Aqui você pode armazenar os dados e passar para a próxima tela
    navigation.navigate('SignupClientSecondPart', { fullName, phoneNumber, birthdate });
  };

  // Função para atualizar o progresso do formulário
  const updateFormProgress = () => {
    const totalFields = 3;
    const filledFields = [fullName, phoneNumber, birthdate].filter(field => field.trim() !== '').length;
    const progress = (filledFields / totalFields) * 50; 
    setFormProgress(progress);
  };

  // Chamar a função de atualização do progresso sempre que um campo for alterado
  useEffect(() => {
    updateFormProgress();
  }, [fullName, phoneNumber, birthdate]);

  return (
    <Container>
      <Text style={styles.title}>Cadastro</Text>

      {/* Avatar (imagem do usuário) */}
      <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
        <IconAvatar style={styles.avatarText} width='80%' height={160} />
      </TouchableOpacity>

      {/* Componente AvatarPicker */}
      {showAvatarPicker && <AvatarPicker onCancel={() => setShowAvatarPicker(false)} />}

      {/* Barra indicadora de progresso */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${formProgress}%` }]} />
      </View>

      {/* Campos de entrada para o cadastro */}
      <InputContainer>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.label}>Número de Telefone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
        />

        {/* Botão para confirmar parte 1 */}
        <Button style={styles.button} onPress={handleConfirm}>
          <ButtonText>Proximo</ButtonText>
        </Button>

        {/* Link para redirecionar cadastro de profissional */}
        <TouchableOpacity onPress={() => navigation.navigate('SignupProfessionalScreen')}>
          <Text style={styles.signupLink}>É barbeiro? Clique aqui.</Text>
        </TouchableOpacity>
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
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
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
  signupLink: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20
  },
});

export default SignupClientScreen;
