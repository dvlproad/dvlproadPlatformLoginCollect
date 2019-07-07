//UIHomePage.js
import React, { Component } from 'react';
import {View, Text, Alert} from 'react-native';
import HomeSectionList from "../commonUI/list/HomeSectionList";



export default class UIHomePage extends Component {

    constructor(props) {
        super(props);
    }

    _onPressButton = (nextPageName) => {
        console.log(nextPageName);

        if (nextPageName) {
            this.props.navigation.navigate(nextPageName)
        } else  {
            //nextPageName = "Button";
            Alert.alert(nextPageName)
        }
    }

    render() {
        let sections = [
            { key: "布局/跳转",
                data: [
                    { title: "LayoutHomePage", page: "LayoutHomePage" },
                    { title: "Navigation", page: "NavigationHome" },
                    ]
            },
            { key: "组件",
                data: [
                    { title: "Button", page: "ButtonHomePage" },
                    { title: "Text", page: "TextHome" },
                    { title: "Image", page: "ImageHomePage" },
                    { title: "Empty", page: "EmptyNetworkPage" },
                    { title: "WebView", page: "WebViewHomePage" },
                ]
            },
            { key: "进阶",
                data: [
                    { title: "List(列表)", page: "ListHomePage" },
                    { title: "Modal(Modal)", page: "ModalHomePage" },
                    { title: "Picker(选择器)", page: "PickHomePage" },
                ]
            },
        ];

        return (
            <View style={{ flex: 1 }}>
                <HomeSectionList
                    sections={sections}
                    onPress={this._onPressButton}
                />
            </View>
        );
    }
}



//UIPages

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
import { ListPages } from "./list/ListHomePage";
//picker
import { PickPages } from "./picker/PickHomePage";
//modal
import {ModalPages} from "./modal/ModalHomePage";

//webview
import { WebViewPages } from './webview/WebViewHomePage';

//empty
import EmptyNetworkPage from "./empty/EmptyNetworkPage";

export const UIRoutePage = 'UIHomePage';
export const UIPages = {
    UIHomePage: {
        screen: UIHomePage,
        navigationOptions: () => ({
            title: `UI首页`,
        }),
    },
    LayoutHomePage: {
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
};