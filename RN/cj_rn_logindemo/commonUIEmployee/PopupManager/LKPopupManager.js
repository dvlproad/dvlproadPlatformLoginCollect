
import React, { Component } from 'react';
import {Modal, FlatList, Dimensions, Platform, View} from 'react-native';
import PropTypes from 'prop-types';

// ActionSheet
import { CJActionSheet as LKActionSheet } from "../../CJBaseUIKit/ActionSheet/CJActionSheet";
import { CJMultipleChooseActionSheet as LKMultipleChooseActionSheet } from "../../CJBaseUIKit/ActionSheet/CJMultipleChooseActionSheet";


export var LKPopupType = {
    ActionSheet: 0,                 /** 单选的ActionSheet */
    MultipleChooseActionSheet: 1,   /** 多选的ActionSheet */
};

export class LKPopupManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingComponent: null,
            confirmHandle: (selectedResultString)=>{},
        }
    }


    /**
     * 显示多个选择项的Sheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle及'点击该标题的回调'actionBlock)
     */
    showWithItems(itemModels) {
        this.singleActionSheet.showWithItems(itemModels);
    }

    /**
     * 显示多个选择项的Sheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle及'点击该标题的回调'actionBlock)
     */
    showMutipleChooseWithItems(itemModels, confirmHandle) {
        this.state.confirmHandle = confirmHandle;
        this.multipleActionSheet.showWithItems(itemModels);
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
                                                 if (this.state.confirmHandle) {
                                                     this.state.confirmHandle(selectedResultString);
                                                 }
                                             }}
                />
            </View>
        )
    }
}
