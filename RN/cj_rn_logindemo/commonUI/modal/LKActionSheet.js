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

    render() {
        return (
            <LKActionSheet visible={this.props.visible}
                           animationType={'none'}
                           actionTitle={'选择图片'}
                           cancel={this.props.clickCancel}
            >
                <LKActionDom actionName={'拍摄'}
                             onPress={this.props.clickTakePhoto}
                />
                <LKActionDom actionName={'从手机相册选择'}
                             onPress={this.props.clickTakePhoto}
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