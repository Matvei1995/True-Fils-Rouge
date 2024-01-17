
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignUpScreen = () => {
  // Logique d'inscription ici

  return (
    <View>
      <Text>S'inscrire</Text>
      <TextInput placeholder="Nom" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Mot de passe" secureTextEntry={true} />
      <Button title="S'inscrire" onPress={() => {/* Logique d'inscription */}} />
    </View>
  );
};

export default SignUpScreen;
