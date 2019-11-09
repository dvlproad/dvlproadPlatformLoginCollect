// LKComJSActionSingleDateText.js

/* 使用示例
import LKComJSActionSingleDateText from "../../commonUI/date/LKComJSActionSingleDateText";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKComJSActionSingleDateText
                style={{flex: 1}}
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
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import LKToastUtil from "../toast/LKToastUtil";
import LKSingleDateText from "./LKSingleDateText";
import {
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKDatePicker
} from "../luckincommonui";

export default class LKComJSActionSingleDateText extends LKSingleDateText {
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
            modalVisible: false,
        }
    }

    clickDateTextAction() {
        super.clickDateTextAction();

        this.setState({
            modalVisible: true,
        }, ()=> {
            this.datePicker.showAllEvent(
                this.props.dateString,
                (dateString) => {
                    LKToastUtil.showMessage(dateString);
                    this.setState({
                        modalVisible: false,
                        dateString: dateString,
                    }, ()=>{
                        this.props.onDateChange && this.props.onDateChange(dateString);
                    })
                },
                () => {
                    this.setState({
                        modalVisible: false,
                    })
                }
            )

        });
    }

    hideDatePicker() {
        this.setState({
            modalVisible: false,
        })
    }

    renderDatePicker() {
        return (
            <Modal animationType="fade"
                   transparent={true}
                   visible={this.state.modalVisible}
                   onRequestClose={() => {
                       alert("Modal has been closed.");
                   }}
            >
            <LKDatePicker
                datePickShowType={LKDatePickShowType.yyyyMMdd}
                datePickerCreateTimeType={LKDatePickerCreateTimeType.Free}
                onCoverPress={() => {
                    this.hideDatePicker();
                }}
                ref={ref => this.datePicker = ref}
            />
            </Modal>
        )
    }
}