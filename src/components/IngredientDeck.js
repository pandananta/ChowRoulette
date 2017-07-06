import React from 'react';

import IngredientCard from 'ChowRoulette/src/components/IngredientCard'
import LoadingView from 'ChowRoulette/src/components/LoadingView'

import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import theme from 'ChowRoulette/src/assets/styles/theme.js'

import CONFIG from '../../config'
import filter from 'lodash/filter'
import sample from 'lodash/sample'
import split from 'lodash/split'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'

class IngredientDeck extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	imageUri: undefined,
    	foods: undefined,
    	currentFood: undefined,
    };
  }

  componentDidMount() {
  	const { foodGroupId, nutrientId } = this.props
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
		    console.error('Encountered error making USDA request:', err);
		});
  }

  massageFoodName = (foodName) => {
  	let foodNameParts = split(foodName, ',')  
  	return foodNameParts[0] === 'beans' ? `${foodNameParts[1]} ${foodNameParts[0]}` : foodNameParts[0]
  }

  fetchNewIngredient = () => {
  	this.setState({ loading: true })
		if (!isEmpty(this.state.foods)) {
			const food = sample(this.state.foods)
	  	const nameMassaged = this.massageFoodName(food.name)
	  	food.nameMassaged = nameMassaged

			if (CONFIG.DISABLE_BING) {
				/* Conserve bing rate limit. Use a placeholder image  */
				this.setState({
	    		currentFood: food,
	    		imageUri: 'https://facebook.github.io/react/img/logo_og.png',
	    		loading: false,
	    	})
			} else {
		  	fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${nameMassaged}&count=10`, {
				  method: 'POST',
				  headers: {
				  	'Accept': 'application/json',
				    'Ocp-Apim-Subscription-Key': CONFIG.BING_API_KEY,
				  },
				}).then((response) => {
					return response.json();
				}).then((responseData)=> {
		    	const _responseData = sample(responseData.value)
		  		food.nameMassaged = nameMassaged
		    	this.setState({
		    		currentFood: food,
		    		imageUri: _responseData.thumbnailUrl,
		    		loading: false,
		    	})
		    }).catch((err) => {
				    console.error('Encountered error making Bing request:', err);
				})
			}
  	} else {
  		this.setState({ loading: false })
  	}

  }

  render() {
  	const { currentFood, imageUri, imageWidth, imageHeight, loading } = this.state
    const { nutrientId, nutrientName, foodGroupName, goBack } = this.props
  	const onPress = currentFood ? this.fetchNewIngredient : goBack.bind(this, null)
  	const buttonTitle = currentFood ? 'Try Again' : 'Go Back'

    return loading ? <LoadingView /> : <View style={styles.container}>
    	<View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
	    	{currentFood ? <IngredientCard {...currentFood} imageUri={imageUri} /> : <Text style={styles.apology}>
    			Could not find any {foodGroupName} with {nutrientName} :(
    		</Text>}
	    </View>
    	<View style={{ flex: 0.1 }} >
    		<TouchableOpacity onPress={onPress}>
    			<Text style={styles.button} >{buttonTitle}</Text>
    		</TouchableOpacity>
    	</View>
    </View>
  }
}

IngredientDeck.propTypes = {
  nutrientId: React.PropTypes.number.isRequired,
  nutrientName: React.PropTypes.string.isRequired,
  foodGroupName: React.PropTypes.string,
  foodGroupId: React.PropTypes.string,
  goBack: React.PropTypes.func.isRequired,
}

IngredientDeck.defaultProps = {
  foodGroupName: 'Vegetable and Vegetable Products',
  foodGroupId: '1100',
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	apology: { 
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
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
})

export default IngredientDeck;