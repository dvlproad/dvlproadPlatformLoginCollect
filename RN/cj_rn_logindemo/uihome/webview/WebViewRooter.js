// WebViewRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import WebViewHomePage from "./WebViewHomePage"
import WebViewPage1 from "./WebViewPage1"
import WebViewPage2 from "./WebViewPage2"

//WebViewPages
export const WebViewPages = {
    WebViewHomePage: {
        screen: WebViewHomePage,
        navigationOptions: () => ({
            title: `WebViewHomePage`,
        }),
    },
    WebViewPage1: {
        screen: WebViewPage1,
        navigationOptions: () => ({
            title: `WebViewPage1`,
        }),
    },
    WebViewPage2: {
        screen: WebViewPage2,
        navigationOptions: () => ({
            title: `WebViewPage2`,
        }),
    },
};

/*
//WebViewHomeNavigation
export default createAppContainer(WebViewHomeNavigation);
const WebViewHomeNavigation = createStackNavigator(
    {
        WebViewHomePage: {
            screen: WebViewHomePage,
            navigationOptions: () => ({
                title: `WebView首页`,
            }),
        },
        WebViewPage1: {
            screen: WebViewPage1,
            navigationOptions: () => ({
                title: `WebViewPage1`,
            }),
        },
        WebViewPage2: {
            screen: WebViewPage2,
            navigationOptions: () => ({
                title: `WebViewPage2`,
            }),
        },
    },
    {
        initialRouteName: 'WebViewHomePage'
    }
);
*/




