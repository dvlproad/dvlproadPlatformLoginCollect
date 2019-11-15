//PickerImageHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../../commonUI/luckincommonui";

export default class PickerImageHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `选择事项(单选：如体重、多选：如支持的运营商)`)
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
            ]
        }
    }
}


// PickerItemChildPages
import PickWeightPage from "./PickWeightPage";

export const PickerItemChildPages = {
    PickWeightPage: {
        screen: PickWeightPage,
        navigationOptions: () => ({
            title: `体重选择`,
        }),
    },
};
