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
    return <View>
    	<Text>Home Screen</Text>
    	<Button
          onPress={() => navigate('Ingredient')}
          title="Got it!"
        />
    </View>;
  }
}

export default HomeScreen;