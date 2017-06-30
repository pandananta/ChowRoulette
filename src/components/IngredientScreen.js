import React from 'react';

import {
  AppRegistry,
  Image,
  Button,
  Text,
  View,
} from 'react-native';

import CONFIG from '../../config'
import filter from 'lodash/filter'
import sample from 'lodash/sample'
import split from 'lodash/split'
import isEmpty from 'lodash/isEmpty'

class IngredientScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	imageUri: undefined,
    	imageHeight: undefined,
    	imageWidth: undefined,
    	foods: undefined,
    	currentFood: undefined,
    };
  }

  static navigationOptions = {
    title: 'Ingredient Screen',
  };

  componentDidMount() {
  	const { foodGroupId, nutrientId } = this.props.navigation.state.params
  	const apiUrl = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${CONFIG.USDA_API_KEY}&nutrients=${nutrientId}&max=30&sort=c&fg=${foodGroupId}`
  	fetch(apiUrl).then((response) => {
			return response.json();
		}).then((responseData)=> {
			let foods = responseData.report.foods
			foods = filter(foods, (food) => parseFloat(food.nutrients[0].value))
    	this.setState({ foods })
    	this.fetchNewIngredient()
    }).catch((err) => {
		    console.error('Encountered error making request:', err);
		});
  }

  massageFoodName = (foodName) => {
  	let foodNameParts = split(foodName, ',')  
  	return foodNameParts[0] === 'beans' ? `${foodNameParts[1]} ${foodNameParts[0]}` : foodNameParts[0]
  }

  fetchNewIngredient = () => {
  	this.setState({ loading: true })
  	setTimeout(() => {
  		// Add an artificial delay so it feels more thoughtful?
  		if (!isEmpty(this.state.foods)) {
		  	const food = sample(this.state.foods)
		  	const queryString = this.massageFoodName(food.name)

		  	return fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${queryString}&count=10`, {
				  method: 'POST',
				  headers: {
				  	'Accept': 'application/json',
				    'Ocp-Apim-Subscription-Key': CONFIG.BING_API_KEY,
				  },
				}).then((response) => {
					return response.json();
				}).then((responseData)=> {
		    	const _responseData = sample(responseData.value)
		    	this.setState({
		    		currentFood: food,
		    		imageUri: _responseData.thumbnailUrl,
		    		imageWidth: _responseData.thumbnail.width,
		    		imageHeight: _responseData.thumbnail.height,
		    		loading: false,
		    	})
		    }).catch((err) => {
				    console.error('Encountered error making request:', err);
				});
	  	} else {
	  		this.setState({ loading: false })
	  	}
  	}, 1000)
  }

  renderLoadingScreen = () => {
  	return <Image source={require('ChowRoulette/src/assets/images/loading.gif')} />
  }

  renderFoodDescription = () => {
  	const { currentFood } = this.state
  	const foodNutrients = currentFood.nutrients[0]

  	return <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
  		<Text style={{ fontWeight: 'bold' }}>"{currentFood.name}" </Text>
  		<Text>have </Text>
  		<Text style={{ fontWeight: 'bold' }}>{foodNutrients.value} </Text>
  		<Text style={{ fontWeight: 'bold' }}>{foodNutrients.unit} </Text>
  		<Text>of </Text>
  		<Text>{foodNutrients.nutrient} </Text>
  		<Text>per </Text>
  		<Text>{currentFood.measure}</Text>
  	</Text>
  }

  render() {
  	const { currentFood, imageUri, imageWidth, imageHeight, loading } = this.state
    const { nutrientId, nutrientName, foodGroupName } = this.props.navigation.state.params
  	const onPress = currentFood ? this.fetchNewIngredient : this.props.navigation.goBack.bind(this, null)
  	const buttonTitle = currentFood ? 'Try Again' : 'Go Back'

    return loading ? this.renderLoadingScreen() :
    	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
	    	{currentFood && <View style={{ flex: 0.9, alignItems: 'center' }}>
	    		<Text style={{ fontSize: 30, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 20 }}>
	    			{this.massageFoodName(currentFood.name)}!
	    		</Text>
	    		{imageUri && <Image source={{uri: imageUri }} style={{width: imageWidth, height: imageHeight}} />}
	    		{currentFood && this.renderFoodDescription()}
	    	</View>}
	    	{!currentFood && <View style={{ flex: 0.9, alignItems: 'center' }}>
	    		<Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
	    			Could not find any {foodGroupName} with {nutrientName} :(
	    		</Text>
	    	</View>}
	    	<View style={{ flex: 0.1 }}>
	    		<Button onPress={onPress} title={buttonTitle} />
	    		{currentFood && <Text>Tap for another {nutrientName} suggestion</Text>}
	    	</View>
	    </View>;
  }
}

export default IngredientScreen;