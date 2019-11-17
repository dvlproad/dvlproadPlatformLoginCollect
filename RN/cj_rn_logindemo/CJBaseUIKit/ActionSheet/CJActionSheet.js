/**
 * CJActionSheet.js
 *
 * @Description: 【单选】的ActionSheet
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-18 01:07:17
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

/*
CJActionSheet: 最基础的ActionSheet使用示例

import {
    CJActionSheet,
} from '../CJBaseUIKit/CJBaseUIKit';


<CJActionSheet ref={ref => this.photoCameraSheet = ref} />

        showPhotoCameraSheet() {
            this.photoCameraSheet.showWithItems([
                {
                    mainTitle: "拍摄",
                    actionBlock: ()=>{
                        console.log("你点击了'拍摄'");
                    },
                },
                {
                    mainTitle: "从手机相册选择",
                    actionBlock: ()=>{
                        console.log("你点击了'从手机相册选择'");
                    },
                },
            ]);
        }

 */

/* CJActionSheetFactory: 最基础的ActionSheet使用示例

import {
    CJActionSheetFactory,
    CJActionSheetTableCell,
} from '../CJBaseUIKit/CJBaseUIKit';

                <CJActionSheetFactory actionTitle={'请选择'}
                                      visible={this.state.showAction}
                                      cancel={()=>{this.setState({showAction:false})}}
                >
                    <CJActionSheetTableCell actionName={'我是按钮一'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                    <CJActionSheetTableCell actionName={'我是按钮二'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                </CJActionSheetFactory>
 */

import React, { Component } from 'react';
import { Modal, FlatList, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CJActionSheetComponent  from "./CJActionSheetComponent";
import CJActionSheetTableView from './CJActionSheetTableView';

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export class CJActionSheet extends Component {
    static propTypes = {
        headerTitle: PropTypes.string, //头部
    };

    static defaultProps = {
        headerTitle: '',
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
            <CJActionSheetFactory visible={this.state.visible}
                                  animationType={'none'}
                                  headerTitle={this.props.headerTitle}
                                  cancel={() => {
                                      this.hide();
                                      // this.dealAction(this.state.clickCancel);
                                  }}
            >
                <CJActionSheetTableView actionCellHeight={50}
                                        listMaxHeight={listMaxHeight}
                                        itemModels={this.state.itemModels}
                                        itemOnPress={(item, index)=>{
                                            this.hide();
                                            this.dealAction(item.actionBlock);
                                        }}
                />
            </CJActionSheetFactory>
        )
    }
}



export class CJActionSheetFactory extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        animationType: PropTypes.string, //模态弹出效果
        headerTitle: PropTypes.string, //头部
        cancel: PropTypes.func, // 取消操作
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        visible: false,
        animationType: 'slide',

        headerTitle: '',
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
                <CJActionSheetComponent
                    headerTitle={this.props.headerTitle}
                    cancel={this.props.cancel}
                    children={this.props.children}
                />
            </Modal>
        );
    }
}
