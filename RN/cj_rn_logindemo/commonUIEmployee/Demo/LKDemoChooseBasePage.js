/**
 * LKDemoChooseBasePage.js
 *
 * @Description: 用于测试各种选择的列表视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-26 09:48:50
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import { View, Alert, Dimensions } from 'react-native';
import {
    CJSectionTableView
} from '../../CJBaseUIKit/CJBaseUIKit';


export default class LKDemoChooseBasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionDataModels: [],
        };
    }

    _execModuleModel= (moduleModel)=>{
        if (moduleModel.clickButtonHandle) {
            moduleModel.clickButtonHandle(moduleModel);
        } else {
            Alert.alert("提示：请至少设置 moduleModel.clickButtonHandle 或 moduleModel.nextPageName");
        }
    }

    renderChooseComponents() {
        return null;
    }


    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <View>
                <CJSectionTableView
                    sectionDataModels={this.state.sectionDataModels}
                    clickModuleModel={this._execModuleModel}
                />

                {this.renderChooseComponents()}
            </View>
        );
    }
}
