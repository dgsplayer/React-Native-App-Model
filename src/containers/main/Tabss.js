/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */ 

import React, {Component} from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import colors from "../../styles/GlobalColors"; 

import Ionicons from 'react-native-vector-icons/Ionicons';
import Promocoes from './Promocoes';
import MainScreen from './MainScreen';
import FaleConosco from './FaleConosco';
import LogoutScreen from '../auth/LogoutScreen';
import LoginScreen from '../auth/LoginScreen';
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
        tabContent
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Início') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Agenda') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
            }else if (route.name === 'Produtos') {
              iconName = focused ? 'ios-cart' : 'ios-cart';
            }else if (route.name === 'Histórico') {
              iconName = focused ? 'ios-albums' : 'ios-albums';
            }else if (route.name === 'Promoções') {
              iconName = focused ? 'ios-star' : 'ios-star';
            }else if (route.name === 'Contato') {
              iconName = focused ? 'ios-call' : 'ios-call';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.light_blue,
          inactiveTintColor: 'gray',
        }}
      >
        
          <Tab.Screen name="Início" component={MainScreen} />
          <Tab.Screen name="Produtos" component={LoginScreen} />
          <Tab.Screen name="Promoções" component={Promocoes} />
          <Tab.Screen name="Contato" component={FaleConosco} />
        </Tab.Navigator>
  );
}

export default class Tabss extends Component<Props> {

  
  render() {
     console.disableYellowBox = true;  
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator  screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="FaleConosco" component={FaleConosco} />
          <Stack.Screen name="Promocoes" component={Promocoes} />
          <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Tabss" component={Tabss} />
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
