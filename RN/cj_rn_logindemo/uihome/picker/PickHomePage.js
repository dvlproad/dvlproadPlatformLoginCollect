//UtilHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";


export default class PickHomePage extends Component {

    constructor(props) {
        super(props);
    }

    _onPressButton = (nextPageName) => {
        console.log(nextPageName);

        if (nextPageName) {
            this.props.navigation.navigate(nextPageName)
        } else  {
            //nextPageName = "Button";
            Alert.alert(nextPageName)
        }
    }


    render() {
        let sections = [
            { key: "Weight",
                data: [
                    { title: "PickWeightPage", page: "PickWeightPage" },
                ]
            },
            { key: "SingleDate--Native",
                data: [
                    { title: "OwnNativeSingleDatePage", page: "OwnNativeSingleDatePage" },
                    { title: "ComNativeSingleDatePage", page: "ComNativeSingleDatePage" },
                ]
            },
            { key: "SingleDate--JS",
                data: [
                    { title: "PickersPage", page: "PickersPage" },
                    { title: "DatePickerPage_00ComJS", page: "DatePickerPage_00ComJS" },
                    { title: "DatePickerPage_01ComJS", page: "DatePickerPage_01ComJS" },
                    { title: "ComJSDatePickerPage2", page: "ComJSDatePickerPage2" },
                    { title: "各种时间样式的日期SingleDateTextPage", page: "SingleDateTextPage" },
                    { title: "ComJSSingleDatePage21", page: "ComJSSingleDatePage21" },
                    { title: "ComJSSingleDatePage30", page: "ComJSSingleDatePage30" },
                ]
            },
            { key: "RangeDate",
                data: [
                    { title: "OwnNativeActionRangeDateTextPage", page: "OwnNativeActionRangeDateTextPage" },
                    { title: "RangeDateTextPage", page: "RangeDateTextPage" },
                ]
            },
            { key: "Image",
                data: [
                    { title: "PickImagesPage", page: "PickImagesPage" },
                    { title: "ImageHomePage", page: "ImageHomePage" },
                ]
            },
        ];

        return (
            <View style={{ flex: 1 }}>
                <HomeSectionList
                    sections={sections}
                    onPress={this._onPressButton}
                />
            </View>
        );
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
};
