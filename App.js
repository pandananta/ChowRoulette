import { AppRegistry } from 'react-native';

import { StackNavigator } from 'react-navigation';
import FoodGroupSelectorScreen from './src/screens/FoodGroupSelectorScreen';
import HomeScreen from './src/screens/HomeScreen';
import IngredientScreen from './src/screens/IngredientScreen';
import NutrientSelectorScreen from './src/screens/NutrientSelectorScreen';

const defaultNavOptions = {
  headerBackTitle: null,
  headerTintColor: 'black',
};

const ChowRoulette = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({ ...defaultNavOptions, title: 'Chow Roulette' }),
  },
  FoodGroup: {
    screen: FoodGroupSelectorScreen,
    navigationOptions: () => ({ ...defaultNavOptions, title: 'Pick a Food Group' }),
  },
  Nutrient: {
    screen: NutrientSelectorScreen,
    navigationOptions: () => ({ ...defaultNavOptions, title: 'Pick a Nutrient' }),
  },
  Ingredient: {
    screen: IngredientScreen,
    navigationOptions: ({ navigation }) => ({ ...defaultNavOptions, title: `Veggies with ${navigation.state.params.nutrientName}` }),
  },
}, {
  headerMode: 'screen',
});

AppRegistry.registerComponent('ChowRoulette', () => ChowRoulette);
