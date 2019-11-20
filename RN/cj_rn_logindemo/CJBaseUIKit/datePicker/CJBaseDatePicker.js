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
import CJDatePickerView from './CJDatePickerView';
import { CJDatePickerUtil, CJDatePickShowType } from './CJDatePickerUtil';

export default class CJBaseDatePicker extends Component {
    static propTypes = {
        datePickShowType: PropTypes.number,         //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        dateString: PropTypes.string,               //选择的日期
        shouldCreateItRightNow: PropTypes.boolean,  // 是否应该马上创建它(常用于日期选择器不是从底部弹出，而是自己控制位置的场景)

        onPickerConfirm: PropTypes.func,    //日期选择'确认'
        onPickerCancel: PropTypes.func,     //日期选择'取消'
        onPickerSelect: PropTypes.func,     //日期选择'变了下'
        onCoverPress: PropTypes.func,       //点击空白区域
    };

    static defaultProps = {
        datePickShowType: CJDatePickShowType.yyyyMMdd,
        dateString: '',

        shouldCreateItRightNow: false,

        removeSubviews: false,

        onPickerCancel: (selectedValues)=>{},
        onPickerConfirm: (selectedValues) => {},
        onCoverPress: ()=>{},

        unit: ['年', '月', '日'],
        selectedValue: [new Date().getFullYear() + '年', new Date().getMonth() + 1 + '月', new Date().getDate() + '日'],
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
        showValueText: true,        // 是否显示文本
        shouldFixedValueText: false,      // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,
        itemTextColor: 0x00000078,
        itemSelectedColor: 0x000000ff,
    };

    constructor(props) {
        super(props);

        this.state={

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
     * 弹出日期选择器，并且不带背景
     */
    showWithNoCover() {
        this.datePicker.showWithNoCover();
    }


    render() {
        let unit = ['年', '月', '日'];

        switch (this.props.datePickShowType) {
            case CJDatePickShowType.yyyyMMdd: {
                unit = ['年', '月', '日'];
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmm: {
                unit = ['年', '月', '日', '时', '分'];
                break;
            }
            case CJDatePickShowType.yyyyMMddHHmmss: {
                unit = ['年', '月', '日', '时', '分', '秒'];
                break;
            }
            case CJDatePickShowType.yyyyMM: {
                unit = ['年', '月'];
                break;
            }
        }


        let dateString = this.props.dateString;

        let pickerTitleText = '';
        if (dateString == null || dateString.length < 8) {
            pickerTitleText = '请选择日期';
        } else {
            pickerTitleText = dateString;
        }
        let defaultSelectedValue = CJDatePickerUtil.getSelectedValue(date, this.props.datePickShowType);
        // let defaultSelectedValue = ['2019年', '08月', '08日'];

        return (
            <CJDatePickerView
                shouldCreateItRightNow={this.props.shouldCreateItRightNow}

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
                onPickerConfirm={(selectedValues) => {
                    let selectedDateString = CJDatePickerUtil.getDateString(this.props.datePickShowType, selectedValues);
                    this.props.onPickerConfirm && this.props.onPickerConfirm(selectedDateString);
                }}
                onPickerCancel={(selectedValues) => {
                    this.props.onPickerCancel && this.props.onPickerCancel(selectedValues);
                }}
                onCoverPress={()=>{
                    this.props.onCoverPress && this.props.onCoverPress();
                }}
                ref={ref => this.datePicker = ref}
            />
        )
    }
}
