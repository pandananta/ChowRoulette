import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

import filter from 'lodash/filter'
import nutrients from 'ChowRoulette/src/assets/json/nutrients.js'

class NutrientSelector extends React.Component {
  render() {
  	const { navigate } = this.props
    const menuItems = filter(nutrients, { visible: true })

    return <View style={{ flex: 1, paddingTop: 10 }}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.usdaId}
        renderItem={({item}) => <TouchableOpacity
          onPress={() => navigate('Ingredient', { nutrientId: item.usdaId, nutrientName: item.name })}>
          <Text style={styles.listItem}>{item.name}</Text>
        </TouchableOpacity>}
      />
    </View>
  }
}

NutrientSelector.propTypes = {
  navigate: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  listItem: {
    textAlign: 'center',
    padding: 6,
    color: theme.color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.primary,
  },
})


export default NutrientSelector