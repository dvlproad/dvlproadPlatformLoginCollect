// LKComJSDatePicker.js

/*
LKComJSDatePicker日期选择器(使用JS实现的无平台差异的日期选择器) 使用示例：

import LKComJSDatePicker from "../../commonUI/picker/LKComJSDatePicker";

                <LKComJSDatePicker dateString={'2000-02-29'}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消');
                                   }}
                                   ref={ref => this.birthdayDatePicker = ref}
                />


使用的地方：
                onPress={()=>{
                                  this.birthdayDatePicker.show()
                              }}
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import LKDateUtil from "../../commonUtil/LKDateUtil";
import {DatePicker} from 'react-native-pickers';

export default class LKComJSDatePicker extends Component {
    static propTypes = {
        dateString: PropTypes.string,   //选择的日期

        onPickerConfirm: PropTypes.func, //日期选择'确认'
        onPickerCancel: PropTypes.func, //日期选择'取消'
        onPickerSelect: PropTypes.func, //日期选择'变了下'
    };

    static defaultProps = {
        dateString: '',

        onPickerConfirm: (dateString)=>{},
        onPickerCancel: ()=>{},
        onPickerSelect: (dateString)=>{},
    };


    /**
     * 显示日期选择器
     */
    show() {
        this.datePicker.show();
    }

    /**
     * 根据picker选中的数组值，得到日期字符串(形如'2000-02-29')
     * @param pickedValue
     * @returns {string}
     */
    getDateString=(pickedValue)=>{
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
    getSelectedValue = (date)=>{
        let year = date.getFullYear();

        let month = date.getMonth()+1;
        //month = month < 10 ? ('0' + month) : month;

        let day = date.getDate();
        //day = day < 10 ? ('0' + day) : day;

        let selectedValue = [year+'年', month+'月', day+'日'];
        return selectedValue;
    }

    render() {
        let dateString = this.props.dateString;

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

        return (
            <DatePicker
                HH={false}
                mm={false}
                ss={false}
                unit={['年', '月', '日']}
                startYear={1900}
                endYear={2300}

                confirmText={'确认'}
                confirmTextSize={14}
                confirmTextColor={'#333333'}

                cancelText={'取消'}
                confirmTextSize={14}
                confirmTextColor={'#333333'}

                itemHeight={40}
                itemTextColor={0x333333ff}
                itemSelectedColor={0x1097D5ff}

                selectedValue={defaultSelectedValue}
                onPickerConfirm={(value) => {
                    let dateString = this.getDateString(value);
                    this.props.onPickerConfirm(dateString);
                }}
                onPickerCancel={() => {
                    this.props.onPickerCancel();
                }}
                ref={ref => this.datePicker = ref}
            />
        )
    }
}