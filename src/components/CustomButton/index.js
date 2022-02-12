import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { WARNA_UTAMA } from '../../utils/constant';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
      ]}>
      <Text 
        style={[
          styles.text, 
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
        ]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container:{
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5
  },
  container_PRIMARY: {
    backgroundColor: WARNA_UTAMA,
  },
  container_SECONDARY: {
    borderColor: WARNA_UTAMA,
    borderWidth: 2
  },
  container_TERTIARY: {

  },
  text: {
    fontFamily: 'TitilliumWeb-Bold',
    color: 'white'
  },
  text_SECONDARY: {
    color: WARNA_UTAMA
  },
  text_TERTIARY: {
    color: 'gray',
    fontFamily: 'TitilliumWeb-Regular',
  },
});
