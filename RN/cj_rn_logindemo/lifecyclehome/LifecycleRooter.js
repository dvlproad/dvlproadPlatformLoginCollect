// LifecycleRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//LifecycleHome
import LifecycleHomePage from "./LifecycleHomePage"


//state
import StateEasyPage from "./state/StateEasyPage"
import StateNormalPage from "./state/StateNormalPage";
//props
import PropsEasyPage from "./props/PropsEasyPage";
import PropsNormalPage from "./props/PropsNormalPage";
import PropsPerfectPage from "./props/PropsPerfectPage";


//LifecycleHomeNavigation
const LifecycleHomeNavigation = createStackNavigator(
    {
        LifecycleHome: {
            screen: LifecycleHomePage,
            navigationOptions: () => ({
                title: `Lifecycle首页`,
            }),
        },
        StateEasyPage: {
            screen: StateEasyPage,
            navigationOptions: () => ({
                title: `State(最简单的使用)`,
            }),
        },
        StateNormalPage: {
            screen: StateNormalPage,
            navigationOptions: () => ({
                title: `State(正常使用)`,
            }),
        },
        PropsEasyPage: {
            screen: PropsEasyPage,
            navigationOptions: () => ({
                title: `Props(最简单的使用)`,
            }),
        },
        PropsNormalPage: {
            screen: PropsNormalPage,
            navigationOptions: () => ({
                title: `Props(基本的使用)`,
            }),
        },
        PropsPerfectPage: {
            screen: PropsPerfectPage,
            navigationOptions: () => ({
                title: `Props(完整的使用)`,
            }),
        },
    },
    {
        initialRouteName: 'LifecycleHome'
    }
);


export default createAppContainer(LifecycleHomeNavigation);




