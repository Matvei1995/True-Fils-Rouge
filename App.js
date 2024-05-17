import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './components/WelcomScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import * as useFonts from 'expo-font';
const Stack = createStackNavigator();
// const fonts = {
//   rowdies: require("../node_modules/@openfonts/rowdies_all/rowdies-all-700.woff2"),
// };
// const [fontsLoaded, error] = useFonts(fonts);


export default function App() {
  // if (!fontsLoaded) {
  //   return <App/>;
  // }
  
  // if (error) {
  //   console.error(error);
  //   return null;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}