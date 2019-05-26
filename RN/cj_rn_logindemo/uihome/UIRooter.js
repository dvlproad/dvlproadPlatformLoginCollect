// UIRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Button, Alert } from "react-native";

//UIHome
import UIHomePage from "./UIHomePage"


//navigation
import NavigationHomePage from "./navigation/NavigationHomePage";
import Page1 from './navigation/page1';
import Page2 from './navigation/page2';
import Page3 from './navigation/page3';

//button
import ButtonHomePage from "./button/ButtonHomePage"





//NavigationNavigation
const NavigationNavigation = createStackNavigator({
    Home: {
        screen: NavigationHomePage,
        navigationOptions: (props) => ({
            title: `NavigationHome`,
            headerRight: (
                <Button
                    onPress={() => {
                        Alert.alert("你点击了提交按钮！");
                    }}
                    title="提交"
                >提交</Button>
            )
        }),
    },
    A: {
        screen: Page1,
        navigationOptions: () => ({
            title: `A(react-native)`,
            headerBackTitle: 'A much too long text for back button from B to A',
            headerTruncatedBackTitle: `to A`
        }),
    },
    B: {
        screen: Page2,
        navigationOptions: () => ({
            title: `B(@ant-design/react-native)`,
        }),
    },
    C : {
        screen: Page3,
        navigationOptions: (props) => {//在这里定义每个页面的导航属性，动态配置
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;

            return {
                title: params.title ? params.title : '右上角测试专用页',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '编辑'}
                        onPress={() =>
                            setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
                    />
                ),
            }
        },
    },
});


//UIHomeNavigation
const UIHomeNavigation = createStackNavigator(
    {
        UI: {
            screen: UIHomePage,
            navigationOptions: () => ({
                title: `UI首页`,
            }),
        },
        Navigation: {
            screen: NavigationNavigation,
            navigationOptions: () => ({
                title: `导航首页`,
            }),
        },
        Buttons: {
            screen: ButtonHomePage,
            navigationOptions: () => ({
                title: `按钮首页`,
            }),
        },
    },
    {
        initialRouteName: 'UI'
    }
);


export default createAppContainer(UIHomeNavigation);




