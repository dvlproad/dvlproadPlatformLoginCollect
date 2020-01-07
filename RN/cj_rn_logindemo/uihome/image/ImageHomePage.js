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
                    { title: "OtherLoadingShowPage1", page: "OtherLoadingShowPage1" },
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
import OtherLoadingShowPage1, {Title_LoadingImagePage1} from "./OtherLoadingShowPage1";
import ImagesChooseListPage from "./ImagesChooseListPage";
import ImagesChooseListExamplePage from "./ImagesChooseListExamplePage";


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

    OtherLoadingShowPage1: {
        screen: OtherLoadingShowPage1,
        navigationOptions: () => ({
            title: Title_LoadingImagePage1,
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
