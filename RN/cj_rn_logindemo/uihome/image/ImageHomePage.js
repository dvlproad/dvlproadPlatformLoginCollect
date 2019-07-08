//ImageHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export default class ImageHomePage extends Component {

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
            { key: "image",
                data: [
                    { title: "HelloImagePage", page: "HelloImagePage" },
                    { title: "LoadingImagePage", page: "LoadingImagePage" },
                    { title: "ActionLoadingImagePage", page: "ActionLoadingImagePage" },
                ]
            },
            { key: "images",
                data: [
                    { title: "ImagesChooseListExamplePage", page: "ImagesChooseListExamplePage" },
                    { title: "ImagesChooseListPage", page: "ImagesChooseListPage" },
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

//ImagePages
import HelloImagePage from "./HelloImagePage";
import LoadingImagePage from "./LoadingImagePage";
import ActionLoadingImagePage from './ActionLoadingImagePage';
import ImagesChooseListPage from "./ImagesChooseListPage";
import ImagesChooseListExamplePage from "./ImagesChooseListExamplePage";

export const ImageRoutePage = 'ImageHomePage';
export const ImagePages = {
    ImageHomePage: {
        screen: ImageHomePage,
        navigationOptions: () => ({
            title: `ImageHomePage`,
        }),
    },

    HelloImagePage: {
        screen: HelloImagePage,
        navigationOptions: () => ({
            title: `Image的基本使用`,
        }),
    },

    LoadingImagePage: {
        screen: LoadingImagePage,
        navigationOptions: () => ({
            title: `Image加载首页`,
        }),
    },
    ActionLoadingImagePage: {
        screen: ActionLoadingImagePage,
        navigationOptions: () => ({
            title: `单个图片选择`,
        }),
    },

    ImagesChooseListExamplePage: {
        screen: ImagesChooseListExamplePage,
        navigationOptions: () => ({
            title: `ImagesChooseListExamplePage`,
        }),
    },
    ImagesChooseListPage: {
        screen: ImagesChooseListPage,
        navigationOptions: () => ({
            title: `ImagesChooseListPage`,
        }),
    },
}
