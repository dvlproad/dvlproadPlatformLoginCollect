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
            { key: "Date",
                data: [
                    { title: "OwnNativeSingleDatePage", page: "OwnNativeSingleDatePage" },
                    { title: "ComNativeSingleDatePage", page: "ComNativeSingleDatePage" },
                    { title: "ComJSSingleDatePage", page: "ComJSSingleDatePage" },
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
//date
import OwnNativeSingleDatePage from "./OwnNativeSingleDatePage";
import ComNativeSingleDatePage from "./ComNativeSingleDatePage";
import PickRangeDatePage from './PickRangeDatePage';
//pickImage
import PickImagesPage from './PickImagesPage';
import ComJSSingleDatePage from "./ComJSSingleDatePage";


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
        screen: OwnNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(有区别平台)`,
        }),
    },
    PickComSingleDatePage: {
        screen: ComNativeSingleDatePage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式原生)`,
        }),
    },
    ComJSSingleDatePage: {
        screen: ComJSSingleDatePage,
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
