import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert} from 'react-native';
import NavigationBar from 'react-native-navbar';

const navGroupStyles = StyleSheet.create({
    group: {
        flexDirection: "column",
        marginTop:10,
        backgroundColor:'white',
    }
});

class NavGroup extends  Component{
    render(){
        const {navs} = this.props;
        return (
            <View style={navGroupStyles.group}>
                {
                    navs.items.map((nav,index)=>{
                        return <Nav key={'nav_'+index} {...nav} isLast={navs.items.length == index+1}/>
                    })
                }
            </View>
        )
    }
}


const  navStyles = StyleSheet.create({
    nav:{
        height:40,
        flexDirection: "row",
    },
    icon:{
        justifyContent:'center',
        alignItems:'center',
        width:46,
    },
    content:{
        flex:1,
        alignItems:'center',
        flexDirection: "row",
    },
    left:{
        justifyContent:'center',
        flex:1,
        alignItems:'flex-start',
    },
    right:{
        justifyContent:'center',
        flex:1,
        alignItems:'flex-end',
    },
    iconImg:{
        width:32,
        height:32,
    },
    bline:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#222222',
    }
});

class Nav extends Component{
    render(){
        const {isLast,title,onClick} = this.props;

        return (
            <TouchableOpacity style={navStyles.nav} onPress={onClick}>
                <View style={navStyles.icon}><Image style={navStyles.iconImg} source={require("../images/1.png")} /></View>
                <View style={[navStyles.content, isLast?{}:navStyles.bline]} >
                    <View style={navStyles.left}><Text>{title}</Text></View>
                    <View style={navStyles.right}>
                        <Image style={navStyles.iconImg} source={require("../images/035.png")} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const maintainStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#cccccc',
    },
});

export default class  Maintain extends Component{
    render(){
        return (
            <View style={maintainStyles.container}>
                <NavigationBar title={{title:'维护'}}/>
                <NavGroup navs={{items:[
                        {title:'礼物管理',onClick:()=>{}},
                        {title:'闪屏管理',onClick:()=>{}},
                        {title:'功能开关',onClick:()=>{Alert.alert('功能开关');}}
                        ]}}/>
                <NavGroup navs={{items:[
                        {title:'用户查询',onClick:()=>{}},
                        {title:'日志查询',onClick:()=>{}}
                        ]}}/>
            </View>
        );
    }
}