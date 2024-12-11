import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Menu = ({ active }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="favorite" size={36} color={active === 'favoritos' ? 'black' : 'white'}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="menu" size={36} color={active === 'listas' ? 'black' : 'white'}/>
      </TouchableOpacity>
      <TouchableOpacity>
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
