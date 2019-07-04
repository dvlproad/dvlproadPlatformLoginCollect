// PickRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PickHomePage from "./PickHomePage";
//weight
import PickWeightPage from "./PickWeightPage";
//date
import PickOwnSingleDatePage from "./PickOwnSingleDatePage";
import PickComSingleDatePage from "./PickComSingleDatePage";
import PickRangeDatePage from './PickRangeDatePage';
//pickImage
import PickImagesPage from './PickImagesPage';



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
        screen: PickOwnSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(有区别平台)`,
        }),
    },
    PickComSingleDatePage: {
        screen: PickComSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式)`,
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
