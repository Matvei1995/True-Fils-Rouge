import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

import { Ionicons } from '@expo/vector-icons';
import { EditProfilePicture } from './EditProfilePicture';
import { ArticlePreview } from './ArticlePreview';
import { PastTrades } from './PastTrades';

export function ProfileScreen({navigation }) {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);

      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          navigation.navigate('SignInScreen');
          return;
        }

        const decodedToken = jwtDecode(token,process.env); 
        const userId = decodedToken.id;
        console.log(userId);

        const profileResponse = await axios.get(`http://localhost:5001/api/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const articlesResponse = await axios.get(`http://localhost:5001/api/articles/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tradesResponse = await axios.get(`http://localhost:5001/api/trades/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        setProfile(profileResponse.data);
        setArticles(articlesResponse.data);
        setTrades(tradesResponse.data);

      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error.response?.data || error.message);
        if (error.response && error.response.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
          setTimeout(() => navigation.navigate('SignInScreen'), 1500);
        } else if (error.response && error.response.status === 404) {
          setError('Profil non trouvé.');
        } else {
          setError('Une erreur est survenue lors du chargement de votre profil.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAddArticle = () => {
    navigation.navigate('CreateArticle');
  };

  const handleEditProfile = () => {
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
              await axios.delete('http://localhost:5001/api/users', {
                headers: { Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}` },
              });
              navigation.navigate('SignInScreen');
            } catch (error) {
              console.error('Erreur lors de la suppression du profil :', error);
              Alert.alert('Erreur', "La suppression du profil a échoué");
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
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {profile && (
          <View style={styles.profileInfo}>
            <Image source={{ uri: `http://localhost:5001/${profile.profileImage}` }} style={styles.profilePic} />
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.city}>{profile.city}</Text>
              <Text style={styles.email}>{profile.email}</Text>
            </View>
          </View>
        )}

        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>Mes Articles</Text>
          {articles.length > 0 ? (
            <View style={styles.articlesGrid}>
              {articles.map((article, index) => (
                <ArticlePreview key={index} article={article} />
              ))}
            </View>
          ) : (
            <>
              <Text style={styles.noArticlesText}>Vous n'avez pas encore ajouté d'articles.</Text>
              <TouchableOpacity style={styles.addArticleButton} onPress={handleAddArticle}>
                <Text style={styles.addArticleButtonText}>Ajouter un article</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>Trocs passés</Text>
        {trades.length > 0 ? (
          <View>
            {trades.map((trade, index) => (
              <PastTrades key={index} trade={trade} />
            ))}
          </View>
        ) : (
          <Text style={styles.noTradesText}>Pas de troc en cours</Text>
        )}
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Welcome')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0AE88',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontFamily: 'Rowdies',
    fontSize: 18,
    fontWeight: 'bold',
  },
  city: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: '#6E745C',
  },
  email: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: '#6E745C',
  },
  articlesSection: {
    width: '90%',
  },
  sectionTitle: {
    fontFamily: 'Rowdies',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noArticlesText: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  addArticleButton: {
    backgroundColor: '#6E745C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addArticleButtonText: {
    color: 'white',
    fontFamily: 'Rowdies',
    fontWeight: 'bold',
  },
  noTradesText: {
    fontFamily: 'Rowdies',
    fontSize: 16,
    color: '#6E745C',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '100%',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  iconButton: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Rowdies',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
