// UIRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Button, Alert } from "react-native";

//UIHome
import UIHomePage from "./UIHomePage"


//layout
import LayoutHomePage from "./layout/LayoutHomePage"

//navigation
import NavigationHomePage from "./navigation/NavigationHomePage";
import Page1 from './navigation/page1';
import Page2 from './navigation/page2';
import Page3 from './navigation/page3';

//button
import ButtonHomePage from "./button/ButtonHomePage"

//text
import TextHomePage from "./text/TextHomePage"

//pickDate
import PickDatePage from './pickDate/PickDatePage'
//pickImage
import PickImagePage from './pickImage/PickImagePage'




//NavigationNavigation
const NavigationNavigation = createStackNavigator({
    NavigationHome: {
        screen: NavigationHomePage,
        navigationOptions: () => ({
            title: `NavigationHome`,
        }),
    },
    A: {
        screen: Page1,
        navigationOptions: () => ({
            title: `A(react-native)`,
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
        UIHome: {
            screen: UIHomePage,
            navigationOptions: () => ({
                title: `UI首页`,
            }),
        },
        LayoutHome: {
            screen: LayoutHomePage,
            navigationOptions: () => ({
                title: `Layout首页`,
            }),
        },
        NavigationHome: {
            //screen: NavigationNavigation, //会多一个导航栏
            screen: NavigationHomePage, //TODO:怎么传递导航栏
            navigationOptions: () => ({
                title: `Navigation首页`,
                header: null,
            }),
        },
        ButtonHome: {
            screen: ButtonHomePage,
            navigationOptions: () => ({
                title: `Button首页`,
            }),
        },
        TextHome: {
            screen: TextHomePage,
            navigationOptions: () => ({
                title: `Text首页`,
            }),
        },
        PickDatePage: {
            screen: PickDatePage,
            navigationOptions: () => ({
                title: `日期选择`,
            }),
        },
        PickImagePage: {
            screen: PickImagePage,
            navigationOptions: () => ({
                title: `图片选择`,
            }),
        },
    },
    {
        initialRouteName: 'PickImagePage'
    }
);


export default createAppContainer(UIHomeNavigation);




