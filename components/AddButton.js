import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    marginBottom: 100,
    backgroundColor: '#4B4B4B', // Color de fondo (gris oscuro)
    borderRadius: 30, // Hace que el botón sea circular
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddButton;