import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../Style/globalFont';
import { Ionicons } from '@expo/vector-icons';
import { EditProfilePicture } from './EditProfilePicture';
import { ArticlePreview } from './ArticlePreview'; // Assurez-vous d'avoir ce composant
import { PastTrades } from './PastTrades';    // Assurez-vous d'avoir ce composant

export function ProfileScreen({ route, navigation }) {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Ajoutez un état pour les erreurs

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);

      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          // Rediriger vers la connexion si aucun token n'est trouvé
          navigation.navigate('SignInScreen');
          return;
        }

        const profileResponse = await axios.get('http://localhost:5001/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const articlesResponse = await axios.get(`http://localhost:5001/api/articles/user/${profileResponse.data._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tradesResponse = await axios.get(`http://localhost:5001/api/trades/user/${profileResponse.data._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(profileResponse.data);
        setArticles(articlesResponse.data);
        setTrades(tradesResponse.data);

      } catch (err) {
        console.error('Erreur lors de la récupération des données :', err.response?.data || err.message);
        setError('Une erreur est survenue lors du chargement de votre profil.'); // Message d'erreur générique
        // Optionnel: vous pouvez rediriger vers la page de connexion en cas d'erreur d'authentification
        if(err.response?.status===401) navigation.navigate('SignInScreen');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []); 

  const handleEditProfile = () => {
    setIsEditing(true);
    navigation.navigate('EditProfile', { profile });
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Suppression du profil',
      'Êtes-vous sûr de vouloir supprimer votre profil ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete('http://localhost:5001/api/users/profile', {
                headers: { Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}` },
              });
              navigation.navigate('SignInScreen');
            } catch (error) {
              console.error('Erreur lors de la suppression du profil :', error);
              Alert.alert('Erreur', "La suppression du profile a échoué");
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('SignInScreen');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Gestion des erreurs (afficher un message d'erreur à l'utilisateur)
    }
  };


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>; // Afficher l'erreur
  }


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mon Profil</Text>
        <View style={styles.icons}>
          {!isEditing && ( 
            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleDeleteProfile}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Informations du profil */}
        {profile && (
          <View style={styles.profileInfo}>
            {profile.profileImage ? ( 
              <Image source={{ uri: profile.profileImage }} style={styles.profilePic} />
            ) : (
              <Image source={require('./assets/profile-pic.jpg')} style={styles.profilePic} />
            )} 
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.city}>{profile.city}</Text>
              <Text style={styles.email}>{profile.email}</Text>
            </View>
          </View>
        )}
         

        {/* Articles */}
        {articles.length > 0 ? (
          <View style={styles.articlesGrid}>
            {articles.map((article, index) => (
              <ArticlePreview key={index} article={article} />
            ))}
          </View>
        ) : (
          <Text>Aucun article disponible</Text>
        )}

        {/* Trocs passés */}
        {trades.length > 0 ? (
          <View>
            <Text>Trocs passés:</Text>
            {trades.map((trade, index) => (
              <View key={index}>
                {/* <Text>{trade.details}</Text> */}
              </View>
            ))}
          </View>
        ) : (
          <Text>Aucun troc passé disponible</Text>
        )}
      </ScrollView>

      {/* Barre de navigation inférieure */}
      <View style={styles.bottomNavBar}>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Welcome')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="red" /> {/* Icône de déconnexion */}
        </Pressable>
      </View>
    </View>
  );
};
