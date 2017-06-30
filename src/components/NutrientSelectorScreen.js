import React from 'react';
import filter from 'lodash/filter'

import {
  AppRegistry,
  Button,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import nutrients from 'ChowRoulette/src/assets/json/nutrients.js'

class NutrientSelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Pick a Nutrient',
  };
  render() {
    //TODO: add a json file with all the nutrients
    //turn this view into a list and pass the props to Ingredient screen
    // handle the state and loading in this view? 
  	const { navigate } = this.props.navigation;
    // const menuItems = filter(nutrients, { visible: true })

    // <FlatList
     //    data={menuItems}
     //    renderItem={({item}) => <Text>{item.name}</Text>}
     //  />

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    	<Text>YOLO</Text>
    </View>;
  }
}

export default NutrientSelectorScreen;