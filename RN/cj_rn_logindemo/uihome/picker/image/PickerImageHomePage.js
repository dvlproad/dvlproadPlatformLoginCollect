//PickerImageHomePage.js
import React, { Component } from 'react';

import {
    CJTSNavigationFactory,
    CJTSTableHomeBasePage,
    CJTSCollectionHomeBasePage,
} from "cjrn-demo-base";

export default class PickerImageHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `选择图片`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Image",
                    data: [
                        {title: "PickImagesPage", nextPageName: "PickImagesPage"},
                    ]
                },
            ]
        }
    }
}


// PickerImageChildPages
import PickImagesPage from './PickImagesPage';

export const PickerImageChildPages = {
    PickImagesPage: {
        screen: PickImagesPage,
        navigationOptions: () => ({
            title: `多个图片选择`,
        }),
    },
};
