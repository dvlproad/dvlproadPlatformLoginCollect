// PickRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PickHomePage from "./PickHomePage";
//weight
import PickWeightPage from "./PickWeightPage";
//date
import OwnNativeSingleDatePage from "./OwnNativeSingleDatePage";
import ComNativeSingleDatePage from "./ComNativeSingleDatePage";
import PickRangeDatePage from './PickRangeDatePage';
//pickImage
import PickImagesPage from './PickImagesPage';
import ComJSSingleDatePage from "./ComJSSingleDatePage";



//PickPages
export const PickPages = {
    PickHomePage: {
        screen: PickHomePage,
        navigationOptions: () => ({
            title: `PickHomePage`,
        }),
    },

    PickWeightPage: {
        screen: PickWeightPage,
        navigationOptions: () => ({
            title: `体重选择`,
        }),
    },

    PickOwnSingleDatePage: {
        screen: OwnNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(有区别平台)`,
        }),
    },
    PickComSingleDatePage: {
        screen: ComNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式原生)`,
        }),
    },
    PickComRNSingleDatePage: {
        screen: ComJSSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },

    PickRangeDatePage: {
        screen: PickRangeDatePage,
        navigationOptions: () => ({
            title: `范围日期选择`,
        }),
    },


    PickImagesPage: {
        screen: PickImagesPage,
        navigationOptions: () => ({
            title: `多个图片选择`,
        }),
    },
};
