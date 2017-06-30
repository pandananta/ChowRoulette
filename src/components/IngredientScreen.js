import React from 'react';

import {
  AppRegistry,
  Image,
  Button,
  Text,
  View,
} from 'react-native';

import CONFIG from '../../config'
import sample from 'lodash/sample'
import split from 'lodash/split'

class IngredientScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	imageUri: undefined,
    	imageHeight: undefined,
    	imageWidth: undefined,
    	foods: undefined,
    	foodName: undefined,
    	foodDescription: undefined,
    };
  }

  componentDidMount() {
  	const nutrientId = this.props.navigation.state.params.id
  	const apiUrl = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${CONFIG.USDA_API_KEY}&nutrients=${nutrientId}&max=25&sort=c&fg=1100`
  	fetch(apiUrl).then((response) => {
			return response.json();
		}).then((responseData)=> {
    	this.setState({ foods: responseData.report.foods })
    	this.fetchNewIngredient()
    }).catch((err) => {
		    console.error('Encountered error making request:', err);
		});
  }

  static navigationOptions = {
    title: 'Ingredient Screen',
  };

  fetchNewIngredient = () => {
  	this.setState({ loading: true })
  	const food = sample(this.state.foods)
  	const foodNutrients = food.nutrients[0]
  	const description = `${food.name} has ${foodNutrients.value} ${foodNutrients.unit} of ${foodNutrients.nutrient} per ${food.measure}`
  	const foodNameTruncated = split(food.name, ',')[0]

  	return fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${foodNameTruncated}&count=1`, {
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
    		foodName: foodNameTruncated,
    		foodDescription: description,
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
  	return <Image source={require('ChowRoulette/src/assets/images/loading.gif')} />
  }

  render() {
  	const { foodName, foodDescription, imageUri, imageWidth, imageHeight, loading } = this.state
    const { id, name } = this.props.navigation.state.params
    return loading ? this.renderLoadingScreen() :
    	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    		<View style={{ flex: 0.1 }}>
	    		<Text>Vegetable Products high in {name}</Text>
	    	</View>
	    	<View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
	    		<Text>{foodName}</Text>
	    		{imageUri && <Image source={{uri: imageUri }} style={{width: imageWidth, height: imageHeight}} />}
	    		<Text>{foodDescription}</Text>
	    	</View>
	    	<View style={{ flex: 0.1 }}>
	    		<Button onPress={this.fetchNewIngredient} title='Keep Going' />
	    	</View>
	    </View>;
  }
}

export default IngredientScreen;