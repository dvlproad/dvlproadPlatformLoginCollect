//PickHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../commonUI/luckincommonui";

export default class PickHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Weight",
                    data: [
                        {title: "PickWeightPage", nextPageName: "PickWeightPage"},
                    ]
                },
                {
                    key: "SingleDate--Native",
                    data: [
                        {title: "OwnNativeSingleDatePage", nextPageName: "OwnNativeSingleDatePage"},
                        {title: "ComNativeSingleDatePage", nextPageName: "ComNativeSingleDatePage"},
                    ]
                },
                {
                    key: "SingleDate--JS",
                    data: [
                        {title: "PickersPage", nextPageName: "PickersPage"},
                        {title: "DatePickerPage_00ComJS", nextPageName: "DatePickerPage_00ComJS"},
                        {title: "DatePickerPage_01ComJS", nextPageName: "DatePickerPage_01ComJS"},
                        {title: "ComJSDatePickerPage2", nextPageName: "ComJSDatePickerPage2"},
                        {title: "各种时间样式的日期SingleDateTextPage", nextPageName: "SingleDateTextPage"},
                        {title: "ComJSSingleDatePage21", nextPageName: "ComJSSingleDatePage21"},
                        {title: "ComJSSingleDatePage30", nextPageName: "ComJSSingleDatePage30"},
                    ]
                },
                {
                    key: "RangeDate",
                    data: [
                        {title: "OwnNativeActionRangeDateTextPage", nextPageName: "OwnNativeActionRangeDateTextPage"},
                        {title: "RangeDateTextPage", nextPageName: "RangeDateTextPage"},
                    ]
                },
                {
                    key: "Image",
                    data: [
                        {title: "PickImagesPage", nextPageName: "PickImagesPage"},
                        {title: "ImageHomePage", nextPageName: "ImageHomePage"},
                    ]
                },
                {
                    key: "Area",
                    data: [
                        {title: "AreaPickerPage", nextPageName: "AreaPickerPage"},
                    ]
                }
            ]
        }
    }
}


//PickPages
//weight
import PickWeightPage from "./PickWeightPage";

import PickersPage from "./PickersPage";
//singleDate-Native
import OwnNativeSingleDatePage from "./OwnNativeSingleDatePage";
import ComNativeSingleDatePage from "./ComNativeSingleDatePage";
//singleDate-JS
import DatePickerPage_00ComJS from "./DatePickerPage_00ComJS";
import DatePickerPage_01ComJS from "./DatePickerPage_01ComJS";
import SingleDateTextPage from "./SingleDateTextPage";
import ComJSSingleDatePage30 from "./ComJSSingleDatePage30";
//rangeDate
import OwnNativeActionRangeDateTextPage from './OwnNativeActionRangeDateTextPage';

//pickImage
import PickImagesPage from './PickImagesPage';
import ImageHomePage from '../image/ImageHomePage';
import ComJSSingleDatePage21 from "./ComJSSingleDatePage21";
import RangeDateTextPage from "./RangeDateTextPage";

// pickArea
import AreaPickerPage from "./AreaPickerPage";

export const PickRoutePage = 'PickHomePage';
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

    OwnNativeSingleDatePage: {
        screen: OwnNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(有区别平台)`,
        }),
    },
    ComNativeSingleDatePage: {
        screen: ComNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式原生)`,
        }),
    },


    PickersPage: {
        screen: PickersPage,
        navigationOptions: () => ({
            title: `JS写的统一样式的Pickers`,
        }),
    },

    DatePickerPage_00ComJS: {
        screen: DatePickerPage_00ComJS,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN_未封装)`,
        }),
    },
    DatePickerPage_01ComJS: {
        screen: DatePickerPage_01ComJS,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN_已封装)`,
        }),
    },

    SingleDateTextPage: {
        screen: SingleDateTextPage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },
    ComJSSingleDatePage21: {
        screen: ComJSSingleDatePage21,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },

    ComJSSingleDatePage30: {
        screen: ComJSSingleDatePage30,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },

    OwnNativeActionRangeDateTextPage: {
        screen: OwnNativeActionRangeDateTextPage,
        navigationOptions: () => ({
            title: `范围日期选择(原生平台风格)`,
        }),
    },
    RangeDateTextPage: {
        screen: RangeDateTextPage,
        navigationOptions: () => ({
            title: `范围日期选择(RN统一风格)`,
        }),
    },


    PickImagesPage: {
        screen: PickImagesPage,
        navigationOptions: () => ({
            title: `多个图片选择`,
        }),
    },

    ImageHomePage: {
        screen: ImageHomePage,
        navigationOptions: () => ({
            title: `图片选择相关`,
        }),
    },

    AreaPickerPage: {
        screen: AreaPickerPage,
        navigationOptions: () => ({
            title: `地区选择相关`,
        }),
    },
};
