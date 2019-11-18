/**
 * CJAreaPicker.js
 *
 * @Description: 日期选择器
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-11 11:10:37
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import CJAreaPickerView, { CJAreaPickShowType } from "./CJAreaPickerView";
import AreaJson from "./area";

/** 地区选择器创建的时机 */
export var CJAreaPickerCreateTimeType = {
    Free: 0,                //当空闲的时候偷偷执行
    BeCall: 1,              //当需要调用日期选择的时候才去创建(防止进入页面时候卡顿)
    SuperViewAppear: 2,     //当其所视图显示的时候就创建(会造成初次卡顿)
}

export default class CJAreaPicker extends Component {
    static propTypes = {
        areaPickShowType: PropTypes.number,         //地区选择器的选择样式(默认yyyyMMdd,即只显示年月日)
        areaPickerCreateTimeType: PropTypes.number, //地区选择器创建的时机
        // selectedValue: PropTypes.array,       //选择的日期
        //
        onPickerConfirm: PropTypes.func,    //地区选择'确认'
        onPickerCancel: PropTypes.func,     //地区选择'取消'
        // onPickerSelect: PropTypes.func,     //地区选择'变了下'
        onCoverPress: PropTypes.func,       //点击空白区域

        showToolbarValueText: PropTypes.boolean,        // 是否显示文本
        toolbarValueText: PropTypes.string,             // 顶部toolbar上的文案
        toolbarValueFixed: PropTypes.boolean,           // 是否固定文本(默认false，即会根据选择的值显示)
    };

    static defaultProps = {
        areaPickShowType: CJAreaPickShowType.ProvinceCityArea,
        areaPickerCreateTimeType: CJAreaPickShowType.Free,

        toolbarHeight: 40,
        // selectedValue: [],
        //
        onPickerConfirm: (selectedValue)=>{},
        onPickerCancel: ()=>{},
        // onPickerSelect: (selectedValue)=>{},
        onCoverPress: ()=>{},

        showToolbarValueText: true,
        toolbarValueText: '请选择城市',
        toolbarValueFixed: false,
    };

    constructor(props) {
        super(props);

        let needCreateAtFirst = this.props.areaPickerCreateTimeType == CJAreaPickerCreateTimeType.SuperViewAppear;

        this.state = {
            hasCreate: needCreateAtFirst,

            dateString: '',
        }
    }

    /**
     * 显示地区选择器(默认显示 ProvinceCityArea 选择器)
     * @param selectedValues    弹出时候选中的地区(输入的字符串，依赖设置的areaPickShowType，如默认是 ProvinceCityArea，即形如['香港', '香港', '东区']')
     */
    showWithAreaSelectedValues(selectedValues) {
        this.state.selectedValues = selectedValues;
        this.tryShowAreaPicker();
    }

    /**
     * 显示地区选择器(地区默认值为上次点击"确认"的值)
     */
    showWithLastAreaSelectedValues() {
        this.tryShowAreaPicker();
    }


    /**
     * 尝试弹出地区选择控制器
     */
    tryShowAreaPicker() {
        if (this.state.hasCreate) {
            // this.showAreaPicker();

            // 如果不设置setState无法，重新render选择器
            this.setState({
                hasCreate: true,
            }, () => {
                this.showAreaPicker();
            })

        } else {
            this.setState({
                hasCreate: true,
            }, () => {
                this.showAreaPicker();
            })
        }
    }

    /**
     * 弹出地区选择控制器
     */
    showAreaPicker() {
        if (this.areaPicker) {
            let selectedValues = this.state.selectedValues; // ['香港', '香港', '东区'];
            if (selectedValues && selectedValues.length > 0) {
                this.areaPicker.updateDefaultSelectedValues(selectedValues);
            }

            this.areaPicker.show();
        } else {
            //LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    /**
     * 获取当前地区选择控制器
     * @returns {null|CJAreaPickerView}
     */
    getAreaPicker() {
        return this.createAreaPicker();
    }

    /**
     * 创建弹出地区选择控制器
     * @returns {CJAreaPickerView}
     */
    createAreaPicker() {
        return (
            <CJAreaPickerView
                areaJson={AreaJson}
                promptValueText={this.props.toolbarValueText}
                shouldFixedValueText={this.props.toolbarValueFixed}
                showValueText={true}
                // selectedValue={this.state.selectedValue}
                onPickerConfirm={(selectedValue) => {
                    this.props.onPickerConfirm && this.props.onPickerConfirm(selectedValue);
                }}
                onPickerCancel={() => {
                    this.props.onPickerCancel && this.props.onPickerCancel();
                }}
                onCoverPress={() => {
                    this.props.onCoverPress && this.props.onCoverPress();
                }}
                ref={ref => this.areaPicker = ref}
            />
        );
    }



    render() {
        return (
            this.getAreaPicker()
        );
    }
}
