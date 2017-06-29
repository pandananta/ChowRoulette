import React from 'react';

import {
  AppRegistry,
  Image,
  Button,
  Text,
  View,
} from 'react-native';

import CONFIG from '../../config'

class IngredientScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: null,
    	imageUri: undefined,
    	imageHeight: undefined,
    	imageWidth: undefined,
    };
  }

  static navigationOptions = {
    title: 'Ingredient Screen',
  };

  fetchNewIngredient = () => {
  	this.setState({ loading: true })
  	const veggies = ['broccoli', 'peas and carrots', 'carrot', 'lima bean', 'potato', 'edamame', 'soybeans', 'Cowpeas (blackeyes)', 'Garlic', 'Asparagus', 'spinach', 'bamboo shoots']
  	const queryString = veggies[(Math.random() * veggies.length ) << 0]
  	return fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${queryString}&count=1`, {
		  method: 'POST',
		  headers: {
		  	'Accept': 'application/json',
		    'Ocp-Apim-Subscription-Key': CONFIG.BING_API_KEY,
		  },
		}).then((response) => {
			return response.json();
		}).then((responseData)=> {
    	const _responseData = responseData.value[0]
    	this.setState({
    		buttonTitle: queryString,
    		imageUri: _responseData.thumbnailUrl,
    		imageWidth: _responseData.thumbnail.width,
    		imageHeight: _responseData.thumbnail.height,
    		loading: false,
    	})
    }).catch((err) => {
		    console.error('Encountered error making request:', err);
		});
  }

  renderLoadingScreen = () => {
  	return <Image source={require('ChowRoulette/src/assets/loading.gif')} />
  }

  render() {
  	const { buttonTitle, imageUri, imageWidth, imageHeight, loading } = this.state
    return loading ? this.renderLoadingScreen() :
    	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	    	<View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center' }}>
	    		{imageUri && <Image source={{uri: imageUri }} style={{width: imageWidth, height: imageHeight}} />}
	    		<Text>{buttonTitle}</Text>
	    	</View>
	    	<View style={{ flex: 0.1 }}>
	    		<Button onPress={this.fetchNewIngredient} title='Keep Going' />
	    	</View>
	    </View>;
  }
}

export default IngredientScreen;