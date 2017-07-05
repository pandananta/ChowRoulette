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

const defaultNavOptions = {
  headerBackTitle: null,
  headerTintColor: 'black',
}

const ChowRoulette = StackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({ ...defaultNavOptions }),
  },
  FoodGroup: { 
    screen: FoodGroupSelectorScreen,
    navigationOptions: ({navigation}) => ({ ...defaultNavOptions }),
  },
  Nutrient: { 
    screen: NutrientSelectorScreen,
    navigationOptions: ({navigation}) => ({ ...defaultNavOptions }),
  },
  Ingredient: { 
    screen: IngredientScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      title: `Veggies with ${navigation.state.params.nutrientName}`,
    }),
  },
}, {
  headerMode: 'screen',
});

AppRegistry.registerComponent('ChowRoulette', () => ChowRoulette);