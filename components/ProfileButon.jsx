// ProfileButton.js

import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function ProfileButton (){
  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
  };

  return (
    <View>
      <Button title="Profil" onPress={handleProfileNavigation} />
    </View>
  );
};


