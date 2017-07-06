import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

class HomeScreen extends React.Component {
  render() {
  	const { navigate } = this.props.navigation;
  	
    return <View style={styles.container}>
    	<Text style={styles.description}>
        You pick a nutrient to focus on, I will suggest an ingredient!
      </Text>
    	<TouchableOpacity onPress={() => navigate('Nutrient')}>
        <Text style={styles.button}>Got it!</Text>
      </TouchableOpacity>
    </View>;
  }
}

HomeScreen.propTypes = {
  navigation: React.PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  description: {
    fontFamily: theme.fontFamily.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    overflow: 'hidden',
    color: theme.color.light,
    fontSize: 20,
    fontFamily: theme.fontFamily.primary,
  }
});


export default HomeScreen;