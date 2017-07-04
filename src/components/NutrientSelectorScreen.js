import React from 'react';
import { Button, FlatList, View, Text } from 'react-native';

import filter from 'lodash/filter'
import nutrients from 'ChowRoulette/src/assets/json/nutrients.js'

class NutrientSelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Pick a Nutrient',
  };
  render() {
  	const { navigate } = this.props.navigation;
    const menuItems = filter(nutrients, { visible: true })

    return <View style={{ flex: 1 }}>
      <View>
        <Text>Select a nutrient blah blah blah</Text>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.usdaId}
        renderItem={({item}) => <Button
          onPress={() => navigate('Ingredient', { nutrientId: item.usdaId, nutrientName: item.name })}
          title={item.name}
        />}
      />
    </View>
  }
}

export default NutrientSelectorScreen;