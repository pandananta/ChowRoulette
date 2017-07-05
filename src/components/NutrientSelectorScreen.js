import React from 'react';
import { Button, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

import filter from 'lodash/filter'
import nutrients from 'ChowRoulette/src/assets/json/nutrients.js'

class NutrientSelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Pick a Nutrient',
  };
  render() {
  	const { navigate } = this.props.navigation;
    const menuItems = filter(nutrients, { visible: true })

    return <View style={{ flex: 1, paddingTop: 10 }}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.usdaId}
        renderItem={({item}) => <TouchableOpacity
          onPress={() => navigate('Ingredient', { nutrientId: item.usdaId, nutrientName: item.name })}>
          <Text style={styles.button}>{item.name}</Text>
        </TouchableOpacity>}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 6,
    color: theme.color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.primary,
  },
});


export default NutrientSelectorScreen;