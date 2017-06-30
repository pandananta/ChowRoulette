import React from 'react';
import {
  AppRegistry,
  Button,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import filter from 'lodash/filter'
import nutrients from 'ChowRoulette/src/assets/json/nutrients.js'

class NutrientSelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Pick a Nutrient',
  };
  render() {
  	const { navigate } = this.props.navigation;
    const menuItems = filter(nutrients, { visible: true })

    return  <FlatList
      data={menuItems}
      keyExtractor={(item) => item.usdaId}
      renderItem={({item}) => <Button
        onPress={() => navigate('Ingredient', {id: item.usdaId, name: item.name})}
        title={item.name}
      />}
    />;
  }
}

export default NutrientSelectorScreen;