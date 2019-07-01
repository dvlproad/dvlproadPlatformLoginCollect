//UtilHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";
import WebViewJSBridgePage from "./WebViewJSBridgePage";


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
