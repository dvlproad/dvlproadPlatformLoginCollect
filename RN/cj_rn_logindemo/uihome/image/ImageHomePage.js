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
                    { title: "LoadingImagePage", page: "LoadingImagePage" },
                    { title: "ActionImagePage", page: "ActionImagePage" },
                    { title: "UploadImagePage", page: "UploadImagePage" },
                    { title: "UploadImagesPage", page: "UploadImagesPage" },
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
import LoadingImagePage from "./LoadingImagePage";
import ActionImagePage from './ActionImagePage';
import UploadImagePage from "./UploadImagePage";
import UploadImagesPage from "./UploadImagesPage";

export const ImagePages = {
    ImageHomePage: {
        screen: ImageHomePage,
        navigationOptions: () => ({
            title: `ImageHomePage`,
        }),
    },
    LoadingImagePage: {
        screen: LoadingImagePage,
        navigationOptions: () => ({
            title: `Image加载首页`,
        }),
    },
    ActionImagePage: {
        screen: ActionImagePage,
        navigationOptions: () => ({
            title: `单个图片选择`,
        }),
    },
    UploadImagePage: {
        screen: UploadImagePage,
        navigationOptions: () => ({
            title: `Image上传首页`,
        }),
    },
    UploadImagesPage: {
        screen: UploadImagesPage,
        navigationOptions: () => ({
            title: `Image数组的上传首页`,
        }),
    },
}
