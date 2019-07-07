// MainRooter.js
import React from 'react';
import { Image } from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';


import SampleAppMovies from "../movieApp/MovieHomePage";

import LifecycleRooter from "../lifecyclehome/LifecycleRooter";
import HelloWorldPage from '../helloworld/HelloWorldPage';

//ui
import {UIPages, UIRoutePage} from "../uihome/UIHomePage";

const uiscreen = createAppContainer(createStackNavigator(
    UIPages,
    {
        initialRouteName: UIRoutePage
    }
));

const uitab = {
    screen: uiscreen,
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
};



//foundation
import {FoundationPages, FoundationRoutePage} from "../foundation/FoundationHomePage";

const foundationscreen = createAppContainer(createStackNavigator(
    FoundationPages,
    {
        initialRouteName: FoundationRoutePage
    },
));

const foundationtab = {
    screen: foundationscreen,
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
}

//util
import {UtilPages, UtilRoutePage} from "../utilhome/UtilHomePage";

const utilscreen = createAppContainer(createStackNavigator(
    UtilPages,
    {
        initialRouteName: UtilRoutePage
    },
));

const utiltab = {
    screen: utilscreen,
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
}


//healthcer
import {HealthCerPages, HealthCerRoutePage} from '../helathCerApp/HealthCerRooter';

const healthcerscreen = createAppContainer(createStackNavigator(
    HealthCerPages,
    {
        initialRouteName: HealthCerRoutePage
    }
));

const healthcertab = {
    screen: healthcerscreen,
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
};


// 属性设置详情查看：[createBottomTabNavigator](https://reactnavigation.org/docs/zh-Hans/bottom-tab-navigator.html)
const TabBarNavigator = createBottomTabNavigator({
        HealthCerRooter: healthcertab,
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
        UIRooter: uitab,
        FoundationRooter: foundationtab,
        BaseUtil: utiltab,
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
        tabBarVisible: false,
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
        initialRouteName: 'UIRooter',
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





//TestNavigation
import ComJSSingleDatePage from "../uihome/picker/ComJSSingleDatePage";

const TestNavigation = createStackNavigator(
    {
        TestHomePage: {
            screen: ComJSSingleDatePage,
            navigationOptions: () => ({
                title: `ComJSSingleDatePage`,
            }),
        },
    },
    {
        initialRouteName: 'TestHomePage'
    }
);




// export default createAppContainer(TestNavigation);
export default createAppContainer(TabBarNavigator);



