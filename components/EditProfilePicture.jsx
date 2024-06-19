import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export const EditProfilePicture = ({ profileImage, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onImageChange(result.assets[0].uri); // Appeler la fonction pour mettre à jour l'image du profil
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={selectedImage ? { uri: selectedImage } : profileImage}
          style={styles.profilePic}
        />
        <Text style={styles.editLabel}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 
});
