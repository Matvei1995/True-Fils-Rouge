import "../node_modules/@openfonts/rowdies_all"
import React ,{Component}from 'react';
import { StyleSheet,Image, View, Text, Button, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";

// const TextWithRowdiesFont = ({ text }) => {
//   return (
//     <Text
//       style={{
//         fontFamily: "rowdies",
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#000000",
//       }}>
//       {text}
//     </Text>
//   );
// };
const PlaceholderLogo = require("../assets/logo.png");
class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>  
        <Image source={PlaceholderLogo} style={styles.image}
        /></View>
        
        <StatusBar style="auto" />
        <Text style={styles.card1Tittle}>
      Bienvenue sur Trocante</Text>
      <Text style={styles.text1}>L’appli Qui va changer ta manière de troquer 
        Ecolo et gratuite.</Text>
      
      <Pressable style={styles.buttonPush }
        title="Se connecter"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Pressable style={styles.buttonPush }
        title="S'inscrire"
        onPress={() => navigation.navigate('SignUp')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0AE88",
    alignItems: "center",
    justifyContent: "center",
    gap:"10%",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image:{
    width:"100px",
    height:"100%",
    borderRadius:"30%"
  },
  card1Tittle:{
    //borderBlockColor:"#D9D9D9",
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#D9D9D9",
    padding:"5%",
    width:"50%",
    borderRadius:"20px",
    fontSize: 16,
    fontFamily: "rowdies",
    fontWeight: "bold",
    color: "#FFFFFF",

  },
  text: {
    fontSize: 16,
    fontFamily: "rowdies",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  text1:{
    borderRadius:"15px",
    paddingTop:"30%",
    fontSize: 14,
    fontFamily:"rowdies",
    backgroundColor:"#6E745C",
    width:"300px",
    fontWeight:"light",
    color:"#FFFFFF"
  },
  buttonPush:{
    backgroundColor:"#D9D9D9",
    //gap:"10%",
    color:"black",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 92,
    borderRadius: 10,
    
    
  },

});

export default WelcomeScreen;
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



