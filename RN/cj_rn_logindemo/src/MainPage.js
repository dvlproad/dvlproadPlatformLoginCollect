// MainPage.js
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomePage from "./homePage";
// import ChoosePage from "./choosePage";
// import UIHomePage from "../uihome/uiHomePage"
// import ButtonHome from "../uihome/buttonHome"
// import UIChoosePage from "../uihome/uiChoosePage"


// const dataSource = [
//     {
//         icon:require('../image/home_n.png'),
//         selectedIcon:require('../image/home_s.png'),
//         tabPage:'Home',
//         tabName:'首页',
//         component:HomePage
//     },
//     {
//         icon:require('../image/article_n.png'),
//         selectedIcon:require('../image/article_s.png'),
//         tabPage:'Article',
//         tabName:'文章',
//         component:HomePage
//     },
//     {
//         icon:require('../image/order_n.png'),
//         selectedIcon:require('../image/order_s.png'),
//         tabPage:'Order',
//         tabName:'订单',
//         component:HomePage
//     },
//     {
//         icon:require('../image/owner_n.png'),
//         selectedIcon:require('../image/owner_s.png'),
//         tabPage:'Owner',
//         tabName:'我的',
//         component:HomePage
//     }
// ]

// var navigation = null;
// type Props = {};
export default class MainPage extends Component<Props> {
//     constructor(props){
//         super(props);
//         navigation = this.props.navigation;
//         this.state = {
//             selectedTab:'Home'
//         }
//     }
//
   render() {
//         let tabViews = dataSource.map((item,i) => {
//             return (
//                 <TabNavigator.Item
//                     title={item.tabName}
//                     selected={this.state.selectedTab===item.tabPage}
//                     titleStyle={{color:'black'}}
//                     selectedTitleStyle={{color:'#7A16BD'}}
//                     renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
//                     renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
//                     tabStyle={{alignSelf:'center'}}
//                     onPress = {() => {this.setState({selectedTab:item.tabPage})}}
//                     key={i}
//                 >
//                     <item.component  navigation={navigation}/>
//                 </TabNavigator.Item>
//             );
//         })
        return (
            <HomePage/>
//             <View style={styles.container}>
//                 <TabNavigator
//                     hidesTabTouch={true}
//                 >
//                     {tabViews}
//                 </TabNavigator>
//             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tabIcon:{
        width:23,
        height:23,
    }
});