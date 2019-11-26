import React, { Component } from 'react';
import {
    CJDatePicker
} from '../../CJBaseUIKit/CJBaseUIKit';
import { CJDatePickShowType } from "../../CJBaseUIKit/datePicker/CJDatePickerUtil";
import { CJDatePickerCreateTimeType } from "../../CJBaseUIKit/datePicker/CJDatePicker";


export default class LKDatePicker extends CJDatePicker {
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
        endYear: 2300,
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

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     */
    show() {
        super.show();
    }


    /**
     * 弹出日期选择器，并且不带背景
     */
    showWithNoCover() {
        super.showWithNoCover();
    }

    /**
     * 显示日期选择器
     * @param date    弹出时候选中的日期(new Date())
     */
    showWithDate(date) {
        super.showWithDate();
    }

    /**
     * 弹出日期选择器，并且不带背景
     * @param date    弹出时候选中的日期(new Date())
     */
    showNoCoverWithDate(date) {
        super.showNoCoverWithDate(date);
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     * @param dateString    弹出时候选中的日期(输入的字符串，依赖设置的datePickShowType，如默认是yyyyMMdd，即形如'2000-02-29')
     */
    showWithDateString(dateString) {
        let date = this._yyyyMMdd_hhmmssDate(dateString);
        this.showWithDate(date);
    }

    /**
     * 弹出日期选择器，并且不带背景
     * @param dateString    弹出时候选中的日期(输入的字符串，依赖设置的datePickShowType，如默认是yyyyMMdd，即形如'2000-02-29')
     */
    showNoCoverWithDateString(dateString) {
        let date = this._yyyyMMdd_hhmmssDate(dateString);
        this.showNoCoverWithDate(date);
    }

    /**
     * 创建日期
     * @param fullDateString    将形如'2017-06-28 10:48:46'转成date类
     * @returns Date
     */
    _yyyyMMdd_hhmmssDate(fullDateString) {
        if (fullDateString) {
            let regEx = new RegExp("\\-", "gi");
            let validDateStr = fullDateString.replace(regEx, "/");
            let milliseconds = Date.parse(validDateStr);
            return new Date(milliseconds);
        }
        return null;
    }
}
