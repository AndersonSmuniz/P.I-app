import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProfile } from '../../routes/routes';
import Back from "../../assets/back.svg";


const Profile = () => {
    const [name, setName] = useState('');
    const [photo, setphoto] = useState('');
    const [dob, setDob] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setphoto(profileData.photo);
                setName(profileData.full_name);
                setDob(new Date(profileData.birth_date));
                setEmail(profileData.email);
                setPhone(profileData.phone);
                setCpf(profileData.cpf);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar o perfil.');
            }
        };

        fetchProfile();
    }, []);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(currentDate);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Back width="35" height="35" fill="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Suas informações</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={photo ? { uri: photo } : { uri: "https://th.bing.com/th/id/OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa?rs=1&pid=ImgDetMain" }}
                    style={styles.profileImage}
                />
                    <TouchableOpacity style={styles.editImageButton}>
                        <Text style={styles.editImageText}>✎</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor="#ccc"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                    <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor="#ccc"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    placeholderTextColor="#ccc"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numbers-and-punctuation"
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D343C',
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#FEC200',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editImageText: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        color: '#000',
    },
    dateInput: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        justifyContent: 'center',
    },
    dateText: {
        color: '#000',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#FEC200',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Profile;
