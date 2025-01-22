import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddImage from './AddImage';

const AddList = ({ visible, onClose, onAddList }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleAddList = () => {

    if (!name.trim() || !description.trim()) {
      alert('Por favor llena todos los campos.');
      return;
    }
  
    if (!image) {
      alert('Por favor selecciona una imagen.');
      return;
    }
    if (name.trim() && description.trim()) {
      onAddList(name, description, image); // Devuelve los datos como parámetros separados
      resetFields(); // Reinicia los campos
      onClose(); // Cierra el modal
    }
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setImage(null);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.popup}>
              <AddImage placeholder={require('../assets/placeholder.jpg')} onImageSelected={setImage}/>

              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity style={styles.button} onPress={handleAddList}>
                <Text style={styles.buttonText}>Crear lista nueva</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: '#4B4B4B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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
