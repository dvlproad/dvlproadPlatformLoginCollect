/**
 * CJDatePicker.js
 *
 * @Description: 日期选择器
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-06-10 11:11:57
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
/*
CJDatePicker:日期选择器 使用示例

import { CJDatePicker } from "../../CJBaseUIKit/CJBaseUIKit";

                // 选择日期
                chooseDate = () => {
                    this.birthdayDatePicker.showWithDateString(
                        '',
                        (dateString)=>{
                            LKToastUtil.showMessage(dateString)
                        }
                    )
                }

              <CJTextButton
                    style={{ width: 180, backgroundColor:'red'}}
                    title={'yyyyMMdd的日期选择'}
                    onPress={()=>{
                        this.chooseDate();
                    }}
                />


                <CJDatePicker
                    datePickShowType={LKDatePickShowType.yyyyMMdd}
                    ref={ref => this.birthdayDatePicker = ref}
                />

 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import CJDatePickerView from "./CJDatePickerView";
import { CJDatePickerUtil, CJDatePickShowType } from "./CJDatePickerUtil";

/** 日期选择器创建的时机 */
export var CJDatePickerCreateTimeType = {
    Free: 0,                //当空闲的时候偷偷执行
    BeCall: 1,              //当需要调用日期选择的时候才去创建(防止进入页面时候卡顿)
    SuperViewAppear: 2,     //当其所视图显示的时候就创建(会造成初次卡顿)
}

export default class CJDatePicker extends Component {
    static propTypes = {
        datePickShowType: PropTypes.number,         //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        datePickerCreateTimeType: PropTypes.number, //日期选择器创建的时机
        initDateString: PropTypes.string,       //选择的日期

        shouldCreateItRightNow: PropTypes.bool,  // 是否应该马上创建它(常用于日期选择器不是从底部弹出，而是自己控制位置的场景)

        selectedValues: PropTypes.array.isRequired,

        onPickerConfirm: PropTypes.func,    //日期选择'确认'
        onPickerCancel: PropTypes.func,     //日期选择'取消'
        // onPickerSelect: PropTypes.func,     //日期选择'变了下'
        onCoverPress: PropTypes.func,       //点击空白区域

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
        showValueText: PropTypes.bool,           // 是否显示文本
        shouldFixedValueText: PropTypes.bool,    // 是否固定文本(默认false，即会根据选择的值显示)
    };

    static defaultProps = {
        datePickerCreateTimeType: CJDatePickerCreateTimeType.Free,
        initDateString: '',


        shouldCreateItRightNow: false,

        datePickShowType: CJDatePickShowType.yyyyMMdd,
        formatDateStringFromSelectedValue: (selectedValues) => { },

        removeSubviews: false,

        onPickerCancel: (selectedValues) => { },
        onPickerConfirm: (selectedValues) => { },
        onCoverPress: () => { },

        unit: ['年', '月', '日'],
        selectedValues: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
        startYear: 1990,
        endYear: new Date().getFullYear(),
        minDate: '1900-01-01',
        maxDate: '2300-12-31',

        confirmText: '完成',
        confirmTextSize: 17,
        confirmTextColor: '#172991',

        cancelText: '取消',
        cancelTextSize: 17,
        cancelTextColor: '#B2B2B2',

        promptValueText: '请选择日期',
        selectedValueText: '请选择日期',
        valueTextSize: 17,
        valueTextColor: '#000000',
        showValueText: true,                // 是否显示文本
        shouldFixedValueText: false,        // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,
        itemTextColor: 0x00000078,
        itemSelectedColor: 0x000000ff,
    };

