// MainRooter.js
import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import HealthCerRooter from '../helathCerApp/HealthCerRooter';
import SampleAppMovies from "../movieApp/MovieHomePage";
import UIRooter from "../uihome/UIRooter";
import UtilRooter from "../utilhome/UtilRooter";
import LifecycleRooter from "../lifecyclehome/LifecycleRooter";
import HelloWorldPage from '../helloworld/HelloWorldPage';
import FoundationRooter from "../foundation/FoundationRooter";

// 属性设置详情查看：[createBottomTabNavigator](https://reactnavigation.org/docs/zh-Hans/bottom-tab-navigator.html)
const TabBarNavigator = createBottomTabNavigator({
        HealthCerRooter: {
            screen: HealthCerRooter,
            navigationOptions: ({ navigation }) => ({
                title: '健康证',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/home.png')}
                        selectedImage={require('./image/home.png')}
                    />
                ),
            }),
        },
        Movie: {
            screen: SampleAppMovies,
            navigationOptions: ({ navigation }) => ({
                title: '电影',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/category.png')}
                        selectedImage={require('./image/category.png')}
                    />
                ),
            }),
        },
        UIRooter: {
            screen: UIRooter,
            navigationOptions: ({ navigation }) => ({
                title: 'BaseUI',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/remind.png')}
                        selectedImage={require('./image/remind.png')}
                    />;
                }
            }),
        },
        FoundationRooter: {
            screen: FoundationRooter,
            navigationOptions: ({ navigation }) => ({
                title: 'Foundation',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/remind.png')}
                        selectedImage={require('./image/remind.png')}
                    />;
                }
            }),
        },
        BaseUtil: {
            screen: UtilRooter,
            navigationOptions: ({ navigation }) => ({
                title: 'BaseUtil',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/mine.png')}
                        selectedImage={require('./image/mine.png')}
                    />;
                }
            }),
        },
        Lifecycle: {
            screen: LifecycleRooter,
            navigationOptions: ({ navigation }) => ({
                title: 'Lifecycle',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/scanning.png')}
                        selectedImage={require('./image/scanning.png')}
                    />;
                }
            }),
        },
        HelloWorld: {
            screen: HelloWorldPage,
            navigationOptions: ({ navigation }) => ({
                title: 'HelloWorld',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/search.png')}
                        selectedImage={require('./image/search.png')}
                    />;
                }
            }),
        },
    },
    {
        tabBarPosition: 'bottom',
        lazy: true, // 是否懒加载
        tabBarOptions: {
            // activeTintColor: Colors.themeColor,
            // inactiveTintColor: Colors.textColor999,
            showIcon: true,
            style: {
                height: 49,
                // backgroundColor: Colors.whiteColor,
                zIndex: 0,
                position: 'relative',
            },
            labelStyle: {
                fontSize: 12,
                paddingVertical: 0,
                marginTop: -2,
            },
            iconStyle: {
                paddingBottom: 4,
                marginTop: -2,
            },
            indicatorStyle: {
                height: 0,
            }
        },
        initialRouteName: 'FoundationRooter'
    });

class TabBarItem extends React.Component {
    render() {
        return (
            <Image
                style={{width:22, height:22}}
                source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
            />
        )
    }

}

export default createAppContainer(TabBarNavigator);




