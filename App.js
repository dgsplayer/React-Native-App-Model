/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */ 

 import React, {Component} from 'react'; 
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import LoginScreen from './src/containers/auth/LoginScreen';
 import Tabss from './src/containers/main/Tabss';
 import FaleConosco from './src/containers/main/FaleConosco';
 
 
 const Stack = createStackNavigator();
  
 export default class App extends Component<Props> {
  
  

   render() {
      console.disableYellowBox = true;  
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Tabss" screenOptions={{ headerShown: false}}>
           <Stack.Screen name="LoginScreen" component={LoginScreen} />
           <Stack.Screen name="Tabss" component={Tabss} />
           <Stack.Screen name="FaleConosco" component={FaleConosco} />


           
         </Stack.Navigator>
     </NavigationContainer>
     );
   }
 }
 