import React from 'react';
import Markdown from 'react-native-simple-markdown'

import {
  ActivityIndicator,
  Image,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

import CONFIG from '../../config'
import filter from 'lodash/filter'
import sample from 'lodash/sample'
import split from 'lodash/split'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'

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
  	const { foodGroupId = '1100', nutrientId } = this.props.navigation.state.params
  	const apiUrl = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${CONFIG.USDA_API_KEY}&nutrients=${nutrientId}&max=30&sort=c&fg=${foodGroupId}`
  	fetch(apiUrl).then((response) => {
			return response.json();
		}).then((responseData)=> {
			let foods = responseData.report.foods
			foods = filter(foods, (food) => parseFloat(food.nutrients[0].value))
			foods = uniqBy(foods, (food) => this.massageFoodName(food.name)) 
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
		if (!isEmpty(this.state.foods)) {

	  	this.setState({
    		currentFood: sample(this.state.foods),
    		imageUri: 'https://facebook.github.io/react/img/logo_og.png',
    		loading: false,
    	})

	  	/*
	  	
				// Leave out the bing image loading for now -- getting close to the montly query limit

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
		*/
  	} else {
  		this.setState({ loading: false })
  	}

  }

  renderLoadingScreen = () => {
  	return <View style={{ flex: 1, justifyContent: 'center' }}>
  		<ActivityIndicator color='yellowgreen' />
  	</View>
  }

  renderFoodDescription = () => {
  	const { currentFood } = this.state
  	const foodNutrients = currentFood.nutrients[0]
  	const measure =  currentFood.measure.substring(0, 3) === '1.0' ? currentFood.measure.substring(4) : currentFood.measure
  	const markdownStyles = {
			flex: 1,
			alignItems: 'center',
			fontFamily: theme.fontFamily.primary,
			textAlign: 'center',
		}

  	return <Markdown styles={markdownStyles}>
  		According to the USDA, "**{currentFood.name}**" has **{foodNutrients.value} {foodNutrients.unit}** 
  		 of {split(foodNutrients.nutrient, ',')[0]} per {measure}.
  	</Markdown>
  }

  render() {
  	const { currentFood, imageUri, imageWidth, imageHeight, loading } = this.state
    const { nutrientId, nutrientName, foodGroupName = 'Vegetable and Vegetable Products' } = this.props.navigation.state.params
  	const onPress = currentFood ? this.fetchNewIngredient : this.props.navigation.goBack.bind(this, null)
  	const buttonTitle = currentFood ? 'Try Again' : 'Go Back'

    return loading ? this.renderLoadingScreen() :
    	<View style={styles.container}>
	    	{currentFood && <View style={{ flex: 0.9, alignItems: 'center' }}>
	    		<Text style={styles.title}>
	    			{this.massageFoodName(currentFood.name)}!
	    		</Text>
	    		{imageUri && <Image source={{uri: imageUri }} style={styles.image} resizeMode='cover' />}
	    		{currentFood && this.renderFoodDescription()}
	    	</View>}
	    	{!currentFood && <View style={{ flex: 0.9, alignItems: 'center' }}>
	    		<Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
	    			Could not find any {foodGroupName} with {nutrientName} :(
	    		</Text>
	    	</View>}
	    	<View style={{ flex: 0.1 }} >
	    		<TouchableOpacity style={styles.button} onPress={onPress}>
	    			<Text style={styles.buttonText} >{buttonTitle}</Text>
	    		</TouchableOpacity>
	    	</View>
	    </View>;
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		fontFamily: theme.fontFamily.primary,
	},
	image: { 
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 20,
	},
	description: {
		flex: 1,
		alignItems: 'center',
		fontFamily: theme.fontFamily.primary,
		textAlign: 'center',
	},
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.color.primary,
    borderRadius: 8,
  },
  buttonText: {
  	color: theme.color.light,
    fontSize: 20,
    fontFamily: theme.fontFamily.primary,
  }
});

export default IngredientScreen;