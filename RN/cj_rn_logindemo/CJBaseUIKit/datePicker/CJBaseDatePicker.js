// CJBaseDatePicker.js

/*
CJBaseDatePicker 日期选择器(使用JS实现的无平台差异的日期选择器) 使用示例：

import CJBaseDatePicker, {CJDatePickShowType} from "../../CJBaseUIKit/datePicker/CJBaseDatePicker";

                <CJBaseDatePicker datePickShowType={LKDatePickShowType.yyyyMMdd}
                                   dateString={'2000-02-29'}
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
import CJDatePickerView from './CJDatePickerView';

/**
 * 日期器的选择样式
 */
export var CJDatePickShowType = {
    yyyyMMdd: 0,        /** 只显示年月日 */
    yyyyMMddHHmm: 1,    /** 只显示年月日时分 */
    yyyyMMddHHmmss: 2,  /** 只显示年月日时分秒 */
    yyyyMM: 3,          /** 只显示年月(目前2019.07.06不支持) */
}

export default class CJBaseDatePicker extends Component {
    static propTypes = {
        datePickShowType: PropTypes.number, //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        dateString: PropTypes.string,       //选择的日期

        onPickerConfirm: PropTypes.func,    //日期选择'确认'
        onPickerCancel: PropTypes.func,     //日期选择'取消'
        onPickerSelect: PropTypes.func,     //日期选择'变了下'
        onCoverPress: PropTypes.func,       //点击空白区域
    };

    static defaultProps = {
        datePickShowType: CJDatePickShowType.yyyyMMdd,
        dateString: '',

        onPickerConfirm: (dateString)=>{},
        onPickerCancel: ()=>{},
        onPickerSelect: (dateString)=>{},
        onCoverPress: ()=>{},
    };

    constructor(props) {
        super(props);

        this.state={
            showDays: true,     //是否显示'天'
            showHours: false,   //是否显示'时'
            showMinutes: false, //是否显示'分'
            showSeconds: false, //是否显示'秒'
        }
    }

    /**
     * 更新默认选中的日期
     * @param dateString
     */
    updateDefaultSelectedDateString(dateString) {
        this.datePicker.updateDefaultSelectedDateString(dateString);
    }


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

        let hour = '00';
        if (pickedValue.length > 3) {
            hour = pickedValue[3].split('时')[0];
            hour = hour < 10 ? ('0' + hour) : hour;
        }

        let minute = '00';
        if (pickedValue.length > 4) {
            minute = pickedValue[4].split('分')[0];
            minute = minute < 10 ? ('0' + minute) : minute;
        }


        let second = '00';
        if (pickedValue.length > 5) {
            second = pickedValue[5].split('秒')[0];
            second = second < 10 ? ('0' + second) : second;
        }

        let dateString = '';
        switch (this.props.datePickShowType) {
            case CJDatePickShowType.yyyyMMdd: {
                dateString = year + '-' + month + '-' + day;
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmm: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmmss: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            }
            case CJDatePickShowType.yyyyMM: {
                dateString = year + '-' + month;
                break;
            }
            default: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            }
        }

        return dateString;
    }

    /**
     * 获取选定指定日期(如'2000-02-29')时候，picker所要选中的数组值
     * @param date          选中的日期
     * @returns {string[]}
     */
    getSelectedValue = (date)=>{
        let selectedValue = [];

        let year = date.getFullYear();
        selectedValue.push(year+'年');

        let month = date.getMonth()+1;
        //month = month < 10 ? ('0' + month) : month;
        selectedValue.push(month+'月');

        if (this.state.showDays) {
            let day = date.getDate();
            //day = day < 10 ? ('0' + day) : day;
            selectedValue.push(day+'日');
        }

        if (this.state.showHours) {
            let hours = date.getHours();
            hours = hours < 10 ? ('0' + hours) : hours;
            selectedValue.push(hours+'时');
        }

        if (this.state.showMinutes) {
            let minutes = date.getMinutes();
            minutes = minutes < 10 ? ('0' + minutes) : minutes;
            selectedValue.push(minutes+'分');
        }

        if (this.state.showSeconds) {
            let seconds = date.getSeconds();
            seconds = seconds < 10 ? ('0' + seconds) : seconds;
            selectedValue.push(seconds+'秒');
        }


        return selectedValue;
    }

    render() {
        let unit = ['年', '月', '日'];
        let showDays = true;
        let showHours = false;
        let showMinutes = false;
        let showSeconds = false;

        switch (this.props.datePickShowType) {
            case CJDatePickShowType.yyyyMMdd: {
                unit = ['年', '月', '日'];
                showDays = true;
                showHours = false;
                showMinutes = false;
                showSeconds = false;
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmm: {
                unit = ['年', '月', '日', '时', '分'];
                showDays = true;
                showHours = true;
                showMinutes = true;
                showSeconds = false;
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmmss: {
                unit = ['年', '月', '日', '时', '分', '秒'];
                showDays = true;
                showHours = true;
                showMinutes = true;
                showSeconds = true;
                break;
            }
            case CJDatePickShowType.yyyyMM: {
                unit = ['年', '月'];
                showDays = false;
                showHours = false;
                showMinutes = false;
                showSeconds = false;
                break;
            }
        }
        this.state.showDays = showDays;
        this.state.showHours = showHours;
        this.state.showMinutes = showMinutes;
        this.state.showSeconds = showSeconds;


        let dateString = this.props.dateString;

        let pickerTitleText = '';
        let defaultSelectedDate = new Date();
        if (dateString == null || dateString.length < 8) {
            pickerTitleText = '请选择日期';
            defaultSelectedDate = new Date();
        } else {
            pickerTitleText = dateString;
            defaultSelectedDate = LKDateUtil.yyyyMMdd_hhmmssDate(dateString);
        }

        ///let defaultSelectedValue = ['2019年', '08月', '08日'];
        let defaultSelectedValue = this.getSelectedValue(defaultSelectedDate);

        return (
            <CJDatePickerView
                yyyy={true}
                MM={true}
                dd={showDays}
                HH={showHours}
                mm={showMinutes}
                ss={showSeconds}
                unit={unit}
                startYear={1900}
                endYear={2300}

                // confirmText={'确认'}
                // confirmTextSize={14}
                // confirmTextColor={'#333333'}
                //
                // cancelText={'取消'}
                // confirmTextSize={14}
                // confirmTextColor={'#333333'}
                //
                // itemHeight={40}
                // itemTextColor={0x333333ff}
                // itemSelectedColor={0x1097D5ff}

                selectedValue={defaultSelectedValue}
                onPickerConfirm={(value) => {
                    let dateString = this.getDateString(value);
                    this.props.onPickerConfirm && this.props.onPickerConfirm(dateString);
                }}
                onPickerCancel={() => {
                    this.props.onPickerCancel && this.props.onPickerCancel();
                }}
                onCoverPress={()=>{
                    this.props.onCoverPress && this.props.onCoverPress();
                }}
                ref={ref => this.datePicker = ref}
            />
        )
    }
}
