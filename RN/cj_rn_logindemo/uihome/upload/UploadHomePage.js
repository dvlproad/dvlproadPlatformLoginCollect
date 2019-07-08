//UploadHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export default class UploadHomePage extends Component {

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
                    { title: "UploadImagePage", page: "UploadImagePage" },
                ]
            },
            { key: "images",
                data: [
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

//UploadPages
import UploadImagePage from "../upload/UploadImagePage";
import UploadImagesPage from "../upload/UploadImagesPage";

export const UploadRoutePage = 'UploadHomePage';
export const UploadPages = {
    UploadHomePage: {
        screen: UploadHomePage,
        navigationOptions: () => ({
            title: `UploadHomePage`,
        }),
    },

    UploadImagePage: {
        screen: UploadImagePage,
        navigationOptions: () => ({
            title: `UploadImagePage`,
        }),
    },

    UploadImagesPage: {
        screen: UploadImagesPage,
        navigationOptions: () => ({
            title: `UploadImagesPage`,
        }),
    },
}
