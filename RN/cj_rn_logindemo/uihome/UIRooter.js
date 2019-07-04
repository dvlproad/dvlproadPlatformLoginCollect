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
//picker
import { PickPages } from "./picker/PickRooter";
//modal
import {ModalPages} from "./modal/ModalRooter";

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
        ...PickPages,
        ...ModalPages,

        ...WebViewPages,
    },
    {
        initialRouteName: 'PickComSingleDatePage'
    }
);


export default createAppContainer(UIHomeNavigation);




