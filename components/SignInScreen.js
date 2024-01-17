// SignInScreen.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignInScreen = () => {
  // Logique de connexion ici

  return (
    <View>
      <Text>Se connecter</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Mot de passe" secureTextEntry={true} />
      <Button title="Se connecter" onPress={() => {/* Logique de connexion */}} />
    </View>
  );
};

export default SignInScreen;
