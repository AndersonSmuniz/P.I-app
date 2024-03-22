import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AvatarPicker = ({ onCancel }) => {
  // Função para lidar com o cancelamento da seleção do avatar
  const handleCancel = () => {
    onCancel();
  };

  return (
    <View style={styles.container}>
      {/* Botão para cancelar a seleção */}
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {/* Lógica para selecionar uma foto para o avatar */}
      {/* Aqui você pode implementar a lógica para selecionar uma foto e atualizar o avatar */}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  cancelButton: {
    backgroundColor: '#FEC200',
    paddingVertical: 10
  }
})