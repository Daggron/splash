import React from 'react'
import { View, Image, Dimensions, StyleSheet, Animated, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function Wallpaper(props) {
    const { item } = props.route.params;
    const {height, width} = Dimensions.get('window');
    const scale = new Animated.Value(height);
    let isfocused = false;
    
    const handleFocus = () => {
        if(isfocused){
            Animated.spring(scale,{
                toValue: height,
                speed: 2
            }).start();
        }else {
            Animated.spring(scale,{
                toValue: height - 150,
                speed: 2    
            }).start();
        }
        isfocused = !isfocused;
    }
    const handleSave = async () => {
       const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);

       if(status !== 'granted') {
           const {status, permissions} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
           console.log(status);
       }

       if(status === 'granted') {
           setTimeout(()=>{
               alert('Begin Download');
           },200)
           FileSystem.downloadAsync(
               item.urls.regular,
               FileSystem.documentDirectory + item.id + '.jpg'
            ).then(({uri})=>{
                // console.log(uri);
                MediaLibrary.saveToLibraryAsync(uri);
                alert('Photo Saved')
            })
            .catch(err=>{
                console.log(err);
                alert('An error occurred while downloding')
            })
       } else {
           alert('Require Camera Permission to download')
       }
    }
    
    return (
        <ScrollView>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <TouchableWithoutFeedback onPress={handleFocus}>
                    <Animated.View style={{height: scale, width,}} >
                        <Image source={{uri: item?.urls?.regular}} style={{flex: 1, height: null, width: null,}} />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <View style={Style.buttonsWrapper}>
                    <Ionicons name="ios-save" size={40}  style={{padding: 15}} onPress={handleSave} />
                    <Ionicons name="ios-share" size={40} style={{padding: 15}} />
                </View>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    buttonsWrapper: {
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -50,
        backgroundColor: '#fff',
        height: 100 ,
        width: Dimensions.get('window').width,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50 
    }
})