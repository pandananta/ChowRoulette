import React from 'react';
import NutrientSelector from 'ChowRoulette/src/components/NutrientSelector'

class NutrientSelectorScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    const props = { navigate }

    return <NutrientSelector {...props} />
  }
}

NutrientSelectorScreen.propTypes = {
  navigation: React.PropTypes.object.isRequired,
}

export default NutrientSelectorScreen;