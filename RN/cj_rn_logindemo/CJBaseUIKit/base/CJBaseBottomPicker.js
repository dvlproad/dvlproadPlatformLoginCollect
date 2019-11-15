import React, { Component } from 'react';

import {
    Dimensions,
    Platform,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import CJBottomToolbar from './CJBottomToolbar';
import BaseDialog from '../react-native-pickers/BaseDialog';
import PropTypes from "prop-types";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export default class CJBaseBottomPicker extends BaseDialog {
    static propTypes = {
        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,
        onCoverPress: PropTypes.func,

        toolbarHeight: PropTypes.number,

        confirmText: PropTypes.string,
        confirmTextSize: PropTypes.number,
        // confirmTextColor: PropTypes.color,

        cancelText: PropTypes.string,
        cancelTextSize: PropTypes.number,
        // cancelTextColor: PropTypes.color,

        promptValueText: PropTypes.string,
        selectedValueText: PropTypes.string.isRequired,
        valueTextSize: PropTypes.number,
        // valueTextColor: PropTypes.color,
        showValueText: PropTypes.boolean,           // 是否显示文本
        shouldFixedValueText: PropTypes.boolean,    // 是否固定文本(默认false，即会根据选择的值显示)
    };

    static defaultProps = {
        onPickerCancel: ()=>{},
        onPickerConfirm: (selectedValue) => {},
        onCoverPress: null,

        toolbarHeight: 44,

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

        let toolbarHeight = this.getSize(this.props.toolbarHeight); // TODO: 外界没设toolbarHeight，为什么这里会没取默认值，
        if (isNaN(toolbarHeight)) {
            toolbarHeight = 44; // 此行不仅是设置一个最小值，还起到toolbarHeight undefine 时候的防止崩溃
        }
        let validContentViewHeight = this.props.itemHeight * 5 + this.getSize(15);

        return (
            <View
                style={{
                    height: toolbarHeight + validContentViewHeight + screenBottomHeight,
                    width: screenWidth,
                    backgroundColor: '#ffffff',
                }}>
                <View style={{
                    width: screenWidth,
                    height: validContentViewHeight,
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: screenBottomHeight,
                }}
                >
                    {this.renderPicker()}
                </View>
                <CJBottomToolbar
                    style={{
                        height: toolbarHeight,
                        position: 'absolute',
                        top: 0
                    }}

                    onPickerCancel={()=>{
                        this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
                    }}
                    onPickerConfirm={() => {
                        this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));
                    }}

                    toolbarHeight={toolbarHeight}

                    confirmText={this.props.confirmText}
                    confirmTextSize={this.props.confirmTextSize}
                    confirmTextColor={this.props.confirmTextColor}

                    cancelText={this.props.cancelText}
                    cancelTextSize={this.props.cancelTextSize}
                    cancelTextColor={this.props.cancelTextColor}

                    valueText={valueText}
                    valueTextSize={this.props.valueTextSize}
                    valueTextColor={this.props.valueTextColor}
                />
                {/*<View style={{*/}
                {/*    width: this.mScreenWidth, height: toolbarHeight,*/}
                {/*    backgroundColor: '#ffffff', flexDirection: 'row',*/}
                {/*    justifyContent: 'space-between', position: 'absolute', top: 0*/}
                {/*}}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => {*/}
                {/*            this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));*/}
                {/*        }}*/}
                {/*        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>*/}
                {/*        <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => {*/}

                {/*        }}*/}
                {/*        style={{ width: this.getSize(210), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>*/}
                {/*        <Text*/}
                {/*            style={{ fontSize: this.props.valueTextSize, fontWeight: '400', color: this.props.valueTextColor }}*/}
                {/*            allowFontScaling={true}*/}
                {/*        >*/}
                {/*            {valueText}*/}
                {/*        </Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => {*/}
                {/*            this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));*/}
                {/*        }}*/}
                {/*        style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>*/}
                {/*        <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        )
    }
}
