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
import CJBaseDatePicker, {CJDatePickShowType} from "./CJBaseDatePicker";

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
        // dateString: PropTypes.string,       //选择的日期

        onPickerConfirm: PropTypes.func,    //日期选择'确认'
        onPickerCancel: PropTypes.func,     //日期选择'取消'
        // onPickerSelect: PropTypes.func,     //日期选择'变了下'
        onCoverPress: PropTypes.func,       //点击空白区域

        shouldCreateItRightNow: PropTypes.boolean,  // 是否应该马上创建它(常用于日期选择器不是从底部弹出，而是自己控制位置的场景)
    };

    static defaultProps = {
        datePickShowType: CJDatePickShowType.yyyyMMdd,
        datePickerCreateTimeType: CJDatePickerCreateTimeType.Free,
        // dateString: '',
        //
        onPickerConfirm: (dateString)=>{},
        onPickerCancel: ()=>{},
        // onPickerSelect: (dateString)=>{},
        onCoverPress: ()=>{},

        shouldCreateItRightNow: false,
    };

    constructor(props) {
        super(props);

        let needCreateAtFirst = this.props.datePickerCreateTimeType == CJDatePickerCreateTimeType.SuperViewAppear;

        this.state = {
            hasCreate: needCreateAtFirst,
            noCover: false,

            dateString: '2017-06-30',
        }
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     */
    show() {
        this.tryShowDatePicker();
    }


    /**
     * 弹出日期选择器，并且不带背景
     */
    showWithNoCover() {
        this.state.noCover = true;
        this.tryShowDatePicker();
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     * @param dateString    弹出时候选中的日期(输入的字符串，依赖设置的datePickShowType，如默认是yyyyMMdd，即形如'2000-02-29')
     */
    showWithDateString(dateString) {
        this.setState({
            dateString: dateString,
        }, ()=>{
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
            let dateString = this.state.dateString;
            this.datePicker.updateDefaultSelectedDateString(dateString);

            if (this.state.noCover) {
                this.datePicker.showWithNoCover();
            } else {
                this.datePicker.show();
            }

        } else {
            //LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    /**
     * 获取当前日期选择控制器
     * @returns {null|CJBaseDatePicker}
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
     * @returns {CJBaseDatePicker}
     */
    createDatePicker() {
        return (
            <CJBaseDatePicker
                datePickShowType={this.props.datePickShowType}
                dateString={this.state.dateString}
                shouldCreateItRightNow={this.props.shouldCreateItRightNow}
                onPickerConfirm={(dateString) => {
                    this.props.onPickerConfirm && this.props.onPickerConfirm(dateString);
                }}
                onPickerCancel={() => {
                    this.props.onPickerCancel && this.props.onPickerCancel();
                }}
                onCoverPress={() => {
                    this.props.onCoverPress && this.props.onCoverPress();
                }}
                ref={ref => this.datePicker = ref}
            />
        );
    }

    render() {
        if (!this.state.hasCreate && this.props.datePickerCreateTimeType == CJDatePickerCreateTimeType.Free) {
            setTimeout(()=>{
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
