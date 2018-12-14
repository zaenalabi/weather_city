import React from 'react';
import { StyleSheet, Text, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput,  ImageBackground, View, TouchableOpacity } from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {

constructor(props){
  super(props);

  this.state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: '',
  };
}

componentDidMount(){
 this.handleUpdateLocation('Washington DC');
}


handleUpdateLocation = async city => {
  if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId,
          );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });

      } catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  });
};


render() {
  const { loading, error, location, weather, temperature } = this.state;

return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <StatusBar barStyle="light-content" />
    <ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer}
    imageStyle={styles.image}
    >
    
    <View style={styles.detailsContainer}>
    
      <Text style={[styles.largeText, styles.textStyle]}></Text>
      <ActivityIndicator animating={loading} color="white" size="large" />
      
      {!loading && (
        <View>
          {error && (

            <Text style={[styles.smallText, styles.textStyle]}>
              sory, not found
            </Text>
          )}

          {!error && (
            <View>
              <Text style={[styles.largeText, styles.textStyle]}>
                {location}
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                {weather}
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>
                {`${Math.round(temperature)}° C`}
              </Text>
            </View>
          )}

          <SearchInput
          placeholder="search city..."
          onSubmit={this.handleUpdateLocation}
          />

        

        </View>
      )}  

        <View >
     
      <Text style={[styles.minytext, styles.foo, styles.white]}>by: Zaenal Abidin</Text>
      </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView> 
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },

  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ?  'AvenirNext-Regular' : 'Roboto',
    color: 'white',

  },
  miniText:{
    fontSize: 15,
  },
  smallText: {
    fontSize: 18,
  },

  largeText: {
    fontSize: 44,
  },

  imageContainer: { 
    flex: 1, 
  }, 


   foo:{
      color: '#fff',
      alignSelf: 'center',
      marginTop: 100,
   },

  image: { 
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20, 
  },

});
