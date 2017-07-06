import React from 'react';
import { Button, FlatList } from 'react-native';

import filter from 'lodash/filter'
import foodGroups from 'ChowRoulette/src/assets/json/foodGroups.js'

class FoodGroupSelectorScreen extends React.Component {
  render() {
    /* Currently skipping this screen since the data is much better for vegetables */
    const { navigate, nutrientId, nutrientName } = this.props
    const relevantFoodGroups = filter(foodGroups, { visible: true })

    return  <FlatList
      data={relevantFoodGroups}
      keyExtractor={(item) => item.usdaId}
      renderItem={({item}) => <Button
        onPress={() => navigate('Ingredient', { foodGroupId: item.usdaId, foodGroupName: item.name, nutrientName, nutrientId })}
        title={item.name}
      />}
    />
  }
}

export default FoodGroupSelectorScreen;