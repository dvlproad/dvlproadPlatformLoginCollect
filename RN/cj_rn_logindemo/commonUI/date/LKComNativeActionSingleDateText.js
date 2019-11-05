// LKComNativeSingleActionDateTextt.js
/* 使用示例
import LKComNativeActionSingleDateText from "../../commonUI/date/LKRNActionSingleDateText";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKComNativeActionSingleDateText style={{flex: 1}}
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
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LKComNativeDatePicker from "../picker/LKComNativeDatePicker";

export default class LKComNativeActionSingleDateText extends Component {
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
    }

    showDatePick=(dateString)=>{
        LKComNativeDatePicker.show(
            dateString,
            (dateString) => {
                this.props.onDateChange(dateString);
            },
            (dateString) => {
                //LKToastUtil.showMessage(dateString);
            },
            (dateString) => {
                //LKToastUtil.showMessage(dateString);
            },
        );
    }


    render() {
        const { style } = this.props;

        let normalCustomStyles = {
            borderRadius: 4,
            borderWidth: this.props.allowPickDate ? 1 : 0,
            borderColor: "#CCCCCC",
            backgroundColor: this.props.allowPickDate ? "white" : "#F9F9F9"
        };

        let bankCustomStyles = {
            borderRadius: 0,
            borderWidth: 0,
            backgroundColor: 'transparent'
        };
        let textStyles = this.props.isBankStyle ? bankCustomStyles : normalCustomStyles;
        textStyles = [textStyles, styles.text];

        let dateString = this.props.chooseDateString;
        let isEmpty = dateString == null || dateString.length < 6;
        if (isEmpty) {
            dateString = this.props.placeholder;
            textStyles = [textStyles, {color:'#999'}];
        }

        return (
            <TouchableOpacity style={style}
                              disabled={!this.props.allowPickDate}
                              onPress={()=>{
                                  this.showDatePick(dateString);
                              }}
            >
                <Text style={textStyles}>{dateString}</Text>
            </TouchableOpacity>
        )
    }


    // render() {
    //     return (
    //         <DatePicker
    //             style={[{ flex: 1 }, style]}
    //             disabled={!this.props.allowPickDate}
    //             placeholder={this.props.placeholder}
    //             date={this.props.chooseDateString}
    //             minDate="1900-01-01"
    //             maxDate="2300-01-01"
    //
    //             confirmBtnText="确定"
    //             cancelBtnText="取消"
    //
    //             onDateChange={(date) => { //
    //                 if (date.constructor === String) {
    //                     let dateString = date;
    //                     // this.setState({chooseDateString: dateString})
    //                     this.props.onDateChange(dateString);
    //                 }
    //             }}
    //         />
    //     )
    // }
}

const styles = StyleSheet.create({
    text: {
        // fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10,
    },
})