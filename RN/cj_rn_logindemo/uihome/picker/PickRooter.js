// PickRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PickHomePage from "./PickHomePage";
//weight
import PickWeightPage from "./PickWeightPage";
//date
import PickSingleDatePage from "./PickSingleDatePage";
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

    PickDateRangePage: {
        screen: PickRangeDatePage,
        navigationOptions: () => ({
            title: `日期选择`,
        }),
    },
    PickDateOnePage: {
        screen: PickSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择`,
        }),
    },


    PickImagesPage: {
        screen: PickImagesPage,
        navigationOptions: () => ({
            title: `多个图片选择`,
        }),
    },
};
