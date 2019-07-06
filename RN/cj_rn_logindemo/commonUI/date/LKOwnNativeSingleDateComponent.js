// LKOwnNativeSingleDateComponentponent.js.js
/* 使用示例
import LKOwnNativeSingleDateComponent from "../../commonUI/date/LKOwnNativeSingleDateComponent";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKOwnNativeSingleDateComponent style={{flex: 1}}
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
import { StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import DatePicker from "react-native-datepicker";

export default class LKOwnNativeSingleDateComponent extends Component {
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

        placeholder: '',
        chooseDateString: '',

        minDate: "1900-01-01",
        maxDate: "2300-01-01",
    };


    render() {
        const { style } = this.props;

        let normalCustomStyles = {
            dateInput: {
                borderRadius: 4,
                borderWidth: this.props.allowPickDate ? 1 : 0,
                borderColor: "#CCCCCC",
                backgroundColor: this.props.allowPickDate ? "white" : "#F9F9F9"
            }
            // ... You can check the source to find the other keys.
        };
        let bankCustomStyles = {
            dateInput: {
                borderRadius: 0,
                borderWidth: 0,
                backgroundColor: 'transparent'
            }
            // ... You can check the source to find the other keys.
        };
        let customStyles = this.props.isBankStyle ? bankCustomStyles : normalCustomStyles;

        return (
            <DatePicker
                style={[{ flex: 1 }, style]}
                disabled={!this.props.allowPickDate}
                placeholder={this.props.placeholder}
                date={this.props.chooseDateString}
                minDate="1900-01-01"
                maxDate="2300-01-01"

                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}

                customStyles={customStyles}

                onDateChange={(date) => { //
                    if (date.constructor === String) {
                        let dateString = date;
                        // this.setState({chooseDateString: dateString})
                        this.props.onDateChange(dateString);
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    bankStyle: {
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: "transparent"
    },
})