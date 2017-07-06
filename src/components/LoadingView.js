import React from 'react';

import { ActivityIndicator, View } from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

class LoadingView extends React.Component {

  render() {
    return <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator color={theme.color.primary} />
    </View>
  }
}

export default LoadingView;