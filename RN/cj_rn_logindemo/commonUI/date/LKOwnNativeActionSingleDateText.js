// LKOwnNativeActionSingleDateText.js
/* 使用示例
import LKOwnNativeActionSingleDateText from "../../commonUI/date/LKOwnNativeActionSingleDateText";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKOwnNativeActionSingleDateText style={{flex: 1}}
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

export default class LKOwnNativeActionSingleDateText extends Component {
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


    render() {
        const { style } = this.props;

        let normalCustomStyles = {
            dateInput: {
                borderRadius: 6,
                borderWidth: this.props.allowPickDate ? 1 : 0,
                borderColor: "#E5E5E5",
                backgroundColor: this.props.allowPickDate ? "white" : "#F9F9F9"
            }
            // ... You can check the source to find the other keys.
        };
        let bankCustomStyles = {
            dateInput: {
                borderRadius: 6,
                borderWidth: 0,
                backgroundColor: 'transparent'
            }
            // ... You can check the source to find the other keys.
        };
        let customStyles = this.props.isBankStyle ? bankCustomStyles : normalCustomStyles;

        let minDate = "1900-01-01";
        if (this.props.minDate && this.props.minDate.length > 8) {
            minDate = this.props.minDate;
        }

        let maxDate = "2300-01-01";
        if (this.props.maxDate && this.props.maxDate.length > 8) {
            maxDate = this.props.maxDate;
        }

        return (
            <DatePicker
                style={[{ flex: 1 }, style]}
                disabled={!this.props.allowPickDate}
                placeholder={this.props.placeholder}
                date={this.props.chooseDateString}
                minDate={minDate}
                maxDate={maxDate}

                mode="date"
                // androidMode={'default'}
                // androidMode={'calendar'}
                androidMode={'spinner'}
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