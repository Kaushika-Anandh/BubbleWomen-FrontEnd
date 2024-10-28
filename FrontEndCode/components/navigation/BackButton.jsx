import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); 
  };

  return (
    <TouchableOpacity style={styles.button} onPress={goBack}>
      <Image 
        source={require('@/assets/images/back.png')} 
        style={styles.icon}
        resizeMode="contain"
      /> 
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',  
    alignItems: 'center',
    justifyContent: 'flex-start', 
    backgroundColor: '#eeeeee4b',
    borderRadius: 24, 
    padding: 10,  
  },
  icon: {
    width: 13, 
    height: 14,
    marginRight: 4,  
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default BackButton;
