/**
 * LKDemoCollectionHomeComponent.js
 *
 * @Description: 用于测试各种功能的集合视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-04 14:18:44
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import { Alert, Dimensions } from 'react-native';
import PropTypes from "prop-types";
import {
    CJCollectionView
} from '../../CJBaseUIKit/CJBaseUIKit';
import LuckinRoute from "../Navigation/LuckinRoute";


export default class LKDemoCollectionHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleModels: [],
        };
    }

    _execModuleModel= (index)=>{
        let moduleModel = this.state.moduleModels[index];

        if (moduleModel.clickButtonHandle) {
            moduleModel.clickButtonHandle(index, moduleModel);
        } else if (moduleModel.nextPageName && moduleModel.nextPageName.length > 0) {
            // this.props.navigation.navigate(moduleModel.nextPageName);
            LuckinRoute.push(this.props.navigation, moduleModel.nextPageName, {});
        } else {
            Alert.alert("提示：请至少设置 moduleModel.clickButtonHandle 或 moduleModel.nextPageName");
        }
    }



    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJCollectionView
                // style={{paddingHorizontal: 40}}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:15, left:15, bottom:15, right:15}}
                cellWidthFromPerRowMaxShowCount={2} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={165/165}
                minimumInteritemSpacing={15}
                minimumLineSpacing={10}
                dataModels={this.state.moduleModels}
                clickButtonHandle={this._execModuleModel}
            />
        );
    }
}
