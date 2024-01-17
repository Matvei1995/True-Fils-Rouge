import "../node_modules/@openfonts/rowdies_all"
import React ,{Component}from 'react';
import { StyleSheet,Image, View, Text, Button } from 'react-native';

const TextWithRowdiesFont = ({ text }) => {
  return (
    <Text
      style={{
        fontFamily: "Rowdies",
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
      }}>
      {text}
    </Text>
  );
};
class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0AE88",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#000000",
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



