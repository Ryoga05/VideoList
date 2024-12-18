import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import placeholderImage from '../assets/placeholder.jpg';
import { LinearGradient } from 'expo-linear-gradient';

const Video = ({ image, type, onPress }) => {
  return (    
  <View>
    {type === 'YouTube' ? (
      // Contenido para "YouTube"
      <View style={styles.containerYoutube}>
        <Image
        style={styles.image}
        source={image ? { uri: image } : placeholderImage} 
      />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Title</Text>
          <Text style={styles.text}>Description</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
          <Icon name="play-arrow" size={36} color="white" />
        </TouchableOpacity>
      </View>
    ) : type === 'Instagram' ? (
      // Contenido para "Instagram"
      <LinearGradient
        colors={['#5B51D8', '#C13584', '#FD1D1D', '#F77737', '#FFDC80']} // Colores del gradiente
        start={{ x: 0, y: 0 }}  // Empieza en la parte izquierda
        end={{ x: 1, y: 0 }}    // Termina en la parte derecha
        style={styles.gradientBorder}
      >
        <View style={styles.containerInstagram}>
          <TouchableOpacity style={styles.instagram}>
            <FontAwesome name="instagram" size={64} color="white" />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Title</Text>
            <Text style={styles.text}>Description</Text>
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Icon name="play-arrow" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    ) : (
      // Contenido predeterminado en caso de que el type no sea ni "YouTube" ni "Instagram"
      <Text style={styles.text}>No content available</Text>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  containerYoutube: {
    flex: 1,
    backgroundColor: '#4B4B4B',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 30,
  },
  containerInstagram: {
    flex: 1,
    backgroundColor: '#4B4B4B', // Fondo del contenedor interno
    borderRadius: 17, // Un radio menor que el borde exterior
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 30,
    width: '100%',
    height: '100%',
  },
  gradientBorder: {
    padding: 2, // Espacio para el borde exterior del gradiente
    borderRadius: 20, // Bordes redondeados
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
    marginRight: 80,
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
