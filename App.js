import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import IngredientScreen from './src/components/IngredientScreen';


const ChowRoulette = StackNavigator({
  Home: { screen: HomeScreen },
  Ingredient: { screen: IngredientScreen },
});

AppRegistry.registerComponent('ChowRoulette', () => ChowRoulette);