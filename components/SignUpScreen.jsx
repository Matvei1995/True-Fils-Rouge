import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

export const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setEmailError('Format email invalide');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Mot de passe incorrect: minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: 'image/jpeg',
        name: 'profile.jpg'
      });
    }

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigation.navigate('Confirmation', {
        name,
        city,
        email,
      });
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo} 
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NOM</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>VILLE</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]} 
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(validateEmail(text) ? '' : 'Format email invalide');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>MOT DE PASSE</Text>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]} 
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(validatePassword(text) ? '' : 'Mot de passe incorrect: minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
          }}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <Pressable style={styles.photoButton} onPress={handleChoosePhoto}>
        <Text style={styles.photoButtonText}>PHOTO DE PROFIL</Text>
      </Pressable>
      {profileImage && (
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
      )}
      <Pressable style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>S'enregistrer</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0AE88',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Rowdies',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  photoButton: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  photoButtonText: {
    fontFamily: 'Rowdies',
    color: '#6E745C',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signupButtonText: {
    fontFamily: 'Rowdies',
    color: '#6E745C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
