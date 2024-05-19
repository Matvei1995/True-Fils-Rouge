//import "../node_modules/@openfonts/rowdies_all"
import React from 'react';
import { StyleSheet,Image, View, Text, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native'; 
import { globalStyles } from '../Style/globalFont';

//Contient le logo
const PlaceholderLogo = require("../assets/logo.png");
//Contient le 1er text de bienvenue
const FirstTitleApp = " Bienvenue sur Trocante";
const HomeText2 = `L’appli Qui va changer ta manière de troquer 
Ecolo et gratuite.`;

  



export function WelcomeScreen () {
  const navigation = useNavigation(); // Accès à l'objet navigation

  const onPressConnexion = () => {
    navigation.navigate('SignInScreen');
  };

  const onPressInscription = () => {
    navigation.navigate('SignUpScreen');
    
  };


  return (
    
    <View  style={[styles.container,styles.text, globalStyles.text]}>
        <View style={styles.image}>  
        <Image source={PlaceholderLogo} style={styles.image}/>
        </View>
        
        <StatusBar style="auto" />
        <Text style={[styles.text, globalStyles.text,styles.card1Tittle]} >{FirstTitleApp}
        </Text>
       
        <View style={styles.contentText} >
          <Text style={styles.text1}>{HomeText2}</Text>
        </View>
      
      <Pressable style={styles.buttonPush}  onPress={onPressConnexion}>
      <Text>Se connecter</Text> 
      </Pressable>
      <Pressable style={styles.buttonPush } onPress={onPressInscription} >
      <Text>S'inscrire</Text> 
      </Pressable>
      </View>
  );
};



const styles = StyleSheet.create({
  container: {
   
    backgroundColor: "#A0AE88",
    alignItems: "center",
    justifyContent: "center",
    gap:"5%",
    width:"100%",
    height:"100%",
  },

  image:{
    width:100,
    height:100,
    borderRadius:30
  },
  card1Tittle:{
    borderBlockColor:"#D9D9D9",
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#D9D9D9",
    padding:"5%",
    textAlign: "center",
    width:"50%",
    borderRadius:20,
    fontSize: 16,
    
    fontWeight: "bold",
    color: "#FFFFFF",

  },

  text: {
    fontSize: 16,
    fontFamily: 'Rowdies', // For use the font Rowdies
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  contentText:{ 
    borderRadius:"15px",
    // paddingTop:"30%",
    // width:"300px",
    backgroundColor:"#6E745C",
    
  },
  text1:{
    margin: "2%",
    height: "225px",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "30%",
    fontSize: 14,
    fontFamily:"Rowdies",
    fontWeight:"Bold",
    color:"#FFFFFF"
  },
  buttonPush:{
    backgroundColor:"#D9D9D9",
    color:"white",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 92,
    borderRadius: 10,
    fontSize: 14,
    // fontFamily:"Rowdies",
    // fontWeight:"Bold",
    //color:"#FFFFFF"
  },

});


/*
const TextWithRowdiesFont = ({ text }) => {
    return (
      <Text
        style={{
          fontFamily: "Rowdies",
          fontSize: 20,
          fontWeight: "bold",
          color: "#000000",
        }}>
        {text}
      </Text>
    );
  };
const WelcomeScreen = ({ navigation }) => {
  return (
   
    <View >
        <Image 
        source={require("../images/logo.png")}
        resizeMode='contain'/>
      <TextWithRowdiesFont>
      Bienvenue sur Trocante</TextWithRowdiesFont>
      <Text>L’appli Qui va changer ta manière de troquer 
        Ecolo et gratuite.</Text>
      
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>



    )}*/
  

//export default WelcomeScreen;



