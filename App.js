import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './components/WelcomScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { Header } from './components/Header';
//Profil Page

import { globalStyles } from './Style/globalFont';


const Stack = createStackNavigator();


export default function App() {

  return (
    
    <NavigationContainer >
     
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen  name="Profile" component={ProfileScreen}   /> 
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
         
      </Stack.Navigator>
      <Header />
     
    </NavigationContainer>
    
  );

 
}