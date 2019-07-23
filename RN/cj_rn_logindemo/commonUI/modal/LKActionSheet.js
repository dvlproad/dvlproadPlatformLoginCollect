// LKActionSheet.js

/*
LKActionSheet: 最基础的ActionSheet使用示例

import {
    LKActionSheet,
} from '../commonUI/luckincommonui';


<LKActionSheet ref={ref => this.photoCameraSheet = ref} />

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

/* LKActionSheetFactory: 最基础的ActionSheet使用示例

import {
    LKActionSheetFactory,
    LKActionDom,
} from '../commonUI/luckincommonui';

                <LKActionSheetFactory actionTitle={'请选择'}
                                      visible={this.state.showAction}
                                      cancel={()=>{this.setState({showAction:false})}}
                >
                    <LKActionDom actionName={'我是按钮一'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                    <LKActionDom actionName={'我是按钮二'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                </LKActionSheetFactory>
 */

import React, { Component } from 'react';
import { Modal, FlatList, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import LKActionSheetComponent, { LKActionDom } from "./LKActionSheetComponent";

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export class LKPhotoCameraSheet extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 显示默认的图片选择Sheet
     *
     * @param takePhotoBlock    '拍摄'的回调
     * @param choosePhotoBlock  '从手机相册选择'的回调
     */
    showDefault(takePhotoBlock, choosePhotoBlock) {
        this.actionSheetList.showWithItems([
            {
                mainTitle: "拍摄",
                actionBlock: ()=>{
                    takePhotoBlock && takePhotoBlock();
                },
            },
            {
                mainTitle: "从手机相册选择",
                actionBlock: ()=>{
                    choosePhotoBlock && choosePhotoBlock();
                },
            },
        ]);
    }


    /**
     * 隐藏图片选择Sheet
     */
    hide() {
        this.actionSheetList.hide();
    }


    render() {
        return (
            <LKActionSheet ref={ref => this.actionSheetList = ref} />
        )

    }
}


export class LKActionSheet extends Component {
    static propTypes = {
        actionTitle: PropTypes.string, //头部
    };

    static defaultProps = {
        actionTitle: '',
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
     * 显示默认的图片选择Sheet
     *
     * @param takePhotoBlock    '拍摄'的回调
     * @param choosePhotoBlock  '从手机相册选择'的回调
     */
    showDefaultPhotoCameraSheet(takePhotoBlock, choosePhotoBlock) {
        this.showWithItems([
            {
                mainTitle: "拍摄",
                actionBlock: ()=>{
                    takePhotoBlock && takePhotoBlock();
                },
            },
            {
                mainTitle: "从手机相册选择",
                actionBlock: ()=>{
                    choosePhotoBlock && choosePhotoBlock();
                },
            },
        ]);
    }

    /**
     * 显示单个选择项的Sheet
     *
     * @param mainTitle     标题
     * @param actionBlock   点击该标题的回调
     */
    showWithItem(mainTitle, actionBlock) {
        let itemModels = [
            {
                mainTitle: mainTitle,
                actionBlock: actionBlock,
            }
        ];

        this.showWithItems(itemModels);
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
        let actionCellHeight = 50;
        let listHeight = this.state.itemModels.length * actionCellHeight;
        let listMaxHeight = actionSheetMaxHeight-100;
        let scrollEnabled = false;
        if (listHeight > listMaxHeight) {
            scrollEnabled = true;
            listHeight = listMaxHeight;
        }

        return (
            <LKActionSheetFactory visible={this.state.visible}
                                  animationType={'none'}
                                  actionTitle={this.props.actionTitle}
                                  cancel={() => {
                                      this.hide();
                                      // this.dealAction(this.state.clickCancel);
                                  }}
            >
                <FlatList style={{height: listHeight}}
                          scrollEnabled={scrollEnabled}
                          data={this.state.itemModels}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => {
                              return (
                                  <LKActionDom actionCellHeight={actionCellHeight}
                                               actionName={item.mainTitle}
                                               onPress={() => {
                                                   this.hide();
                                                   this.dealAction(item.actionBlock);
                                               }}
                                  />
                              )
                          }}
                />
            </LKActionSheetFactory>
        )
    }
}



export class LKActionSheetFactory extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        animationType: PropTypes.string, //模态弹出效果
        actionTitle: PropTypes.string, //头部
        cancel: PropTypes.func, // 取消操作
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        visible: false,
        animationType: 'slide',

        actionTitle: '',
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
                <LKActionSheetComponent actionTitle={this.props.actionTitle}
                                        cancel={this.props.cancel}
                                        children={this.props.children}
                />
            </Modal>
        );
    }
}