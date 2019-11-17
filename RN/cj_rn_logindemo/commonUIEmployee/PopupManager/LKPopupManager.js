
import React, { Component } from 'react';
import {Modal, FlatList, Dimensions, Platform, View} from 'react-native';
import PropTypes from 'prop-types';

// ActionSheet
import { CJActionSheet as LKActionSheet } from "../../CJBaseUIKit/ActionSheet/CJActionSheet";
import { CJMultipleChooseActionSheet as LKMultipleChooseActionSheet } from "../../CJBaseUIKit/ActionSheet/CJMultipleChooseActionSheet";
import {LKToast} from "../../lkcui/lkcui";

// import {
//     // ActionSheet
//     LKActionSheet,
//     LKMultipleChooseActionSheet,
// } from "../commonUIEmployee/commonUIEmployee";


export var LKPopupType = {
    ActionSheet: 0,                 /** 单选的ActionSheet */
    MultipleChooseActionSheet: 1,   /** 多选的ActionSheet */
};

export class LKPopupManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingComponent: null,
        }
    }

    /**
     * 显示多个选择项的Sheet
     *
     * @param popupType     弹窗类型
     * @param itemModels    数据模型数组(包含'标题'mainTitle及'点击该标题的回调'actionBlock)
     */
    showWithItems(popupType, itemModels) {
        if (popupType == LKPopupType.ActionSheet) {
            this.singleActionSheet.showWithItems(itemModels);
        } else if (popupType == LKPopupType.MultipleChooseActionSheet) {
            this.multipleActionSheet.showWithItems(itemModels);
        }
    }


    render() {
        return (
            <View>
                <LKActionSheet ref={ref => this.singleActionSheet = ref} />
                <LKMultipleChooseActionSheet ref={ref => this.multipleActionSheet = ref}
                                             headerTitle={'4G网络运营商'}
                                             confirmHandle={(selectedItemModels)=>{
                                                 let selectedItemTitles = [];
                                                 for (let i = 0; i < selectedItemModels.length; i++) {
                                                     let selectedItemModel = selectedItemModels[i];
                                                     selectedItemTitles.push(selectedItemModel.mainTitle);
                                                 }
                                                 let selectedResultString = selectedItemTitles.join('/');
                                                 LKToast.showMessage(selectedResultString);
                                             }}
                />
            </View>
        )
    }
}
