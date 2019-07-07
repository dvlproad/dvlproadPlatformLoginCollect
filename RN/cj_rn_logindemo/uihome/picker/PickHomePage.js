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
                    { title: "ComJSSingleDatePage2", page: "ComJSSingleDatePage2" },
                    { title: "ComJSSingleDatePage3", page: "ComJSSingleDatePage3" },
                ]
            },
            { key: "RangeDate",
                data: [
                    { title: "PickRangeDatePage", page: "PickRangeDatePage" },
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
import ComJSSingleDatePage2 from "./ComJSSingleDatePage2";
import ComJSSingleDatePage3 from "./ComJSSingleDatePage3";
//rangeDate
import PickRangeDatePage from './PickRangeDatePage';

//pickImage
import PickImagesPage from './PickImagesPage';


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
    ComJSSingleDatePage2: {
        screen: ComJSSingleDatePage2,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN)`,
        }),
    },
    ComJSSingleDatePage3: {
        screen: ComJSSingleDatePage3,
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
