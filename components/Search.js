import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    FlatList,
    TouchableWithoutFeedback,
    Animated,
    Image,
    ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Axios from 'axios';

export default function Search(props) {
    const [query, setQuery] = useState('');
    const [wallpaper, setWallpaper] = useState([]);
    const [loading, setLoading] = useState(false);

    const {height, width} = Dimensions.get('window');

    const inputHandle = (e) => {
        setQuery(e);
    }
    const handleSearch = () => {
        setLoading(true);
        Axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=5d6ed0af162d65294359bb171b4ca9a3cd12ab126dcdb812099afd32eb16ae76`)
        .then(res=>{
            setWallpaper(res.data.results);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false);
            alert('An Error Occured! Please try later');
        })
    }
    return (
        <View style={styles.container}>
            <View>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput style={styles.textBox} placeholder="Search from 100's of wallpapers" onChangeText={inputHandle}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Text style={styles.button}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
            {
                !loading ? (
                    <FlatList
                        style={{marginTop: 20}}
                        numColumns={2}
                        pagingEnabled
                        showsVerticalScrollIndicator={false}
                        data={wallpaper}
                        renderItem={({item})=>{
                            return(
                            <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('Wallpaper',{item: item})}>
                                <Animated.View style={{height: height/3, width: width/2}}>
                                <Image source={{uri: item?.urls?.regular}} style={{flex: 1, height: null, width: null}}/>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                ): (
                    <View style={{height,width, justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="red"/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textBox: {
        height: 50,
        width: Dimensions.get('window').width - 10,
        borderColor: '#444',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        marginVertical: 10,
        color: '#444',
    },
    button: {
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#0779e4',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#0779e4',
        width: 100,
        alignSelf: 'center',
    }
})