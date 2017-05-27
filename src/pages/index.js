import React,{Component} from 'react';
import {BackAndroid,AppState,StyleSheet,View,Navigator,ToastAndroid,Text,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Charge from './Charge';
import Maintain from './Mantain';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#000000",
        fontSize: 13
    },
    selectedTabText: {
        color: "#999999",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    },
    tabContent:{}
});

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {selectedTab: '收入'};
    }
    render(){
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '兑换'}
                        title="兑换"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        onPress={() => this.setState({ selectedTab: '兑换' })}>
                        <View style={styles.tabContent}>
                            <Text>这是一个红色View！</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '收入'}
                        title="收入"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        onPress={() => this.setState({ selectedTab: '收入' })}>
                        <Charge/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '维护'}
                        title="维护"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        onPress={() => this.setState({ selectedTab: '维护' })}>
                        <Maintain/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '查询'}
                        title="查询"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/icon.png")} />}
                        onPress={() => this.setState({ selectedTab: '查询' })}>
                        <View style={styles.tabContent}>
                            <Text>这是一个红色View！</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

