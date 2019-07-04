// UIRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//UIHome
import UIHomePage from "./UIHomePage";


//layout
import LayoutHomePage from "./layout/LayoutHomePage";

//navigation
import { NavigationPages } from "./navigation/NavigationHomePage";

//button
import {ButtonPages} from "./button/ButtonHomePage";

//text
import TextHomePage from "./text/TextHomePage";

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

//empty
import EmptyNetworkPage from "./empty/EmptyNetworkPage";





//UIHomeNavigation
const UIHomeNavigation = createStackNavigator(
    {
        UIHomePage: {
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

        TextHome: {
            screen: TextHomePage,
            navigationOptions: () => ({
                title: `Text首页`,
            }),
        },

        ...ButtonPages,

        ...ImagePages,
        ...ListPages,
        ...PickPages,
        ...ModalPages,

        ...WebViewPages,
    },
    {
        initialRouteName: 'ButtonColorPage'
    }
);


export default createAppContainer(UIHomeNavigation);




