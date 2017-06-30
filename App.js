import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import FoodGroupSelectorScreen from './src/components/FoodGroupSelectorScreen';
import NutrientSelectorScreen from './src/components/NutrientSelectorScreen';
import IngredientScreen from './src/components/IngredientScreen';


const ChowRoulette = StackNavigator({
  Home: { screen: HomeScreen },
  FoodGroup: { screen: FoodGroupSelectorScreen },
  Nutrient: { screen: NutrientSelectorScreen },
  Ingredient: { screen: IngredientScreen },
});

AppRegistry.registerComponent('ChowRoulette', () => ChowRoulette);