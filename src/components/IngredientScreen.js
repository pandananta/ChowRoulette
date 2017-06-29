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
    // this.state = {
    // 	imageUri: undefined,
    // 	imageHeight: undefined,
    // 	imageWidth: undefined,
    // };

    this.state = {
    	buttonTitle: 'YOLO',
    	imageUri: 'https://facebook.github.io/react/img/logo_og.png',
    	imageHeight: 400,
    	imageWidth: 400,
    };
  }


  static navigationOptions = {
    title: 'Ingredient Screen',
  };

  test = () => {
  	return fetch('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=broccoli&count=1&safeSearch=strict&mkt=en-US', {
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
    		buttonTitle: _responseData.name,
    		imageUri: _responseData.thumbnailUrl,
    		imageWidth: _responseData.thumbnail.width,
    		imageHeight: _responseData.thumbnail.height,
    	})
    }).catch((err) => {
		    console.error('Encountered error making request:', err);
		});
  }

  render() {
  	const { buttonTitle, imageUri, imageWidth, imageHeight } = this.state
  	console.log("rendering", imageUri, imageWidth, imageHeight)
    return <View style={{ flex: 1 }}>
    	{imageUri && <Image source={{uri: imageUri }} style={{width: imageWidth, height: imageHeight}} />}
    	<Button onPress={this.test} title={buttonTitle} />
    </View>;
  }
}

export default IngredientScreen;