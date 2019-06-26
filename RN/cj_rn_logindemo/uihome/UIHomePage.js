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
            { key: "Base",
                data: [
                    { title: "Layout", page: "LayoutHome" },
                    { title: "Button", page: "ButtonHome" },
                    { title: "Navigation", page: "NavigationHome" },
                    { title: "Text", page: "TextHome" },
                    { title: "ImageHomePage", page: "ImageHomePage" },
                    ]
            },
            { key: "List",
                data: [
                    { title: "ListHomePage", page: "ListHomePage" },
                ]
            },
            { key: "Loading",
                data: [
                    { title: "ActivityIndicatorPage", page: "ActivityIndicatorPage" },
                    { title: "HUDHomePage", page: "HUDHomePage" },
                ]
            },
            { key: "Pick",
                data: [
                    { title: "PickDatePage", page: "PickDatePage" },
                    { title: "PickImagesPage", page: "PickImagesPage" },
                    ]
            },
            { key: "WebView",
                data: [
                    { title: "WebViewHomePage", page: "WebViewHomePage" },
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
