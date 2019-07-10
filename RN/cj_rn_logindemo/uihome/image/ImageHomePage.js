//ImageHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export const Title_ImageHomePage = `ImageHomePage(图片首页)`;
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
                    { title: "LoadingImagePage1", page: "LoadingImagePage1" },
                    { title: "LoadingImagePage2", page: "LoadingImagePage2" },
                    { title: "LoadingImagePage3", page: "LoadingImagePage3" },
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
import LoadingImagePage1, {Title_LoadingImagePage1} from "./LoadingImagePage1";
import LoadingImagePage2, {Title_LoadingImagePage2} from "./LoadingImagePage2";
import ActionLoadingImagePage from './ActionLoadingImagePage';
import ImagesChooseListPage from "./ImagesChooseListPage";
import ImagesChooseListExamplePage from "./ImagesChooseListExamplePage";
import LoadingImagePage3, {Title_LoadingImagePage3} from "./LoadingImagePage3";

export const ImageRoutePage = 'ImageHomePage';
export const ImagePages = {
    ImageHomePage: {
        screen: ImageHomePage,
        navigationOptions: () => ({
            title: Title_ImageHomePage,
        }),
    },

    HelloImagePage: {
        screen: HelloImagePage,
        navigationOptions: () => ({
            title: `Image的基本使用`,
        }),
    },

    LoadingImagePage1: {
        screen: LoadingImagePage1,
        navigationOptions: () => ({
            title: Title_LoadingImagePage1,
        }),
    },
    LoadingImagePage2: {
        screen: LoadingImagePage2,
        navigationOptions: () => ({
            title: Title_LoadingImagePage2,
        }),
    },
    LoadingImagePage3: {
        screen: LoadingImagePage3,
        navigationOptions: () => ({
            title: Title_LoadingImagePage3,
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
