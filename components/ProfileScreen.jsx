import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export function ProfileScreen(){
  return (
    <View style={styles.container}>
      <Image source={require('./assets/profile-pic.jpg')} style={styles.profilePic} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
      <Button title="Modifier le profil" onPress={() => {/* Fonction pour modifier le profil */}} />
      <Button title="Déconnexion" onPress={() => {/* Fonction pour se déconnecter */}} />
      <Button title="Supprimer mon profil" onPress={() => {/* Fonction pour supprimer mon profil */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});


