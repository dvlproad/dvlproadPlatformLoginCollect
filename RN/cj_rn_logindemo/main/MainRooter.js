// MainRooter.js
import React from 'react';
import {Alert, Button, Image} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import HealthCerRooter from '../helathCerApp/HealthCerRooter';
import SampleAppMovies from "../movieApp/MovieHomePage";
import UIChoosePage from "../uihome/UIRooter"
import HelloWorldPage from '../helloworld/HelloWorldPage'

const AppStackNavigator = createStackNavigator(
    {
        UI: {
            screen: UIChoosePage,
            navigationOptions: () => ({
                title: `UI首页`,
                header: null,       //隐藏顶部导航栏
                tabBarVisible: true // 隐藏底部导航栏
            }),
        },

    },
    {
        initialRouteName: 'HealthCer'
    }
);



const LuckinTabBarScreen = createBottomTabNavigator({
        HelathCerHome: {
            screen: HealthCerRooter,
            navigationOptions: ({ navigation }) => ({
                title: '健康证',
                tabBarIcon: ({ focused, tintColor }) => (
                    <LuckinTabBarItem
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
                    <LuckinTabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/home_n.png')}
                        selectedImage={require('./image/home_n.png')}
                    />
                ),
            }),
        },
        BaseUI: {
            screen: UIChoosePage,
            navigationOptions: ({ navigation }) => ({
                title: 'BaseUI',
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return <LuckinTabBarItem
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
                    return <LuckinTabBarItem
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

class LuckinTabBarItem extends React.Component {
    render() {
        return (
            <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
            />
        )
    }

}

export default createAppContainer(LuckinTabBarScreen);

// export default createAppContainer(AppStackNavigator);




