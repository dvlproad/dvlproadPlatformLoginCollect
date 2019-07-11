// LKDatePicker
/*
LKDatePicker:日期选择器 使用示例


 */

import React, { Component } from 'react';
import LKComJSDatePicker, {LKDatePickShowType} from "./LKComJSDatePicker";
import LKToastUtil from "../toast/LKToastUtil";

export default class LKDatePicker extends Component {
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
     * 显示日期选择器
     * @param dateString        弹出时候选中的日期(输入的字符串，形如'2000-02-29')
     * @param onPickerConfirm   确认
     * @param onPickerCancel    取消
     * @param onPickerSelect    选择过程的事件
     */
    showIt(dateString, onPickerConfirm, onPickerCancel, onPickerSelect) {
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
        if (this.birthdayDatePicker) {
            this.birthdayDatePicker.show();
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
                datePickShowType={LKDatePickShowType.yyyyMMdd}
                dateString={this.state.dateString}
                onPickerConfirm={(dateString) => {
                    this.state.onPickerConfirm(dateString);
                }}
                onPickerCancel={() => {
                    this.state.onPickerCancel();
                }}
                ref={ref => this.birthdayDatePicker = ref}
            />
        );
    }

    render() {
        return (
            this.getDatePicker()
        );
    }
}