import React from 'react';

import {
  AppRegistry,
  Button,
  Text,
  View,
} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
  	const { navigate } = this.props.navigation;
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    	<Text>You pick a nutrient to focus on. I`ll suggest an ingredient!</Text>
    	<Button
          onPress={() => navigate('Ingredient')}
          title="Got it!"
        />
    </View>;
  }
}

export default HomeScreen;