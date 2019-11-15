//PickerImageHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../../commonUI/luckincommonui";

export default class PickerImageHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `选择图片`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Image",
                    data: [
                        {title: "PickImagesPage", nextPageName: "PickImagesPage"},
                        {title: "ImageHomePage", nextPageName: "ImageHomePage"},
                    ]
                },
            ]
        }
    }
}


// PickerImageChildPages
import PickImagesPage from './PickImagesPage';
import ImageHomePage from '../image/ImageHomePage';

export const PickerImageChildPages = {
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
