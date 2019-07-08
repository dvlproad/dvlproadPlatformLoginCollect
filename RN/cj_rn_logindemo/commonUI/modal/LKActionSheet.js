// LKActionSheet.js
/* LKPhotoCameraSheet:'拍摄/从手机相册选择'使用示例

import {LKPhotoCameraSheet} from "../../../commonUI/modal/LKActionSheet";

            <LKPhotoCameraSheet visible={this.state.photoCameraSheetShow}
                                clickCancel={this.hidePhotoCameraSheet}
                                clickTakePhoto={()=>{
                                    this.hidePhotoCameraSheet();
                                    alert("你点击了拍摄")
                                }}
                                clickChooseFromLibrary={()=>{
                                    this.hidePhotoCameraSheet();
                                    alert("你点击了从相册选择")
                                }}
            />
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
import LKActionSheetComponent, {LKActionDom} from "./LKActionSheetComponent";

export class LKPhotoCameraSheet extends Component {
    static propTypes = {
        visible: PropTypes.bool,

        clickCancel: PropTypes.func.isRequired,
        clickTakePhoto: PropTypes.func.isRequired,
        clickChooseFromLibrary: PropTypes.func.isRequired,
    };

    static defaultProps = {
        visible: false,
    };

    constructor(props) {
        super(props);
    }

    dealAction = (action)=>{
        setTimeout(action, 300);
    }

    render() {
        return (
            <LKActionSheet visible={this.props.visible}
                           animationType={'none'}
                           actionTitle={''}
                           cancel={()=>{
                               this.dealAction(this.props.clickCancel);
                           }}
            >
                <LKActionDom actionName={'拍摄'}
                             onPress={()=>{
                                 this.dealAction(this.props.clickTakePhoto);
                             }}
                />
                <LKActionDom actionName={'从手机相册选择'}
                             onPress={()=>{
                                 this.dealAction(this.props.clickChooseFromLibrary);
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
                   onRequestClose={() => {}}
            >
                <LKActionSheetComponent actionTitle={this.props.actionTitle}
                                        cancel={this.props.cancel}
                                        children={this.props.children}
                />
            </Modal>
        );
    }
}