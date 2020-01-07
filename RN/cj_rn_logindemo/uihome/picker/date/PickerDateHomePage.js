//PickerDateHomePage.js
import React, { Component } from 'react';

import {
    CJTSNavigationFactory,
    CJTSTableHomeBasePage
} from "cjrn-demo-base";

export default class PickerDateHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `选择日期`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
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
                        {title: "各种时间样式的日期SingleDateTextPage", nextPageName: "SingleDateTextPage"},
                    ]
                },
                {
                    key: "RangeDate",
                    data: [
                        {title: "OwnNativeActionRangeDateTextPage", nextPageName: "OwnNativeActionRangeDateTextPage"},
                        {title: "RangeDateTextPage", nextPageName: "RangeDateTextPage"},
                    ]
                },
            ]
        }
    }
}


// PickerDateChildPages
//singleDate-Native
import OwnNativeSingleDatePage from "./OwnNativeSingleDatePage";
import ComNativeSingleDatePage from "./ComNativeSingleDatePage";
//singleDate-JS
import SingleDateTextPage from "./SingleDateTextPage";
//rangeDate
import OwnNativeActionRangeDateTextPage from './OwnNativeActionRangeDateTextPage';

import RangeDateTextPage from "./RangeDateTextPage";


export const PickerDateChildPages = {
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

    SingleDateTextPage: {
        screen: SingleDateTextPage,
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
};
