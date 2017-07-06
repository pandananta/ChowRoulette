import React from 'react';

import LoadingView from 'ChowRoulette/src/components/LoadingView'

import {
  Image,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import split from 'lodash/split'
import pluralize from 'pluralize'

import theme from 'ChowRoulette/src/assets/styles/theme.js'

class IngredientCard extends React.Component {

  render() {
    const { name, nameMassaged, imageUri } = this.props
    const measure =  this.props.measure.substring(0, 3) === '1.0' ? this.props.measure.substring(4) : this.props.measure
    const nutrients = this.props.nutrients[0]
    const isPlural = nameMassaged === pluralize(nameMassaged)

    return <View style={styles.card}>
  		<Text style={styles.title}>
  			{nameMassaged}!
  		</Text>
  		{imageUri && <Image source={{uri: imageUri }} style={styles.image} resizeMode='cover' />}
  		<Text style={styles.description}>
        According to the USDA, "<Text style={styles.bold}>{name}</Text>" {isPlural ? 'have ' : 'has '}<Text style={styles.bold}>{nutrients.value} {nutrients.unit} </Text> 
        of {split(nutrients.nutrient, ',')[0]} per {measure}.
      </Text>
  	</View>
  }
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'lightslategrey',
		borderRadius: 8,
		padding: 20,
		height: 380,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		fontFamily: theme.fontFamily.primary,
	},
	image: {
		borderWidth: 1,
		borderColor: 'lightslategrey',
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20,
	},
	description: {
		alignItems: 'center',
		fontFamily: theme.fontFamily.primary,
		textAlign: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
});

export default IngredientCard;