import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons/MaterialIcons';

const Menu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={36} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="menu" size={36} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person-outline" size={36} color="white" />
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
