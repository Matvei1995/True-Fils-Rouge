import React, { useState } from 'react';
import {  View, Text, TextInput, Pressable, StyleSheet, Image,ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import { globalStyles } from '../Style/globalFont';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 

export function CreateArticle({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]); // Un tableau pour stocker les URI des images
  
    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImages(result.assets.map(asset => asset.uri));
        }
      };

      const handleSubmit = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await axios.post('http://localhost:5001/api/articles', {
            title,
            description,
            category,
            images, // Assurez-vous que votre backend attend un tableau d'URIs d'images
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' // Important pour les images
            },
          });
    
          console.log('Article créé avec succès :', response.data);
          navigation.navigate('ProfileScreen');
        } catch (error) {
          console.error('Erreur lors de la création de l\'article :', error.response?.data || error.message);
        }
      };
  return (
    <View style={[styles.container, globalStyles.text]}> {/* Utilisation du style global */}
      <Text style={styles.title}>Créer un article</Text>

      {/* Formulaire */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Champs de saisie */}
        {[
          { label: 'TITRE', value: title, onChangeText: setTitle },
          { label: 'DESCRIPTION', value: description, onChangeText: setDescription, multiline: true },
          { label: 'CATÉGORIE', value: category, onChangeText: setCategory },
        ].map(({ label, value, onChangeText, ...rest }, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} {...rest} />
          </View>
        ))}

        {/* Bouton pour choisir des images */}
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleChoosePhoto}>
          <Ionicons name="images-outline" size={24} color="#6E745C" />
          <Text style={styles.imagePickerText}>Ajouter des photos</Text>
        </TouchableOpacity>

        {/* Affichage des images sélectionnées */}
        <View style={styles.imagesPreview}>
          {images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
          ))}
        </View>

        {/* Bouton de soumission */}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtxonText}>Créer l'article</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0AE88',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Rowdies',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#D9D9D9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: 'Rowdies',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerText: {
    fontFamily: 'Rowdies',
    marginLeft: 10,
    color: '#6E745C',
  },
  imagesPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#6E745C',
    padding: 15,
    borderRadius: 10,
    width: '80%', // Largeur du bouton
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Rowdies',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
