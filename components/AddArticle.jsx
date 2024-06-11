import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

export const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const formData = new FormData(); // Utilisez FormData pour les images
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      images.forEach((imageUri, index) => {
        formData.append('images', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      });
      // ...
    } catch (error) {
        console.error('Erreur lors de la création de l\'article :', error.response?.data || error.message);
        if (error.response && error.response.status === 400) {
          // Erreur de validation côté serveur
          setError(error.response.data.message || 'Données d\'article invalides.');
        } else if (error.response && error.response.status === 401) {
          // Erreur d'authentification
          setError('Vous devez être connecté pour ajouter un article.');
          // Rediriger vers la page de connexion après un délai (optionnel)
          setTimeout(() => navigation.navigate('SignInScreen'), 1500);
        } else {
          // Autre erreur serveur
          setError('Une erreur est survenue lors de la création de l\'article.');
        }
      }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter l'article</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0AE88',
      },
      label: {
        fontFamily: 'Rowdies',
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
      },
      Button: {
        backgroundColor: '#6E745C',
        padding: 15,
        borderRadius: 10,
        width: '80%', // Largeur du bouton
        alignItems: 'center',
      },
      ButtonText: {
        color: 'white',
        fontFamily: 'Rowdies',
        fontSize: 18,
        fontWeight: 'bold',
      },
});
