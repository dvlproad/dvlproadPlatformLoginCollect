// UIRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//UIHome
import UIHomePage from "./UIHomePage"


//layout
import LayoutHomePage from "./layout/LayoutHomePage"

//navigation
import { NavigationPages } from "./navigation/NavigationHomePage";

//button
import ButtonHomePage from "./button/ButtonHomePage"

//text
import TextHomePage from "./text/TextHomePage"

//image
import { ImagePages } from "./image/ImageHomePage";
//list
import { ListPages } from "./list/ListRooter";

//hud
import HUDHomePage from './loading/HUDHomePage'

//pickDate
import PickDatePage from './pickDate/PickDatePage'
//pickImage
import PickImagesPage from './pickImage/PickImagesPage'


//loading
import ActivityIndicatorPage from './loading/ActivityIndicatorPage'

//webview
import { WebViewPages } from './webview/WebViewRooter';
import EmptyNetworkPage from "./empty/EmptyNetworkPage";



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
        ...NavigationPages,

        EmptyNetworkPage: {
            screen: EmptyNetworkPage,
            navigationOptions: () => ({
                title: `EmptyNetworkPage`,
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

        ...ImagePages,
        ...ListPages,

        HUDHomePage: {
            screen: HUDHomePage,
            navigationOptions: () => ({
                title: `HUD首页`,
            }),
        },


        PickDatePage: {
            screen: PickDatePage,
            navigationOptions: () => ({
                title: `日期选择`,
            }),
        },
        PickImagesPage: {
            screen: PickImagesPage,
            navigationOptions: () => ({
                title: `多个图片选择`,
            }),
        },





        ActivityIndicatorPage: {
            screen: ActivityIndicatorPage,
            navigationOptions: () => ({
                title: `ActivityIndicatorPage(一个圆形的 loading 提示符号)`,
            }),
        },

        ...WebViewPages,
    },
    {
        initialRouteName: 'UIHome'
    }
);


export default createAppContainer(UIHomeNavigation);




