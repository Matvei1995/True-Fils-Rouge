import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 

export function ConfirmationScreen ({ route }) { // Récupérer les paramètres de navigation
  const navigation = useNavigation();
  const { name, city, email } = route.params; // Récupérer les données passées depuis SignUpScreen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation d'inscription</Text>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Remplacez par le chemin de votre logo
          style={styles.logo}
        />
        <Text style={styles.logoText}>Trocante</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.welcomeText}>Bienvenue sur Trocante</Text>
        <Text style={styles.infoText}>
          Merci d'être bienveillant auprès des trocanteurs. Tout acte agressif est banni.
        </Text>
        
      </View>

      <View style={styles.iconsContainer}>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('CreateArticle')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('ProfileScreen', { name, city, email })}>
          <Ionicons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0AE88',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Rowdies', 
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    fontFamily: 'Rowdies', 
    fontSize: 18,
    color: 'white',
  },
  messageContainer: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Rowdies', 
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E745C',
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Rowdies', 
    fontSize: 16,
    color: '#6E745C',
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%', // Réduire la largeur pour un meilleur espacement
  },
  iconButton: {
    alignItems: 'center',
  },
});
