// LKActionSheet.js
/* LKPhotoCameraSheet:'拍摄/从手机相册选择'使用示例

import {
    LKPhotoCameraSheet,
} from '../commonUI/luckincommonui';

import {
    LKImagePickerUtil,
} from '../commonUtil/luckincommonutil';


        <LKPhotoCameraSheet ref={ref => this.photoCameraSheet = ref} />

        //显示图片选择器
        showPhotoCameraSheet = (index) => {
            this.photoCameraSheet.showDefault(
                () => {
                    // '拍摄'
                    LKImagePickerUtil.takePhoto((imageAbsolutePath, imageRelativePath)=>{
                        this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                    });

                },
                () => {
                    // '从手机相册选择'
                    LKImagePickerUtil.choosePhoto((imageAbsolutePath, imageRelativePath)=>{
                        this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                    });
                });
       }
 */

/* LKActionSheet: 最基础的ActionSheet使用示例

import {LKActionSheet} from "../../../commonUI/modal/LKActionSheet";
                <LKActionSheet actionTitle={'请选择'}
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
                </LKActionSheet>
 */
import React, { Component } from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import LKActionSheetComponent, { LKActionDom } from "./LKActionSheetComponent";

export class LKPhotoCameraSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actionName1: '拍摄',
            actionName2: '从手机相册选择',
        }
    }


    /**
     * 显示默认的图片选择Sheet
     *
     * @param takePhotoBlock    '拍摄'的回调
     * @param choosePhotoBlock  '从手机相册选择'的回调
     */
    showDefault(takePhotoBlock, choosePhotoBlock) {
        this.show(this.state.actionName1, this.state.actionName2, takePhotoBlock, choosePhotoBlock);
    }

    /**
     * 显示指定的图片选择Sheet
     *
     * @param actionName1
     * @param actionName2
     * @param takePhotoBlock    '拍摄'的回调
     * @param choosePhotoBlock  '从手机相册选择'的回调
     */
    show(actionName1, actionName2, takePhotoBlock, choosePhotoBlock) {
        actionName1 = actionName1 ? actionName1 : this.state.actionName1;
        actionName2 = actionName2 ? actionName2 : this.state.actionName2;
        this.setState({
            visible: true,
            actionName1: actionName1,
            actionName2: actionName2,
            takePhotoBlock: takePhotoBlock,
            choosePhotoBlock: choosePhotoBlock
        })
    }

    /**
     * 隐藏图片选择Sheet
     */
    hide() {
        this.setState({
            visible: false,
            takePhotoBlock: null,
            choosePhotoBlock: null,
        })
    }

    dealAction = (action) => {
        action && setTimeout(action, 200);
    }

    render() {
        return (
            <LKActionSheet visible={this.state.visible}
                           animationType={'none'}
                           actionTitle={''}
                           cancel={() => {
                               this.hide();
                               // this.dealAction(this.state.clickCancel);
                           }}
            >
                <LKActionDom actionName={this.state.actionName1}
                             onPress={() => {
                                 this.hide();
                                 this.dealAction(this.state.takePhotoBlock);
                             }}
                />
                <LKActionDom actionName={this.state.actionName2}
                             onPress={() => {
                                 this.hide();
                                 this.dealAction(this.state.choosePhotoBlock);
                             }}
                />
            </LKActionSheet>
        )
    }
}


export class LKActionSheet extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        animationType: PropTypes.string, //模态弹出效果
        actionTitle: PropTypes.string, //头部
        cancel: PropTypes.func, // 取消操作
        children: PropTypes.array,
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