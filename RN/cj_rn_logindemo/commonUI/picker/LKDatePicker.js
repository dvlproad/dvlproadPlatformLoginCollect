// LKDatePicker
/*
LKDatePicker:日期选择器 使用示例


 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import LKComJSDatePicker, {LKDatePickShowType} from "./LKComJSDatePicker";
import LKToastUtil from "../toast/LKToastUtil";

export default class LKDatePicker extends Component {
    static propTypes = {
        datePickShowType: PropTypes.number, //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        // dateString: PropTypes.string,       //选择的日期
        //
        // onPickerConfirm: PropTypes.func,    //日期选择'确认'
        // onPickerCancel: PropTypes.func,     //日期选择'取消'
        // onPickerSelect: PropTypes.func,     //日期选择'变了下'
    };

    static defaultProps = {
        datePickShowType: LKDatePickShowType.yyyyMMdd,
        // dateString: '',
        //
        // onPickerConfirm: (dateString)=>{},
        // onPickerCancel: ()=>{},
        // onPickerSelect: (dateString)=>{},
    };

    constructor(props) {
        super(props);
        this.state = {
            hasCreate: false,

            dateString: '',

            onPickerConfirm: ()=>{ },
            onPickerCancel: ()=>{ },
            onPickerSelect: ()=>{ },
        }
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     * @param dateString        弹出时候选中的日期(输入的字符串，依赖设置的datePickShowType，如默认是yyyyMMdd，即形如'2000-02-29')
     * @param onPickerConfirm   确认
     */
    showWithDateString(dateString, onPickerConfirm) {
        this.showAllEvent(dateString, onPickerConfirm, null, null);
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     * @param dateString        弹出时候选中的日期(输入的字符串，依赖设置的datePickShowType，如默认是yyyyMMdd，即形如'2000-02-29')
     * @param onPickerConfirm   确认
     * @param onPickerCancel    取消
     * @param onPickerSelect    选择过程的事件
     */
    showAllEvent(dateString, onPickerConfirm, onPickerCancel, onPickerSelect) {
        this.setState({
            dateString: dateString,
            onPickerConfirm: onPickerConfirm,
            onPickerCancel: onPickerCancel,
            onPickerSelect: onPickerSelect
        }, ()=>{
            this.tryShowDatePicker();
        })
    }

    /**
     * 尝试弹出日期选择控制器
     */
    tryShowDatePicker() {
        if (this.state.hasCreate) {
            this.showDatePicker();
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
            this.datePicker.show();
        } else {
            LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    /**
     * 获取当前日期选择控制器
     * @returns {null|LKComJSDatePicker}
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
     * @returns {LKComJSDatePicker}
     */
    createDatePicker() {
        return (
            <LKComJSDatePicker
                datePickShowType={this.props.datePickShowType}
                dateString={this.state.dateString}
                onPickerConfirm={(dateString) => {
                    this.state.onPickerConfirm(dateString);
                }}
                onPickerCancel={() => {
                    this.state.onPickerCancel();
                }}
                ref={ref => this.datePicker = ref}
            />
        );
    }

    render() {
        return (
            this.getDatePicker()
        );
    }
}