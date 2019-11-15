//PickHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../../commonUI/luckincommonui";

export default class PickerAreaHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
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


// PickerAreaChildPages
import AreaPickerPage from "./AreaPickerPage";

export const PickerAreaChildPages = {
    AreaPickerPage: {
        screen: AreaPickerPage,
        navigationOptions: () => ({
            title: `地区选择相关`,
        }),
    },
};
