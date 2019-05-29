// MainRooter.js
import React from 'react';
import {Alert, Button, Image} from 'react-native';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';

import HealthCerRooter from '../helathCerApp/HealthCerRooter';
import SampleAppMovies from "../movieApp/MovieHomePage";
import UIRooter from "../uihome/UIRooter";
import UtilRooter from "../utilhome/UtilRooter";
import LifecycleRooter from "../lifecyclehome/LifecycleRooter";
import HelloWorldPage from '../helloworld/HelloWorldPage';

const TabBarNavigator = createBottomTabNavigator({
        HealthCerHome: {
            screen: HealthCerRooter,
            navigationOptions: ({ navigation }) => ({
                title: '健康证',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
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
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
                    />
                ),
            }),
        },
        BaseUI: {
            screen: UIRooter,
            navigationOptions: ({ navigation }) => ({
                title: 'BaseUI',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
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
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
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
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
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
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
                    />;
                }
            }),
        },
    },
    {
        tabBarPosition: 'bottom',
        lazy: true, // 是否懒加载
        tabBarOptions: {
            // activeTintColor: LuckinColors.themeColor,
            // inactiveTintColor: LuckinColors.textColor999,
            showIcon: true,
            style: {
                height: 49,
                // backgroundColor: LuckinColors.whiteColor,
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
    });

class TabBarItem extends React.Component {
    render() {
        return (
            <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
            />
        )
    }

}

export default createAppContainer(TabBarNavigator);




