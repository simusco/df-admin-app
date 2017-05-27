import React,{Component} from 'react';
import {BackAndroid,AppState,StyleSheet,View,Navigator,ToastAndroid,Text,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Main from './pages'

export default class App extends Component{
    render(){
        return (
            <Main/>
        );
    }
}

