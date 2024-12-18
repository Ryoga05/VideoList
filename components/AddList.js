import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

const AddList = ({ visible, onClose, onAddList }) => {
  const [name, setName] = useState(''); // Estado para la URL

  const handleAddList = () => {
    if (name.trim()) {
      onAddList(name); // Devuelve la URL al componente padre
      setName(''); // Limpia el input
      onClose(); // Cierra el popup
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.popup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Introduce el nombre de la lista..."
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleAddList}>
                            <Text style={styles.buttonText}>Añadir lista</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#4B4B4B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#3A3A3A',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddList;
