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
  	/* 
  		TODO: add a list of special diets with info about what nutrients they might need to focus on
  		e.g. vegetarian, vegan, ovo lacto, gluten free, paleo 
  	*/
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    	<Text>You pick a nutrient to focus on. I`ll suggest an ingredient!</Text>
    	<Button
          onPress={() => navigate('Nutrient')}
          title="Got it!"
        />
    </View>;
  }
}

export default HomeScreen;