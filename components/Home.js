import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions, FlatList, Animated, TouchableWithoutFeedback, ScrollView, RefreshControl } from 'react-native';
import Axios from 'axios';

export default function Home(props) {

  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState();
  const [refresh, setRefresh] = useState(false);
  let isFocused = false;
  let scale = new Animated.Value(1)
  
  useEffect(()=>{
    Axios.get('https://api.unsplash.com/photos/random?count=30&orientation=portrait&client_id=5d6ed0af162d65294359bb171b4ca9a3cd12ab126dcdb812099afd32eb16ae76')
    .then(res=> {
      setWallpapers(res.data);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[]);

  const handleRefresh = () => {
    setRefresh(true);
    Axios.get('https://api.unsplash.com/photos/random?count=30&orientation=portrait&client_id=5d6ed0af162d65294359bb171b4ca9a3cd12ab126dcdb812099afd32eb16ae76')
    .then(res=> {
      setWallpapers([...res.data, ...wallpapers]);
      setRefresh(false);
    })
    .catch(err=>{
      console.log(err);
      setRefresh(false);
    })
  }


  const handleScale = async () => {
    if (isFocused){
      Animated.timing(scale,{
        toValue: 1,
        duration: 1000
      }).start();
    }
    else {
      Animated.timing(scale,{
        toValue: 0.9,
        duration: 1000
      }).start();  
    }
    isFocused = !isFocused;
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      >
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          data={wallpapers}
          renderItem={({item})=>{
            return(
              <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('Wallpaper',{item: item})}>
                <Animated.View style={[{height: height/3, width: width/2, transform: [{scale: scale}]}]}>
                  <Image source={{uri: item.urls.regular}} style={{flex: 1, height: null, width: null}}/>
                </Animated.View>
              </TouchableWithoutFeedback>
            )
          }}
          keyExtractor={item => item.id}
        />
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
