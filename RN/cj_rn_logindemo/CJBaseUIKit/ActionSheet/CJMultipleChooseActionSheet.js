/**
 * CJMultipleChooseActionSheet.js
 *
 * @Description: 【多选】的ActionSheet
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-18 01:07:58
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

import React, { Component } from 'react';
import { Modal, FlatList, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CJMultipleChooseActionSheetComponent  from "./CJMultipleChooseActionSheetComponent";
import CJMultipleChooseActionSheetTableView from './CJMultipleChooseActionSheetTableView';

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export class CJMultipleChooseActionSheet extends Component {
    static propTypes = {
        headerTitle: PropTypes.string, //头部
        confirmHandle: PropTypes.func,
    };

    static defaultProps = {
        headerTitle: '',
        confirmHandle: (selectedItemModels)=>{},
    };

    constructor(props) {
        super(props);
        this.state = {
            itemModels: [
                {
                    mainTitle: "拍摄",
                    actionBlock: ()=>{
                        console.log("你点击了拍摄");
                    },
                },
            ],
            selectedItemModels: [],
        }
    }

    /**
     * 显示多个选择项的Sheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle及'点击该标题的回调'actionBlock)
     */
    showWithItems(itemModels) {
        this.setState({
            visible: true,
            itemModels: itemModels,
        })
    }

    /**
     * 隐藏选择Sheet
     */
    hide() {
        this.setState({
            visible: false,
        })
    }

    dealAction = (action) => {
        action && setTimeout(action, 200);
    }

    render() {
        let listMaxHeight = actionSheetMaxHeight-100;

        return (
            <CJMultipleChooseActionSheetFactory visible={this.state.visible}
                                                animationType={'none'}
                                                headerTitle={this.props.headerTitle}
                                                cancelHandel={() => {
                                                    this.hide();
                                                    // this.dealAction(this.state.clickCancel);
                                                }}
                                                confirmHandle={() => {
                                                    this.hide();
                                                    this.dealAction(this.props.confirmHandle(this.state.selectedItemModels));
                                                }}
            >
                <CJMultipleChooseActionSheetTableView actionCellHeight={50}
                                                      listMaxHeight={listMaxHeight}
                                                      itemModels={this.state.itemModels}
                                                      clickItemCompleteBlock={(selectedItemModels)=>{
                                                         this.state.selectedItemModels = selectedItemModels;
                                                      }}
                />
            </CJMultipleChooseActionSheetFactory>
        )
    }
}



export class CJMultipleChooseActionSheetFactory extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        animationType: PropTypes.string,        // 模态弹出效果

        headerTitle: PropTypes.string,          // 头部
        cancelHandle: PropTypes.func,           // 取消操作
        confirmHandle: PropTypes.func,          // 确认操作

        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        visible: false,
        animationType: 'slide',

        headerTitle: '',
        cancelHandle: ()=>{},
        confirmHandle: ()=>{},
    };


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                   animationType={this.props.animationType}
                   transparent={true}
                   onRequestClose={() => { }}
            >
                <CJMultipleChooseActionSheetComponent
                    headerTitle={this.props.headerTitle}
                    cancelHandle={this.props.cancelHandle}
                    confirmHandle={this.props.confirmHandle}
                    children={this.props.children}
                />
            </Modal>
        );
    }
}
