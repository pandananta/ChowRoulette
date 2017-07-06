import React from 'react'
import IngredientDeck from 'ChowRoulette/src/components/IngredientDeck'

class IngredientScreen extends React.Component {
  render() {
    const { nutrientId, nutrientName, foodGroupName, foodGroupId } = this.props.navigation.state.params
    const { goBack } = this.props.navigation
    const props = { nutrientId, nutrientName, foodGroupName, foodGroupId, goBack }

    return <IngredientDeck { ...props } />
  }
}

IngredientScreen.propTypes = {
  navigation: React.PropTypes.object.isRequired,
}

export default IngredientScreen