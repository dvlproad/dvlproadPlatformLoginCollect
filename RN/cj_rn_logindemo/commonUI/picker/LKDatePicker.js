// LKDatePicker.js

import React from 'react';
import PropTypes from "prop-types";
import Picker from "react-native-picker";
import LKCalendarUtil from "../../commonUtil/LKCalendarUtil";
import LKDateUtil from "../../commonUtil/LKDateUtil";

export default class LKDatePicker {
    static show(dateString, onPickerConfirm, onPickerCancel, onPickerSelect){

        let pickerTitleText = '';
        let defaultSelectedDate = new Date();
        if (dateString == null) {
            pickerTitleText = '请选择日期';
            defaultSelectedDate = new Date();
        } else {
            pickerTitleText = dateString;
            defaultSelectedDate = LKDateUtil.yyyyMMddDate(dateString);
        }

        ///let defaultSelectedValue = ['2019年', '08月', '08日'];
        let defaultSelectedValue = this.getSelectedValue(defaultSelectedDate);


        Picker.init({
            pickerData: LKCalendarUtil.createDateData(1900, 2300),
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

    static getDateString=(pickedValue)=>{
        let year = pickedValue[0];
        let month = pickedValue[1];
        let day = pickedValue[2];
        let dateString = year + month + day;
        return dateString;
    }


    static getSelectedValue = (date)=>{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDay();
        let selectedValue = [year+'年', month+'月', day+'日'];
        return selectedValue;
    }
}