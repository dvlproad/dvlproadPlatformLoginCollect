//ModalHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";


export default class ModalHomePage extends Component {

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
            { key: "Modal",
                data: [
                    { title: "EasyModalPage", page: "EasyModalPage" },
                ]
            },
            { key: "Loading",
                data: [
                    { title: "ActivityIndicatorPage", page: "ActivityIndicatorPage" },
                    { title: "HUDHomePage", page: "HUDHomePage" },
                ]
            },
            { key: "ActionSheet",
                data: [
                    { title: "ActionSheetPage", page: "ActionSheetPage" },
                    { title: "PhotoCameraSheetPage", page: "PhotoCameraSheetPage" },
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


//ModalPages
import EasyModalPage from './modal/EasyModalPage';

import ActivityIndicatorPage from "./hud/ActivityIndicatorPage";
import HUDHomePage from "./hud/HUDHomePage";

import PhotoCameraSheetPage from "./actionSheet/PhotoCameraSheetPage";
import ActionSheetPage from "./actionSheet/ActionSheetPage";

export const ModalRoutePage = ModalHomePage;
export const ModalPages = {
    ModalHomePage: {
        screen: ModalHomePage,
        navigationOptions: () => ({
            title: `ModalHomePage`,
        }),
    },

    //modal
    EasyModalPage: {
        screen: EasyModalPage,
        navigationOptions: () => ({
            title: `EasyModalPage`,
        }),
    },

    //hud
    ActivityIndicatorPage: {
        screen: ActivityIndicatorPage,
        navigationOptions: () => ({
            title: `ActivityIndicatorPage`,
        }),
    },
    HUDHomePage: {
        screen: HUDHomePage,
        navigationOptions: () => ({
            title: `HUDHomePage`,
        }),
    },

    //actionSheet
    RNActionSheetPage: {
        screen: ActionSheetPage,
        navigationOptions: () => ({
            title: `RNActionSheetPage`,
        }),
    },
    ActionSheetPage: {
        screen: ActionSheetPage,
        navigationOptions: () => ({
            title: `ActionSheetPage`,
        }),
    },
    PhotoCameraSheetPage: {
        screen: PhotoCameraSheetPage,
        navigationOptions: () => ({
            title: `PhotoCameraSheetPage`,
        }),
    },

};

