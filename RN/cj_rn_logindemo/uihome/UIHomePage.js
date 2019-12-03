//UIHomePage.js
import React, { Component } from 'react';
import {
    LKDemoTableHomeComponent
} from "../commonUI/luckincommonui";

export default class UIHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "布局/跳转",
                    data: [
                        { title: "LayoutHomePage", nextPageName: "LayoutHomePage" },
                        { title: "Navigation", nextPageName: "NavigationHome" },
                    ]
                },
                { key: "组件",
                    data: [
                        { title: "Button", nextPageName: "ButtonHomePage" },
                        { title: "Text", nextPageName: "TextHomePage" },
                        { title: "Image", nextPageName: "ImageHomePage" },
                        { title: "Empty", nextPageName: "EmptyNetworkPage" },
                        { title: "WebView", nextPageName: "WebViewHomePage" },
                    ]
                },
                { key: "弹窗/蒙层",
                    data: [
                        { title: "Modal(弹窗/蒙层)", nextPageName: "ModalHomePage" },
                        { title: "Picker(选择器)", nextPageName: "PickerAllHomePage" },
                    ]
                },
                { key: "进阶",
                    data: [
                        { title: "Table(列表视图)", nextPageName: "ListHomePage" },
                        { title: "Collection(集合视图)", nextPageName: "CollectionHomePage" },
                    ]
                },
            ],
        }
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

//picker
import { PickerAllHomePages, PickRoutePage } from "./picker/PickerAllHomePage";

//modal
import { ModalPages, ModalRoutePage } from "./modal/ModalHomePage";

//webview
import { WebViewPages, WebViewRoutePage } from './webview/WebViewHomePage';

//empty
import EmptyNetworkPage from "./empty/EmptyNetworkPage";

// export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = 'DescriptionsPage';
export const UIRoutePage = 'PickerDateHomePage';
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

    ...PickerAllHomePages,
    ...ModalPages,

    ...WebViewPages,
};
