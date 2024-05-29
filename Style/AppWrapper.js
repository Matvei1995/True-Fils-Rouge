// AppWrapper.js
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import App from '../App'; // Votre composant App principal

 function AppWrapper() {
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
    return null; // Ou un composant de chargement
  }

  return <App />;
};

export default AppWrapper;
