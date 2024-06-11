import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './components/WelcomScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { CreateArticle } from './components/CreateArticle';



const Stack = createStackNavigator();

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Rowdies',
  },
});
export default function App() {
  

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Rowdies': require('./assets/fonts/Rowdies-Regular.ttf'), // Chemin vers votre fichier de police
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

 


  return (
    
    <NavigationContainer screenOptions={{
      headerShown: false, // Masquer l'en-tête par défaut de la navigation 
      contentStyle: styles.defaultText // Appliquer le style par défaut au contenu des écrans
    }}>
     
      <Stack.Navigator style={styles.defaultText} >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen"  component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen  name="ProfileScreen" component={ProfileScreen}  /> 
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="CreateArticle" component={CreateArticle} />

         
      </Stack.Navigator>
   
     
    </NavigationContainer>
    
  );




  

 
}
