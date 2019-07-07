// LKSingleDateComponent.js

/* 使用示例
import LKSingleDateComponent from "../../commonUI/date/LKSingleDateText";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKSingleDateComponent style={{flex: 1}}
                                   placeholder= {"选择日期"}
                                   chooseDateString={this.state.beginDateString1}
                                   allowPickDate={true}
                                   onDateChange={ (date) => {
                                       this.setState({
                                           beginDateString1: date
                                       })
                                   }}
                                   isBankStyle={false}
            />
        );
    }
}
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import LKComJSDatePicker, {LKDatePickShowType} from "../picker/LKComJSDatePicker";
import LKToastUtil from "../toast/LKToastUtil";
import LKSingleDateText from "./LKSingleDateText";

export default class LKSingleDateActionText extends LKSingleDateText {
    static propTypes = {
        isBankStyle: PropTypes.bool,    //是否没有样式
        allowPickDate: PropTypes.bool,

        placeholder: PropTypes.string,
        chooseDateString: PropTypes.string,
        onDateChange: PropTypes.func,

        minDate: PropTypes.string,
        maxDate: PropTypes.string,
    };

    static defaultProps = {
        isBankStyle: false,
        allowPickDate: false,

        placeholder: '请选择日期',
        chooseDateString: '',

        minDate: "1900-01-01",
        maxDate: "2300-01-01",
    };

    constructor(props) {
        super(props);

        this.state={
            dateString: props.chooseDateString,
        }
    }

    clickDateTextAction() {
        super.clickDateTextAction();
        LKToastUtil.showMessage('点击了日期文本');
        this.datePicker.show();
    }

    renderDatePicker(): null {
        return (
            <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMdd}
                               dateString={this.props.dateString}
                               onPickerConfirm={(dateString) => {
                                   LKToastUtil.showMessage(dateString)
                                   this.setState({
                                       dateString: dateString,
                                   })
                               }}
                               onPickerCancel={() => {
                                   LKToastUtil.showMessage('取消');
                               }}
                               ref={ref => this.datePicker = ref}
            />
        )
    }
}