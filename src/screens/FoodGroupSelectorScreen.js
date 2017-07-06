import React from 'react';
import FoodGroupSelector from 'ChowRoulette/src/components/FoodGroupSelector'

class FoodGroupSelectorScreen extends React.Component {
  render() {
    const { nutrientId, nutrientName } = this.props.navigation.state.params
    const { navigate } = this.props.navigation
    const props = { navigate, nutrientId, nutrientName }

    return <FoodGroupSelector {...props} />
  }
}

export default FoodGroupSelectorScreen;