import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import PickerView from '../react-native-pickers/PickerView';

import BaseDialog from '../react-native-pickers/BaseDialog';
import LKDateUtil from "../../commonUtil/LKDateUtil";

class CJDatePickerView extends BaseDialog {

    static defaultProps = {
        removeSubviews: false,
        itemTextColor: 0x00000078,
        itemSelectedColor: 0x000000ff,
        onPickerCancel: null,
        onPickerConfirm: null,
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

        valueText: '请选择日期',
        valueTextSize: 17,
        valueTextColor: '#000000',
        showValueText: true,        // 是否显示文本
        fixedValueText: false,      // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,

        yyyy: true,
        MM: true,
        dd: true,
        HH: true,
        mm: true,
        ss: false
    }

    constructor(props) {
        super(props);
        this.state = this.getDateList();
    }


    /**
     * 更新默认选中的日期
     * @param dateString
     */
    updateDefaultSelectedDateString(dateString) {
        let defaultSelectedDate = LKDateUtil.yyyyMMdd_hhmmssDate(dateString);
        let selectedValue = [
            defaultSelectedDate.getFullYear() + '年',
            defaultSelectedDate.getMonth() + 1 + '月',
            defaultSelectedDate.getDate() + '日'
        ];

        this.updateDefaultSelectedValues(selectedValue);
    }

    /**
     * 更新默认选中的值
     * @param selectedValue
     */
    updateDefaultSelectedValues(selectedValue) {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;

        this.props.selectedValue = selectedValue;
        let data = this.getDateList();

        let pickerData = data.pickerData;
        let selectedIndex = data.selectedIndex;
        this.setState({
            selectedValue: selectedValue,
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        })
    }


    getDateList() {
        console.log(this.props)
        let unit = this.props.unit;
        let years = [];
        let months = [];
        let days = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }

        let selectedYear = years[0];
        if (this.props.selectedValue) {
            selectedYear = this.props.selectedValue[0];
        }
        selectedYear = selectedYear.substr(0, selectedYear.length - unit[0].length);
        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let selectedMonth = months[0];
        if (this.props.selectedValue) {
            selectedMonth = this.props.selectedValue[1];
        }
        selectedMonth = selectedMonth.substr(0, selectedMonth.length - unit[1].length);


        let pickerData = [];
        let selectedIndex = [];
        if (this.props.yyyy) {
            pickerData.push(years);

            let yearSelectedIndex = years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]);
            selectedIndex.push(yearSelectedIndex);

            this.props.selectedValue[0] = years[selectedIndex[0]];
        }

        if (this.props.MM) {
            pickerData.push(months);

            let monthSelectedIndex = months.indexOf(selectedMonth + unit[1]);
            selectedIndex.push(monthSelectedIndex);

            this.props.selectedValue[1] = months[selectedIndex[1]];
        }

        if (this.props.dd) {
            pickerData.push(days);

            let d = new Date(selectedYear, selectedMonth, 0);
            let dayCount = d.getDate();
            for (let i = 1; i <= dayCount; i++) {
                days.push(i + unit[2]);
            }

            let selectedDay = days[0];
            if (this.props.selectedValue) {
                selectedDay = this.props.selectedValue[2];
            }
            selectedDay = selectedDay.substr(0, selectedDay.length - unit[2].length);


            let daySelectedIndex = days.indexOf(selectedDay + unit[2]) == -1 ? days.length - 1 : days.indexOf(selectedDay + unit[2]);
            selectedIndex.push(daySelectedIndex);
            this.props.selectedValue[2] = days[selectedIndex[2]];
        }

        if (this.props.HH) {
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push((i + 1) + '时');
            }
            pickerData.push(hours);
            if (this.props.selectedValue) {
                selectedIndex.push((this.props.selectedValue[3] ? parseInt(this.props.selectedValue[3]) : new Date().getHours()) - 1);
            } else {
                selectedIndex.push((new Date().getHours() - 1));
            }
            this.props.selectedValue[3] = (selectedIndex[3] + 1) + '时';

            if (this.props.mm) {
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push((i + 1) + '分');
                }
                pickerData.push(minutes);
                if (this.props.selectedValue) {
                    selectedIndex.push((this.props.selectedValue[4] ? parseInt(this.props.selectedValue[4]) : new Date().getMinutes()) - 1);
                } else {
                    selectedIndex.push((new Date().getMinutes() - 1));
                }
                this.props.selectedValue[4] = (selectedIndex[4] + 1) + '分';

                if (this.props.ss) {
                    let seconds = [];
                    for (let i = 0; i < 60; i++) {
                        seconds.push((i + 1) + '秒');
                    }
                    pickerData.push(seconds);
                    if (this.props.selectedValue) {
                        selectedIndex.push((this.props.selectedValue[5] ? parseInt(this.props.selectedValue[5]) : 1) - 1);
                    } else {
                        selectedIndex.push(1);
                    }
                    this.props.selectedValue[5] = (selectedIndex[5] + 1) + '秒';
                }
            }
        }


        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                return <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[pickerId] = toValue;
                        console.log('====')
                        this.setState({ ...this.getDateList() });
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            }
        });
    }

    renderContent() {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;
        let valueText = '';
        if (this.props.showValueText) {
            if (this.props.fixedValueText) {
                valueText = this.props.valueText;
            } else {
                valueText = this.props.selectedValue;
            }
        }

        return <View
            style={{
                height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44), width: this.mScreenWidth,
            }}>
            <View style={{ width: this.mScreenWidth, height: this.props.itemHeight * 5 + this.getSize(15), flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                {this.renderPicker()}
            </View>
            <View style={{
                width: this.mScreenWidth, height: this.getSize(44),
                backgroundColor: '#ffffff', flexDirection: 'row',
                justifyContent: 'space-between', position: 'absolute', top: 0
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{ width: this.getSize(210), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{ fontSize: this.props.valueTextSize, fontWeight: '400', color: this.props.valueTextColor }}
                        allowFontScaling={true}
                    >
                        {valueText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

export default CJDatePickerView;