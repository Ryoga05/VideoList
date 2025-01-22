import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import placeholderImage from '../assets/placeholder.jpg';

const Video = ({ image, title, description, onPress }) => {
  return (    
  <View>
    <View style={styles.container}>
        <Image
        style={styles.image}
        source={image ? { uri: image } : placeholderImage} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.videoTitle}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
          <Icon name="arrow-forward-ios" size={36} color="white" />
        </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B4B4B',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 20,
    marginBottom: 30,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#999', // Fondo para la imagen (placeholder)
    marginLeft: 20,
    marginRight: 20,
  },
  instagram: {
    width: 80,
    height: 60,
    borderRadius: 10,
  },
  textContainer: {
    marginRight: 40,
    flex: 1, // Asegura que el contenedor tome espacio disponible
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    flexShrink: 1, // Permite que se reduzca el tamaño del texto
    flexWrap: 'wrap', // Asegura que el texto se ajuste en varias líneas
  },
  text: {
    color: 'white'
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});

export default Video;
