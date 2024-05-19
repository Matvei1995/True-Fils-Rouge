// SignInScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
      const token = response.data.token;
      // Stocker le token et naviguer vers le profil
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.backgroundStyle}>
      <TextInput style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input,]}
      />
      <Button title="Se connecter" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle :{
    backgroundColor: "#A0AE88",
    alignItems: "center",
    justifyContent: "center",
    gap:"5%",
    width:"100%",
    height:"100%",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    height: 40,
    borderRadius:10,
    Color: 'gray',
    backgroundColor:'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});


