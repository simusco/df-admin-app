import React,{Component} from 'react';
import {BackAndroid,AppState,StyleSheet,View,Navigator,ToastAndroid,Text,Image,ScrollView} from 'react-native';
import NavigationBar from 'react-native-navbar';

const maintainStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    body:{}
});

export default class  Maintain extends Component{



    render(){
        return (
            <View style={maintainStyles.container}>
                <NavigationBar title={{title:'维护'}}/>
            </View>
        );
    }
}