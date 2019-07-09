//UtilHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";


export default class WebViewHomePage extends Component {

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
            { key: "WebView",
                data: [
                    { title: "WebViewPage1", page: "WebViewPage1" },
                    { title: "WebViewPage2", page: "WebViewPage2" },
                    { title: "WebViewJSBridgePage", page: "WebViewJSBridgePage" },
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

//WebViewPages

import WebViewPage1 from "./WebViewPage1";
import WebViewPage2 from "./WebViewPage2";
import WebViewJSBridgePage from "./WebViewJSBridgePage";


export const WebViewRoutePage = 'WebViewHomePage';
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
    WebViewJSBridgePage: {
        screen: WebViewJSBridgePage,
        navigationOptions: () => ({
            title: `WebViewJSBridgePage`,
        }),
    },
};