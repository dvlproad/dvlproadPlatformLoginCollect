// ModalRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ModalHomePage from "./ModalHomePage";


import ActivityIndicatorPage from "./hud/ActivityIndicatorPage";
import HUDHomePage from "./hud/HUDHomePage";

import EasyModalPage from './modal/EasyModalPage';

import LKPhotoCameraSheetPage from "./actionSheet/LKPhotoCameraSheetPage";
import LKActionSheetPage from "./actionSheet/LKActionSheetPage";

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
        screen: LKActionSheetPage,
        navigationOptions: () => ({
            title: `RNActionSheetPage`,
        }),
    },
    LKActionSheetPage: {
        screen: LKPhotoCameraSheetPage,
        navigationOptions: () => ({
            title: `LKActionSheetPage`,
        }),
    },

};
