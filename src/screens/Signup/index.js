import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Preload</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D343C",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});
