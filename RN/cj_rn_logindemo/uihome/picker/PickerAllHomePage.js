//PickerAllHomePage.js
import React, { Component } from 'react';
import {
    LKNavigationFactory,
    LKDemoCollectionHomeComponent
} from '../../commonUI/luckincommonui';

export default class PickerAllHomePage extends LKDemoCollectionHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `各种picker选择`)
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
                {
                    title: "地区选择",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickerAreaHomePage",
                },
                {
                    title: "事项选择(单选、多选)",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickerItemHomePage",
                },
            ],
        }
    }
}


//PickPages
import PickersPage from "./PickersPage";
import PickerImageHomePage, {PickerImageChildPages } from "./PickerImageHomePage";
import PickerDateHomePage, {PickerDateChildPages } from "./PickerDateHomePage";
import PickerAreaHomePage, {PickerAreaChildPages } from "./PickerAreaHomePage";
import PickerItemHomePage, {PickerItemChildPages } from "./PickerItemHomePage";

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

    // 选择地区
    PickerAreaHomePage: {
        screen: PickerAreaHomePage,
        navigationOptions: () => ({
            title: `PickerArea首页`,
        }),
    },
    ...PickerAreaChildPages,

    // 选择事项(单选：如体重、多选：如支持的运营商)
    PickerItemHomePage: {
        screen: PickerItemHomePage,
        navigationOptions: () => ({
            title: `PickerItem首页`,
        }),
    },
    ...PickerItemChildPages,
};
