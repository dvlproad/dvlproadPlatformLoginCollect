// LKDatePicker.js

import React from 'react';
import PropTypes from "prop-types";
import Picker from "react-native-picker";
import LKCalendarUtil from "../../commonUtil/LKCalendarUtil";
import LKDateUtil from "../../commonUtil/LKDateUtil";

export default class LKDatePicker {
    /**
     * 显示日期选择器
     * @param dateString        弹出时候选中的日期(输入的字符串，形如'2000-02-29')
     * @param onPickerConfirm   确认
     * @param onPickerCancel    取消
     * @param onPickerSelect    选择过程的事件
     */
    static show(dateString, onPickerConfirm, onPickerCancel, onPickerSelect){

        let pickerTitleText = '';
        let defaultSelectedDate = new Date();
        if (dateString == null || dateString.length < 8) {
            pickerTitleText = '请选择日期';
            defaultSelectedDate = new Date();
        } else {
            pickerTitleText = dateString;
            defaultSelectedDate = LKDateUtil.yyyyMMddDate(dateString);
        }

        ///let defaultSelectedValue = ['2019年', '08月', '08日'];
        let defaultSelectedValue = this.getSelectedValue(defaultSelectedDate);


        Picker.init({
            pickerData: LKCalendarUtil.collectDateBetweenYears(1900, 2300),
            pickerFontSize: 17,
            pickerFontColor: [31, 31, 31, 1],
            pickerRowHeight: 30,

            pickerTitleText: pickerTitleText,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [1, 186, 245, 1],
            pickerCancelBtnColor: [1, 186, 245, 1],
            pickerTitleColor: [20, 20, 20, 1],

            pickerToolBarBg: [232, 232, 232, 1],
            pickerBg: [196, 199, 206, 1],

            selectedValue: defaultSelectedValue,

            onPickerConfirm: (pickedValue, pickedIndex) => {
                let dateString = this.getDateString(pickedValue);
                onPickerConfirm(dateString);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                let dateString = this.getDateString(pickedValue);
                onPickerCancel(dateString);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                let dateString = this.getDateString(pickedValue);
                onPickerSelect(dateString);
            }
        });
        Picker.show();
    }

    /**
     * 根据picker选中的数组值，得到日期字符串(形如'2000-02-29')
     * @param pickedValue
     * @returns {string}
     */
    static getDateString=(pickedValue)=>{
        let year = pickedValue[0].split('年')[0];

        let month = pickedValue[1].split('月')[0];
        month = month < 10 ? ('0' + month) : month;

        let day = pickedValue[2].split('日')[0];
        day = day < 10 ? ('0' + day) : day;

        let dateString = year + '-' + month + '-' + day;
        return dateString;
    }


    /**
     * 获取选定指定日期(如'2000-02-29')时候，picker所要选中的数组值
     * @param date          选中的日期
     * @returns {string[]}
     */
    static getSelectedValue = (date)=>{
        let year = date.getFullYear();

        let month = date.getMonth()+1;
        //month = month < 10 ? ('0' + month) : month;

        let day = date.getDate();
        //day = day < 10 ? ('0' + day) : day;

        let selectedValue = [year+'年', month+'月', day+'日'];
        return selectedValue;
    }
}