    constructor(props) {
        super(props);

        let needCreateAtFirst = this.props.datePickerCreateTimeType == CJDatePickerCreateTimeType.SuperViewAppear;

        this.state = {
            hasCreate: needCreateAtFirst,
            noCover: false,

            selectedValues: ['2017', '6', '30'],    // 注意：目前月份不能成06
        }
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     */
    show() {
        this.setState({
            noCover: false,
        }, () => {
            this.tryShowDatePicker();
        })
    }


    /**
     * 弹出日期选择器，并且不带背景
     */
    showWithNoCover() {
        this.setState({
            noCover: true,
        }, () => {
            this.tryShowDatePicker();
        })
    }

    /**
     * 显示日期选择器
     * @param date    弹出时候选中的日期(new Date())
     */
    showWithDate(date) {
        this._showWithDate(date, false);
    }

    /**
     * 弹出日期选择器，并且不带背景
     * @param date    弹出时候选中的日期(new Date())
     */
    showNoCoverWithDate(date) {
        this._showWithDate(date, true);
    }

    /**
     * 显示日期选择器
     * @param date    弹出时候选中的日期(new Date())
     */
    _showWithDate(date, noCover) {
        let selectedValues = CJDatePickerUtil.getSelectedValueFromDate(date, this.props.datePickShowType);

        this.setState({
            noCover: noCover,
            selectedValues: selectedValues,
        }, () => {
            this.tryShowDatePicker();
        })
    }

    /**
     * 尝试弹出日期选择控制器
     */
    tryShowDatePicker() {
        if (this.state.hasCreate) {
            // this.showDatePicker();

            // 如果不设置setState无法，重新render选择器
            this.setState({
                hasCreate: true,
            }, () => {
                this.showDatePicker();
            })

        } else {
            this.setState({
                hasCreate: true,
            }, () => {
                this.showDatePicker();
            })
        }
    }

    /**
     * 弹出日期选择控制器
     */
    showDatePicker() {
        if (this.datePicker) {
            let selectedValues = this.state.selectedValues;
            this.datePicker.updateDefaultSelectedValues(selectedValues);

            if (this.state.noCover) {
                this.datePicker.showWithNoCover();
            } else {
                this.datePicker.show();
            }

        } else {
            //CJToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    /**
     * 获取当前日期选择控制器
     * @returns {null|CJDatePickerView}
     */
    getDatePicker() {
        if (this.state.hasCreate) {
            return this.createDatePicker();
        } else {
            return null;
        }
    }

    /**
     * 创建弹出日期选择控制器
     * @returns {CJDatePickerView}
     */
    createDatePicker() {
        return (
            <CJDatePickerView
                ref={ref => this.datePicker = ref}
                datePickShowType={this.props.datePickShowType}
                selectedValues={this.state.selectedValues}
                shouldCreateItRightNow={this.props.shouldCreateItRightNow}
                unit={this.props.unit}
                startYear={this.props.startYear}
                endYear={this.props.endYear}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                confirmText={this.props.confirmText}
                confirmTextSize={this.props.confirmTextSize}
                confirmTextColor={this.props.confirmTextColor}
                cancelText={this.props.cancelText}
                cancelTextSize={this.props.cancelTextSize}
                cancelTextColor={this.props.cancelTextColor}
                promptValueText={this.props.promptValueText}
                selectedValueText={this.props.selectedValueText}
                valueTextSize={this.props.valueTextSize}
                valueTextColor={this.props.valueTextColor}
                showValueText={this.props.showValueText}
                shouldFixedValueText={this.props.shouldFixedValueText}
                itemHeight={this.props.itemHeight}
                itemTextColor={this.props.itemTextColor}
                itemSelectedColor={this.props.itemSelectedColor}

                formatDateStringFromSelectedValue={(selectedValues) => {
                    let selectedDateString = CJDatePickerUtil.getFormatDateString(selectedValues, this.props.datePickShowType);
                    return selectedDateString;
                }}
                onPickerConfirm={(selectedValues) => {
                    let selectedDateString = CJDatePickerUtil.getFormatDateString(selectedValues, this.props.datePickShowType);
                    this.props.onPickerConfirm && this.props.onPickerConfirm(selectedDateString);
                }}
                onPickerCancel={() => {
                    this.props.onPickerCancel && this.props.onPickerCancel();
                }}
                onCoverPress={() => {
                    this.props.onCoverPress && this.props.onCoverPress();
                }}
            />
        );
    }

    render() {
        if (!this.state.hasCreate && this.props.datePickerCreateTimeType == CJDatePickerCreateTimeType.Free) {
            setTimeout(() => {
                this.setState({
                    hasCreate: true,
                })
            }, 500);
        }

        return (
            this.getDatePicker()
        );
    }
}
