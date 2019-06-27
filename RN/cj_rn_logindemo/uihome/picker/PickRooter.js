// PickRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PickHomePage from "./PickHomePage";
import PickWeightPage from "./PickWeightPage";
//pickDate
import PickDatePage from './PickDatePage';
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
    PickDatePage: {
        screen: PickDatePage,
        navigationOptions: () => ({
            title: `日期选择`,
        }),
    },
    PickImagesPage: {
        screen: PickImagesPage,
        navigationOptions: () => ({
            title: `多个图片选择`,
        }),
    },
};
