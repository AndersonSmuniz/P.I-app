import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../../contexts/Usercontext";
import CategoryComponent from '../../components/CategoryComponent';
import TeamComponent from '../../components/TeamComponent';
import MapComponent from '../../components/MapComponent';

import Location from "../../assets/location.svg";
import Back from "../../assets/back.svg";
import Team from "../../assets/team.svg";
import Scissors from "../../assets/scissors.svg";
import Map from "../../assets/map.svg";
import FavoriteFull from "../../assets/favorite_full.svg";
import Favorite from "../../assets/favorite.svg";
import { LoadingIcon } from "../Preload/styles";
import { getSalon, addToFavorites, removeFromFavorites } from "../../routes/routes";

const Salon = () => {
    const { state, dispatch } = useContext(UserContext);
    const [salonData, setSalonData] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState('services');
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const salonId = route.params.salonId;

    useEffect(() => {
        const fetchSalonData = async () => {
            try {
                const response = await getSalon(salonId);
                setSalonData(response.data);
                console.log(response.data);
                dispatch({ type: 'setCurrentSalon', payload: { salon: response.data } });
            } catch (error) {
                console.log("Error fetching salon data:", error);
            }
        };

        fetchSalonData();
    }, [salonId, dispatch]);

    useEffect(() => {
        if (salonData) {
            setIsFavorite(salonData.is_favorite);
        }
    }, [salonData]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
    };

    const handleFavoritePress = async () => {
        try {
            if (isFavorite) {
                await removeFromFavorites(salonId);
            } else {
                await addToFavorites(salonId);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.log("Error updating favorite status:", error);
        }
    };

    if (!salonData) {
        return (
            <SafeAreaView style={styles.screenLoad}>
                <LoadingIcon size="large" color={"#FEC200"} />
            </SafeAreaView>
        );
    }

    // Extraindo coordenadas do salonData
    const location = salonData.locations[0];
    const coordinates = JSON.parse(location.coordinates);
    const latitude = coordinates[0];
    const longitude = coordinates[1];

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={() => {
             if (navigation.canGoBack()) {
                navigation.goBack();
                } else {
                navigation.navigate('MainTabClient');
                }
            }}>
        
                
                <Back width="35" height="35" fill="#fff" />
            </TouchableOpacity>
            <View style={styles.infoSalon}>
                <Image source={{ uri: salonData.photo }} style={styles.image} />
                <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteIcon}>
                    {isFavorite ? (
                        <FavoriteFull width="35" height="35" fill="#FEC200" />
                    ) : (
                        <Favorite width="35" height="35" fill="#FEC200" />
                    )}
                </TouchableOpacity>
                <View style={styles.infoText}>
                    <Text style={styles.nameSalon}>{salonData.name_salon}</Text>
                    <View style={styles.line}>
                        <Location width="24" height="24" />
                        <Text style={styles.address}>{salonData.address}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => handleIconPress('services')} style={[styles.icon, selectedIcon === 'services' && styles.selectedIcon]}>
                    <Scissors width="24" height="24" />
                    <Text style={styles.iconText}>Serviços</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress('barbers')} style={[styles.icon, selectedIcon === 'barbers' && styles.selectedIcon]}>
                    <Team width="24" height="24" />
                    <Text style={styles.iconText}>Cabeleireiros</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress('map')} style={[styles.icon, selectedIcon === 'map' && [styles.selectedIcon, styles.selectedText]]}>
                    <Map width="24" height="24" />
                    <Text style={[styles.iconText, selectedIcon === 'map' && styles.selectedText]}>Mapa</Text>
                </TouchableOpacity>
            </View>
            {selectedIcon === 'services' && <CategoryComponent id_salon={salonData.id} />}
            {selectedIcon === 'barbers' && <TeamComponent id_salon={salonData.id} />}
            {selectedIcon === 'map' && <MapComponent latitude={latitude} longitude={longitude} salonName={salonData.name_salon} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenLoad: {
        flex: 1,
        backgroundColor: "#2D343C",
        alignItems: "center",
        justifyContent: "center",
    },
    screen: {
        flex: 1,
        backgroundColor: "#2D343C",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    infoSalon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 8,
        right: "28%",
    },
    infoText: {
        alignItems: "center",
        margin: 10,
        gap: 10,
    },
    nameSalon: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
    },
    address: {
        color: "#6B7078",
        fontSize: 12,
    },
    line: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        backgroundColor: "#6B7078",
        padding: 10,
        borderRadius: 20,
    },
    icon: {
        alignItems: 'center',
    },
    iconText: {
        color: '#D7D1D1',
        fontSize: 12,
        marginTop: 5,
        paddingBottom: 3,
    },
    selectedIcon: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    selectedText: {
        color: '#fff',
    }
});

export default Salon;
