import React, { useState } from 'react';
import { View, TextInput, Pressable, Image, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../Style/globalFont';

export function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
      const user = response.data.user;
      await AsyncStorage.setItem('userToken', user.token); // Stockez le token
      navigation.navigate('ProfileScreen', { user });
    } catch (error) {
      console.error(error);
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={[styles.container, globalStyles.text]}>
      <Text style={styles.title}>Connexion</Text>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>MOT DE PASSE</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Connexion</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0AE88',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Rowdies',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Assurez-vous d'utiliser la bonne couleur de texte
    marginBottom: 30,
  },
  logo: {
    width:150,
    height:100,
    borderRadius:50
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: 'Rowdies',
  },
  button: {
    backgroundColor: '#6E745C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Rowdies',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red', 
    marginBottom: 15,
  },
});
