//PickerAllHomePage.js
import React, { Component } from 'react';
import {
    CJTSNavigationFactory,
    CJTSCollectionHomeBasePage
} from 'cjrn-demo-base';

export default class PickerAllHomePage extends CJTSCollectionHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `各种picker选择`)
    };

    constructor(props) {
        super(props);

        this.state = {
            moduleModels: [
                {
                    title: "react-native-picker",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickersPage",
                },
                {
                    title: "日期选择",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickerDateHomePage",
                },
                {
                    title: "图片选择",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickerImageHomePage",
                },
            ],
        }
    }
}


//PickPages
import PickersPage from "./react-native-pickers/PickersPage";
import PickerImageHomePage, {PickerImageChildPages } from "./image/PickerImageHomePage";
import PickerDateHomePage, {PickerDateChildPages } from "./date/PickerDateHomePage";

export const PickRoutePage = 'PickerAllHomePage';
export const PickerAllHomePages = {
    PickerAllHomePage: {
        screen: PickerAllHomePage,
        navigationOptions: () => ({
            title: `PickerAllHomePage`,
        }),
    },

    // react-native-picker
    PickersPage: {
        screen: PickersPage,
        navigationOptions: () => ({
            title: `JS写的统一样式的Pickers`,
        }),
    },

    // 选择日期
    PickerDateHomePage: {
        screen: PickerDateHomePage,
        navigationOptions: () => ({
            title: `PickerDate首页`,
        }),
    },
    ...PickerDateChildPages,


    // 选择图片
    PickerImageHomePage: {
        screen: PickerImageHomePage,
        navigationOptions: () => ({
            title: `PickerImage首页`,
        }),
    },
    ...PickerImageChildPages,
};
