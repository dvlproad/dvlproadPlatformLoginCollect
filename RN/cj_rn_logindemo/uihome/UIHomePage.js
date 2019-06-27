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
                    { title: "Layout", page: "LayoutHome" },
                    { title: "Navigation", page: "NavigationHome" },
                    ]
            },
            { key: "组件",
                data: [
                    { title: "Button", page: "ButtonHome" },
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
