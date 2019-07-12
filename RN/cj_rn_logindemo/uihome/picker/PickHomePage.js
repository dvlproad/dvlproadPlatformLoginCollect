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
                    { title: "ComJSPickersPage", page: "ComJSPickersPage" },
                    { title: "ComJSSingleDatePage1", page: "ComJSSingleDatePage1" },
                    { title: "ComJSDatePickerPage2", page: "ComJSDatePickerPage2" },
                    { title: "ComJSSingleDatePage20", page: "ComJSSingleDatePage20" },
                    { title: "ComJSSingleDatePage21", page: "ComJSSingleDatePage21" },
                    { title: "ComJSSingleDatePage30", page: "ComJSSingleDatePage30" },
                ]
            },
            { key: "RangeDate",
                data: [
                    { title: "OwnNativeActionRangeDateTextPage", page: "OwnNativeActionRangeDateTextPage" },
                    { title: "ComJSRangeDateTextPage", page: "ComJSRangeDateTextPage" },
                ]
            },
            { key: "Image",
                data: [
                    { title: "PickImagesPage", page: "PickImagesPage" },
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

import ComJSPickersPage from "./ComJSPickersPage";
//singleDate-Native
import OwnNativeSingleDatePage from "./OwnNativeSingleDatePage";
import ComNativeSingleDatePage from "./ComNativeSingleDatePage";
//singleDate-JS
import ComJSSingleDatePage1 from "./ComJSSingleDatePage1";
import ComJSSingleDatePage20 from "./ComJSSingleDatePage20";
import ComJSSingleDatePage30 from "./ComJSSingleDatePage30";
//rangeDate
import OwnNativeActionRangeDateTextPage from './OwnNativeActionRangeDateTextPage';

//pickImage
import PickImagesPage from './PickImagesPage';
import ComJSDatePickerPage2 from "./ComJSDatePickerPage2";
import ComJSSingleDatePage21 from "./ComJSSingleDatePage21";
import ComJSRangeDateTextPage from "./ComJSRangeDateTextPage";

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


    ComJSPickersPage: {
        screen: ComJSPickersPage,
        navigationOptions: () => ({
            title: `JS写的统一样式的Pickers`,
        }),
    },

    ComJSSingleDatePage1: {
        screen: ComJSSingleDatePage1,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },
    ComJSDatePickerPage2: {
        screen: ComJSDatePickerPage2,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },

    ComJSSingleDatePage20: {
        screen: ComJSSingleDatePage20,
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
    ComJSRangeDateTextPage: {
        screen: ComJSRangeDateTextPage,
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
};
