import React,{Component,PropTypes} from 'react';
import {BackAndroid,AppState,StyleSheet,View,Navigator,ToastAndroid,Text,Image,ScrollView,ListView} from 'react-native';
import NavigationBar from 'react-native-navbar';
import PageList from '../components/PageList';
import {observer} from 'mobx-react/native';
import {doGet} from '../components/RequestUtil';

const chargeItemStyles = StyleSheet.create({
    container: {
        height:72,
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:'#222222',
        flexDirection:'column'
    },
    header:{
        flex:1,
        flexDirection:'row'
    },
    name:{
        flex:7,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    price:{
        flex:3,
        alignItems:'center',
        justifyContent:'center',
    },
    text0:{
        fontSize:16,
    },
    text1:{
        color:'red',
        fontSize:16
    },
    body:{
        flex:1,
        flexDirection:'row',
        marginLeft:4
    },
    tag:{
        marginLeft:2,
        marginRight:2,
        height:18,
        backgroundColor:'red',
        borderRadius:4,
        paddingLeft:4,
        paddingRight:4,
    },
    text2:{
        fontSize:14,
        color:'#ffffff'
    }
});

@observer
class ChargeItem extends Component{

    render(){
        const {item} = this.props;

        return (
            <View style={chargeItemStyles.container}>
                <View style={chargeItemStyles.header}>
                    <View style={chargeItemStyles.name}>
                        <Text style={chargeItemStyles.text0}>{item.goodsName}({item.goodsType})</Text>
                    </View>
                    <View style={chargeItemStyles.price}>
                        <Text style={chargeItemStyles.text1}>{item.price}元</Text>
                    </View>
                </View>
                <View style={chargeItemStyles.body}>
                    <View style={chargeItemStyles.tag}>
                        <Text style={chargeItemStyles.text2}>{item.payType}</Text>
                    </View>
                    <View style={chargeItemStyles.tag}>
                        <Text style={chargeItemStyles.text2}>{item.userAgent}</Text>
                    </View>
                    <View style={chargeItemStyles.tag}>
                        <Text style={chargeItemStyles.text2}>{item.channelid}</Text>
                    </View>
                    <View style={chargeItemStyles.tag}>
                        <Text style={chargeItemStyles.text2}>{item.payTime}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const chargeListStyles = StyleSheet.create({
    container: {
        flex:1
    }
});

@observer
class ChargeList extends Component{

    renderRow = (row) => <ChargeItem item={row}/>;

    render(){
        const {pageList} = this.props;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return (
            <ListView
                enableEmptySections
                style={chargeListStyles.container}
                dataSource={ds.cloneWithRows(pageList.data.slice(0))}
                renderRow={this.renderRow}
            />
        );
    }
}

const chargeSummaryStyles = StyleSheet.create({
    summary:{
        backgroundColor:'orange',
        flexDirection:'column',
        height:160
    },
    total:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    h1:{
        fontSize:24,
        color:'#ffffff'
    },
    pay:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row'
    },
    payL:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    payR:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    charge:{
        flex:1,
        flexDirection:'row'
    },
    chargeL:{
        flex:1
    },
    chargeR:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    h3:{
        fontSize:16,
        color:'#fff'
    }
});

@observer
class ChargeSummary extends Component{
    render(){
        const {data} = this.props;
        var totalPrice = 0;
        var wxPrice = 0;
        var aliPrice = 0;
        var totalNum = data.length;
        var iosNum = 0;
        var iosWxPrice = 0;
        var iosAliPrice = 0;

        data.forEach(function (rec) {
            totalPrice += rec.price;
            if(rec.payType == 'WEIXIN'){
                wxPrice += rec.price;
            }else{
                aliPrice += rec.price;
            }

            if(rec.userAgent == 'ios'){
                ++iosNum;
                if(rec.payType == 'WEIXIN'){
                    iosWxPrice += rec.price;
                }else{
                    iosAliPrice += rec.price;
                }
            }
        });
        return (
            <View style={chargeSummaryStyles.summary}>
                <View style={chargeSummaryStyles.total}>
                    <Text style={chargeSummaryStyles.h1}>今日总收益{totalPrice}元</Text>
                </View>
                <View style={chargeSummaryStyles.pay}>
                    <View style={chargeSummaryStyles.payL}>
                        <Text style={chargeSummaryStyles.h3}>微信合计{wxPrice}元</Text>
                    </View>
                    <View style={chargeSummaryStyles.payR}>
                        <Text style={chargeSummaryStyles.h3}>阿里合计{aliPrice}元</Text>
                    </View>
                </View>
                <View style={chargeSummaryStyles.pay}>
                    <View style={chargeSummaryStyles.payL}>
                        <Text style={chargeSummaryStyles.h3}>IOS微信{iosWxPrice}元</Text>
                    </View>
                    <View style={chargeSummaryStyles.payR}>
                        <Text style={chargeSummaryStyles.h3}>IOS阿里{iosAliPrice}元</Text>
                    </View>
                </View>
                <View style={chargeSummaryStyles.charge}>
                    <View style={chargeSummaryStyles.chargeL}></View>
                    <View style={chargeSummaryStyles.chargeR}>
                        <Text style={chargeSummaryStyles.h3}>充值人数：{totalNum}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const chargeStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    body:{}
});

class SimplePage extends PageList{
    fetchData(){
        return doGet('http://draftbottle.dftrip.com/draftbottle/charge')
            .then(res =>{
                var r = [];
                if(res.code == 100){
                    r = res.result;
                }
                return {
                    count:r.length,
                    results:r
                }
            });
    }
}


@observer
export default class Charge extends Component{
    pageList = new SimplePage();

    render(){
        return (
            <View style={chargeStyles.container}>
                <NavigationBar title={{title:'当天收入'}}/>
                <ChargeSummary data={this.pageList.data}/>
                <ChargeList pageList={this.pageList}/>
            </View>
        );    
    }
}