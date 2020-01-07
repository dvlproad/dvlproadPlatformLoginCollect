//ButtonHomePage.js
import React, { Component } from 'react';
import {
    CJTSNavigationFactory,
    CJTSTableHomeBasePage
} from "cjrn-demo-base";

export default class ButtonHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Button",
                    data: [
                        {
                            title: "RNButtonPage",
                            nextPageName: "RNButtonPage"
                        },
                        {
                            title: "ButtonColorPage",
                            nextPageName: "ButtonColorPage"
                        },
                    ]
                },
            ],
        }
    }
}

//ButtonPages
import RNButtonPage from "./RNButtonPage";
import ButtonColorPage from "./ButtonColorPage";

export const ButtonPages = {
    ButtonHomePage: {
        screen: ButtonHomePage,
        navigationOptions: () => ({
            title: `ButtonHomePage`,
        }),
    },
    RNButtonPage: {
        screen: RNButtonPage,
        navigationOptions: () => ({
            title: `RNButtonPage`,
        }),
    },
    ButtonColorPage: {
        screen: ButtonColorPage,
        navigationOptions: () => ({
            title: `ButtonColorPage`,
        }),
    },
}
