import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';  // Importa useNavigation

const Menu = ({ active }) => {
  const navigation = useNavigation();  // Obtén la función de navegación

  // Función de manejo de clic en el icono de favoritos
  const handleFavoritosPress = () => {
    if (active !== 'favoritos') {
      navigation.navigate('Favoritos');  // Navega a la pantalla de 'Favoritos'
    }
  };

  const handleListasPress = () => {
    if (active !== 'listas') {
      navigation.navigate('Listas');  // Navega a la pantalla de 'Favoritos'
    }
  };

  const handleUsuarioPress = () => {
    if (active !== 'usuario') {
      navigation.navigate('Usuario');  // Navega a la pantalla de 'Favoritos'
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFavoritosPress}>
        <Icon name="favorite" size={36} color={active === 'favoritos' ? 'black' : 'white'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleListasPress}>
        <Icon name="menu" size={36} color={active === 'listas' ? 'black' : 'white'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUsuarioPress}>
        <Icon name="person-outline" size={36} color={active === 'usuario' ? 'black' : 'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4B4B4B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Menu;
