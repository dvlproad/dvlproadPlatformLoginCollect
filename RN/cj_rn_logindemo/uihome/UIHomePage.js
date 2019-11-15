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
                    { title: "Collection(集合视图)", page: "CollectionHomePage" },
                    { title: "Modal(Modal)", page: "ModalHomePage" },
                    { title: "ToolBar(工具器)", page: "ToolBarHomePage" },
                    { title: "Picker(选择器)", page: "PickerAllHomePage" },
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
import { ButtonPages } from "./button/ButtonHomePage";

//text
import TextHomePage from "./text/TextHomePage";

//image
import { ImagePages, ImageRoutePage } from "./image/ImageHomePage";
//list
import { ListPages, ListRoutePage } from "./list/ListHomePage";
import { CollectionPages, CollectionRoutePage } from "./collection/CollectionHomePage";
//upload
import { UploadPages, UploadRoutePage } from "./upload/UploadHomePage";

//toolbar
import ToolBarHomePage from "./toolbar/ToolBarHomePage";

//picker
import { PickerAllHomePages, PickRoutePage } from "./picker/PickerAllHomePage";
//modal
import { ModalPages, ModalRoutePage } from "./modal/ModalHomePage";

//webview
import { WebViewPages, WebViewRoutePage } from './webview/WebViewHomePage';

//empty
import EmptyNetworkPage from "./empty/EmptyNetworkPage";

export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = PickRoutePage;
// export const UIRoutePage = 'ListHomePage';
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

    TextHomePage: {
        screen: TextHomePage,
        navigationOptions: () => ({
            title: `Text首页`,
        }),
    },

    ...ButtonPages,

    ...ImagePages,
    ...ListPages,
    ...CollectionPages,
    ...UploadPages,

    ToolBarHomePage: {
        screen: ToolBarHomePage,
        navigationOptions: () => ({
            title: `ToolBarHomePage`,
        }),
    },
    ...PickerAllHomePages,
    ...ModalPages,

    ...WebViewPages,
};
