import React, { Component } from 'react';
import PropTypes from "prop-types";
import CJBaseBottomPicker from '../base/CJBaseBottomPicker';
import CJPickerView from '../PickerView/CJPickerView';
import { CJDatePickerUtil, CJDatePickShowType } from './CJDatePickerUtil';
import { Dimensions } from "react-native";

class CJDatePickerView extends CJBaseBottomPicker {
    static propTypes = {
        datePickShowType: PropTypes.number,         //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        selectedValues: PropTypes.array.isRequired, //初始化创建后第一次选择的日期
        minValidValues: PropTypes.array,            //最小可选择的有效日期数组(太小，会滚动到这个最小)
        maxValidValues: PropTypes.array,            //最大可选择的有效日期数组(太大，会滚动到这个最大)
        formatDateStringFromSelectedValue: PropTypes.func,


        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,
        onCoverPress: PropTypes.func,
    };

    static defaultProps = {
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
        endYear: new Date().getFullYear(),
        minDate: '1900-01-01',
        maxDate: '2300-12-31',
        minValidValues: ['1900', '01', '01'],
        maxValidValues: ['2300', '12', '31'],

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
    }

    constructor(props) {
        super(props);
        this.state = this.getDateList();

        // let unit = ['年', '月', '日'];
        //
        // switch (this.props.datePickShowType) {
        //     case CJDatePickShowType.yyyyMMdd: {
        //         unit = ['年', '月', '日'];
        //         break;
        //     }
        //     case CJDatePickShowType.yyyyMMddHHmm: {
        //         unit = ['年', '月', '日', '时', '分'];
        //         break;
        //     }
        //     case CJDatePickShowType.yyyyMMddHHmmss: {
        //         unit = ['年', '月', '日', '时', '分', '秒'];
        //         break;
        //     }
        //     case CJDatePickShowType.yyyyMM: {
        //         unit = ['年', '月'];
        //         break;
        //     }
        // }
    }

    /**
     * 更新默认选中的值
     * @param selectedValues
     */
    updateDefaultSelectedValues(selectedValues) {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;

        this.props.selectedValues = selectedValues;
        let data = this.getDateList();

        let pickerData = data.pickerData;
        let selectedIndex = data.selectedIndex;
        this.setState({
            selectedValues: selectedValues,
            pickerData: pickerData,
            selectedIndex: selectedIndex,
            forceUpdate: false
        })
    }

    getDateList() {
        return this.updateDateList(false);
    }


    /**
     * 更新日期列表
     * @param forceUpdate   是否强制更新
     * @returns {{pickerData: Array, forceUpdate: *, selectedIndex: Array}}
     */
    updateDateList(forceUpdate) {
        console.log(this.props);
        if (this.props.selectedValues.length < 2) {
            this.props.selectedValues = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
        }

        let unit = this.props.unit;
        let years = [];
        let months = [];
        let days = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }

        let selectedYear = CJDatePickerUtil.removeUnit(years[0], unit[0]);
        if (this.props.selectedValues) {
            selectedYear = this.props.selectedValues[0];
        }
        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let selectedMonth = CJDatePickerUtil.removeUnit(months[0], unit[1]);
        if (this.props.selectedValues) {
            selectedMonth = this.props.selectedValues[1];
        }


        let pickerData = [];
        let selectedIndex = [];

