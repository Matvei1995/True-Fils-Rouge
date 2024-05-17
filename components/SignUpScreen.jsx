// src/components/SignUpScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Pressable } from 'react-native';
import axios from '../axiosConfig';

export function  SignUpScreen ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    axios.post('/register', {
      name,
      email,
      password,
    })
    .then(response => {
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('LoginScreen'); // Naviguer vers l'écran de connexion après l'inscription
    })
    .catch(error => {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data);
      } else {
        Alert.alert('Error', 'An error occurred');
      }});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


