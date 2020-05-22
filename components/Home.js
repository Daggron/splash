import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions, FlatList, Animated, TouchableWithoutFeedback, RefreshControl, StatusBar } from 'react-native';
import Axios from 'axios';

export default function Home(props) {

  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState();
  const [refresh, setRefresh] = useState(false);

  
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
      <StatusBar hidden={true}/>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={wallpapers}
          renderItem={({item})=>{
            return(
              <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('Wallpaper',{item: item})}>
                <View style={{height: height/3, width: width/2,}}>
                  <View style={{position: 'absolute', alignSelf: 'center', alignItems: 'center'}}>
                      <ActivityIndicator size="small" color='red' />
                  </View>
                  <Image source={{uri: item.urls.regular}} style={{flex: 1, height: null, width: null}}/>
                </View>
              </TouchableWithoutFeedback>
            )
          }}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
