// MainRooter.js
import React from 'react';
import { Image } from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';


/**
 * 为screen自动隐藏tabar
 * @param screen
 */
function autoHiddenTabbar(screen) {
    screen.navigationOptions = ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
            tabBarVisible = false;
        }
        return {
            tabBarVisible,
        };
    };

    return screen;
}


//ui
import {UIPages, UIRoutePage} from "../uihome/UIHomePage";

const uiscreen = createAppContainer(createStackNavigator(
    UIPages,
    {
        initialRouteName: UIRoutePage
    }
));

const uitab = {
    screen: autoHiddenTabbar(uiscreen),
    navigationOptions: ({ navigation }) => ({
        title: 'BaseUI',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./image/category.png')}
                selectedImage={require('./image/category.png')}
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
    screen: autoHiddenTabbar(foundationscreen),
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
    screen: autoHiddenTabbar(utilscreen),
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

//lifecycle
import {LifeCyclePages, LifeCycleRoutePage} from '../lifecyclehome/LifecycleHomePage';

const lifecyclescreen = createAppContainer(createStackNavigator(
    LifeCyclePages,
    {
        initialRouteName: LifeCycleRoutePage
    }
));

const lifecycletab = {
    screen: autoHiddenTabbar(lifecyclescreen),
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
};


//healthcer
import {HealthCerPages, HealthCerRoutePage} from '../helathCerApp/HealthCerRooter';

const healthcerscreen = createAppContainer(createStackNavigator(
    HealthCerPages,
    {
        initialRouteName: HealthCerRoutePage
    }
));

const healthcertab = {
    screen: autoHiddenTabbar(healthcerscreen),
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


//hello
import {HelloPages, HelloRoutePage} from '../hello/HelloHomePage';

const helloscreen = createAppContainer(createStackNavigator(
    HelloPages,
    {
        initialRouteName: HelloRoutePage
    }
));

const hellotab = {
    screen: autoHiddenTabbar(helloscreen),
    navigationOptions: ({ navigation }) => ({
        title: 'Hello',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./image/search.png')}
                selectedImage={require('./image/search.png')}
            />;
        }
    }),
};


// 属性设置详情查看：[createBottomTabNavigator](https://reactnavigation.org/docs/zh-Hans/bottom-tab-navigator.html)
const TabBarNavigator = createBottomTabNavigator({
        Tab_HealthCer: healthcertab,
        Tab_UI: uitab,
        Tab_Foundation: foundationtab,
        Tab_Util: utiltab,
        Tab_Lifecycle: lifecycletab,
        Tab_Hello: hellotab,
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
        initialRouteName: 'Tab_UI',
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








function m_navigator(Pages, RoutePage) {
    return createStackNavigator(
        Pages,
        {
            initialRouteName: RoutePage
        }
    )
}

// import {PickPages, PickRoutePage} from "../uihome/picker/PickHomePage";
// export default createAppContainer(m_navigator(PickPages, PickRoutePage));

// import {ImagePages, ImageRoutePage} from "../uihome/image/ImageHomePage";
// export default createAppContainer(m_navigator(ImagePages, ImageRoutePage));

// import {ListPages, ListRoutePage} from '../uihome/list/ListHomePage';
// export default createAppContainer(m_navigator(ListPages, ListRoutePage));

import ComJSSingleDatePage2 from "../uihome/picker/ComJSSingleDatePage2";
import ComJSPickersPage from "../uihome/picker/ComJSPickersPage";
// export default createAppContainer(
//     createStackNavigator(
//         {
//             TestPage: {
//                 screen: ComJSPickersPage,
//                 navigationOptions: () => ({
//                     title: `测试的Page`,
//                 }),
//             },
//         },
//         'TestPage'
//     )
// );



