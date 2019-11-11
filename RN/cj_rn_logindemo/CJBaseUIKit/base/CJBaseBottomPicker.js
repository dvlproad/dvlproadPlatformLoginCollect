import React, { Component } from 'react';

import {
    Dimensions,
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import BaseDialog from '../react-native-pickers/BaseDialog';
import PropTypes from "prop-types";

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export default class CJBaseBottomPicker extends BaseDialog {
    static propTypes = {
        selectedValueText: PropTypes.string.isRequired,
        onPickerConfirm: PropTypes.func,
    };

    static defaultProps = {
        onPickerCancel: null,
        onPickerConfirm: (selectedValue) => {},
        onCoverPress: null,

        confirmText: '完成',
        confirmTextSize: 17,
        confirmTextColor: '#172991',

        cancelText: '取消',
        cancelTextSize: 17,
        cancelTextColor: '#B2B2B2',

        promptValueText: '请选择日期/地区',
        selectedValueText: '请选择日期/地区',
        valueTextSize: 17,
        valueTextColor: '#000000',
        showValueText: true,        // 是否显示文本
        shouldFixedValueText: false,      // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,
    }

    constructor(props) {
        super(props);
    }


    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    /**
     * 获取toolbar上的文本
     * @returns {null}
     */
    getSelectedValueText() {
        return null;
    }

    renderPicker() {
        return null;
    }

    renderContent() {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;
        let valueText = '';
        if (this.props.showValueText) {
            if (this.props.shouldFixedValueText) {
                valueText = this.props.promptValueText;
            } else {
                valueText = this.getSelectedValueText();
            }
        }

        return (
            <View
                style={{
                    height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44) + screenBottomHeight,
                    width: this.mScreenWidth,
                    backgroundColor: '#ffffff',
                }}>
                <View style={{
                    width: this.mScreenWidth,
                    height: this.props.itemHeight * 5 + this.getSize(15),
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: screenBottomHeight,
                }}
                >
                    {this.renderPicker()}
                </View>
                <View style={{
                    width: this.mScreenWidth, height: this.getSize(44),
                    backgroundColor: '#ffffff', flexDirection: 'row',
                    justifyContent: 'space-between', position: 'absolute', top: 0
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
                        }}
                        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{ width: this.getSize(210), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{ fontSize: this.props.valueTextSize, fontWeight: '400', color: this.props.valueTextColor }}
                            allowFontScaling={true}
                        >
                            {valueText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));
                        }}
                        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}