        let datePickShowType = this.props.datePickShowType;
        if (datePickShowType == CJDatePickShowType.yyyyMM ||
            datePickShowType == CJDatePickShowType.yyyyMMdd ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(years);

            let yearSelectedIndex = years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]);
            selectedIndex.push(yearSelectedIndex);

            // this.props.selectedValues[0] = years[selectedIndex[0]];
        }

        // 月
        if (datePickShowType == CJDatePickShowType.yyyyMM ||
            datePickShowType == CJDatePickShowType.yyyyMMdd ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(months);

            let monthSelectedIndex = months.indexOf(selectedMonth + unit[1]);
            selectedIndex.push(monthSelectedIndex);

            // this.props.selectedValues[1] = months[selectedIndex[1]];
        }



        // 日
        if (datePickShowType == CJDatePickShowType.yyyyMMdd ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(days);

            let d = new Date(selectedYear, selectedMonth, 0);
            let dayCount = d.getDate();
            for (let i = 1; i <= dayCount; i++) {
                days.push(i + unit[2]);
            }

            let selectedDay = CJDatePickerUtil.removeUnit(days[0], unit[2]);
            if (this.props.selectedValues) {
                selectedDay = this.props.selectedValues[2];
            }
            // selectedDay = selectedDay.substr(0, selectedDay.length - unit[2].length);


            let daySelectedIndex = days.indexOf(selectedDay + unit[2]) == -1 ? days.length - 1 : days.indexOf(selectedDay + unit[2]);
            selectedIndex.push(daySelectedIndex);
            // this.props.selectedValues[2] = days[selectedIndex[2]];
        }

        // 时
        if (datePickShowType == CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push((i + 1) + '时');
            }
            pickerData.push(hours);
            if (this.props.selectedValues) {
                selectedIndex.push((this.props.selectedValues[3] ? parseInt(this.props.selectedValues[3]) : new Date().getHours()) - 1);
            } else {
                selectedIndex.push((new Date().getHours() - 1));
            }
            // this.props.selectedValues[3] = (selectedIndex[3] + 1) + '时';

            // 分
            if (datePickShowType == CJDatePickShowType.yyyyMMddHHmm ||
                datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push((i + 1) + '分');
                }
                pickerData.push(minutes);
                if (this.props.selectedValues) {
                    selectedIndex.push((this.props.selectedValues[4] ? parseInt(this.props.selectedValues[4]) : new Date().getMinutes()) - 1);
                } else {
                    selectedIndex.push((new Date().getMinutes() - 1));
                }
                // this.props.selectedValues[4] = (selectedIndex[4] + 1) + '分';

                // 秒
                if (datePickShowType == CJDatePickShowType.yyyyMMddHHmmss) {
                    let seconds = [];
                    for (let i = 0; i < 60; i++) {
                        seconds.push((i + 1) + '秒');
                    }
                    pickerData.push(seconds);
                    if (this.props.selectedValues) {
                        selectedIndex.push((this.props.selectedValues[5] ? parseInt(this.props.selectedValues[5]) : 1) - 1);
                    } else {
                        selectedIndex.push(1);
                    }
                    // this.props.selectedValues[5] = (selectedIndex[5] + 1) + '秒';
                }
            }
        }


        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
            forceUpdate: forceUpdate
        };
        return data;
    }


    getSelectedValueText() {
        // let string = this.props.selectedValues.join('-');
        let string = this.props.formatDateStringFromSelectedValue(this.props.selectedValues);
        return string;
    }

    renderPicker() {
        let itemWidth = Dimensions.get('window').width / this.state.pickerData.length;

        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                return <CJPickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    forceUpdate={this.state.forceUpdate}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        let selectedValue = CJDatePickerUtil.removeUnit(toValue, this.props.unit[pickerId]); //去除选择时候的单位

                        // 原本方法
                        // this.props.selectedValues[pickerId] = selectedValue;
                        // console.log('====')
                        // this.setState({ ...this.getDateList() });

                        // 有日期范围的判断
                        let forceUpdate = false;
                        let maxValidValues = ['2020', '01', '01'];
                        // let currentComponentMaxValue = this.props.maxValidValues[pickerId];
                        let currentComponentMaxValue = maxValidValues[pickerId];

                        if (parseInt(selectedValue) < parseInt(currentComponentMaxValue)) {
                            this.props.selectedValues[pickerId] = selectedValue;

                        } else if (parseInt(selectedValue) > parseInt(currentComponentMaxValue)) {
                            if (this.props.selectedValues[pickerId] == currentComponentMaxValue) {
                                forceUpdate = true;
                            }
                            this.props.selectedValues[pickerId] = currentComponentMaxValue;

                        } else if (parseInt(selectedValue) == parseInt(currentComponentMaxValue)) {
                            let componentCount = this.state.selectedValues.length;

                            for (let i = pickerId; i < componentCount-1; i++) {
                                let iComponentOldValue = this.props.selectedValues[i];
                                iComponentOldValue = parseInt(iComponentOldValue);
                                let nextComponentOldValue = this.props.selectedValues[i+1];
                                nextComponentOldValue = parseInt(nextComponentOldValue);
                                if (iComponentOldValue < nextComponentOldValue) {
                                    break;
                                } else if (iComponentOldValue == nextComponentOldValue) {
                                    continue;
                                } else {
                                    this.props.selectedValues[i] = iComponentOldValue;
                                }
                            }
                        }
                        this.setState({ ...this.updateDateList(forceUpdate) });

                        // 外部可能需要的方法
                        // let maxDateString = this.props.maxDate;
                        // let maxDate = this.yyyyMMddDate(maxDateString)
                        //
                        // let minDateString = this.props.minDate;
                        // let minDate = this.yyyyMMddDate(minDateString)
                        //
                        // let oldSelectedValues = [...this.props.selectedValues];
                        //
                        // oldSelectedValues[pickerId] = parseInt(selectedValue);
                        //
                        //
                        // let newDateStr = oldSelectedValues.join("-")
                        // let newDate = this.yyyyMMddDate(newDateStr)
                        //
                        //
                        // let overMax = !this.compareSecondDateLater(newDate, maxDate)
                        // let belowMin = this.compareSecondDateLater(newDate, minDate)
                        // if (overMax || belowMin) {
                        //     forceUpdate = true;
                        // } else {
                        //     this.props.selectedValues[pickerId] = selectedValue;
                        // }
                        //
                        // this.setState({ ...this.updateDateList(forceUpdate) });
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.getSize(14)}
                    itemWidth={itemWidth}
                    itemHeight={this.props.itemHeight} />
            }
        });
    }
}

export default CJDatePickerView;
