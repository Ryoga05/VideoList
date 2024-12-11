import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import placeholderImage from '../assets/placeholder.jpg';

const Video = ({ image, type, onPress }) => {
  return (    
  <View style={styles.container}>
    {type === 'YouTube' ? (
      // Contenido para "YouTube"
      <>
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
      </>
    ) : type === 'Instagram' ? (
      // Contenido para "Instagram"
      <>
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
      </>
    ) : (
      // Contenido predeterminado en caso de que el type no sea ni "YouTube" ni "Instagram"
      <Text style={styles.text}>No content available</Text>
    )}
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
