import React from 'react';
import { Button, FlatList } from 'react-native';

import filter from 'lodash/filter'
import foodGroups from 'ChowRoulette/src/assets/json/foodGroups.js'

class FoodGroupSelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Pick a Food Group',
  };
  render() {
  	const { navigate, state } = this.props.navigation;
    const { nutrientId, nutrientName } = state.params
    const relevantFoodGroups = filter(foodGroups, { visible: true })

    return  <FlatList
      data={relevantFoodGroups}
      keyExtractor={(item) => item.usdaId}
      renderItem={({item}) => <Button
        onPress={() => navigate('Ingredient', { foodGroupId: item.usdaId, foodGroupName: item.name, nutrientName, nutrientId })}
        title={item.name}
      />}
    />;
  }
}

export default FoodGroupSelectorScreen;