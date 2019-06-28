// ModalRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ModalHomePage from "./ModalHomePage";


import ActivityIndicatorPage from "./hud/ActivityIndicatorPage";
import HUDHomePage from "./hud/HUDHomePage";

import EasyModalPage from './modal/EasyModalPage';

import LKActionSheetPage from "./actionSheet/LKActionSheetPage";
import RNActionSheetPage from "./actionSheet/RNActionSheetPage";

//ModalPages
export const ModalPages = {
    ModalHomePage: {
        screen: ModalHomePage,
        navigationOptions: () => ({
            title: `ModalHomePage`,
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

    //modal
    EasyModalPage: {
        screen: EasyModalPage,
        navigationOptions: () => ({
            title: `EasyModalPage`,
        }),
    },

    //actionSheet
    RNActionSheetPage: {
        screen: RNActionSheetPage,
        navigationOptions: () => ({
            title: `RNActionSheetPage`,
        }),
    },
    LKActionSheetPage: {
        screen: LKActionSheetPage,
        navigationOptions: () => ({
            title: `LKActionSheetPage`,
        }),
    },

};
