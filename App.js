import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator, Dimensions, FlatList, Animated, TouchableWithoutFeedback } from 'react-native';
import Axios from 'axios';

export default function App() {

  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState();
  const [isFocused, setIsFocused] = useState(false);
  
  let scale = new Animated.Value(1);
  
  useEffect(()=>{
    Axios.get('https://api.unsplash.com/photos/random?count=30&orientation=portrait&client_id=cD88XxshODqmVa7ii3a5LCld1XZR66tuNGq125nXQWA')
    .then(res=> {
      setWallpapers(res.data);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[]);

  const handleScale = (focus) => {
    if(focus){
      setIsFocused(true);
      Animated.spring(scale,{toValue: 0.9}).start();
    } else {
      setIsFocused(false);
      Animated.spring(scale,{toValue: 1}).start();
    } 
  }

  if(loading){
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="red" size="large"/>
      </View>
    );
  }
  
  const {height, width} = Dimensions.get('window');
  return(
    <View style={{height, width}}>
      <FlatList
        scrollEnabled={!isFocused}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={wallpapers}
        renderItem={({item})=>{
          return(
            <TouchableWithoutFeedback onPress={()=>handleScale(!isFocused)}>
              <Animated.View style={[{height, width, transform: [{scale: scale}]}]}>
                <Image source={{uri: item.urls.regular}} style={{flex: 1, height: null, width: null}}/>
              </Animated.View>
            </TouchableWithoutFeedback>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});
