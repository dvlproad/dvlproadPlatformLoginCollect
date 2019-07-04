// LKOwnSingleDateComponent.js.js
/* 使用示例
import LKComSingleDateComponent from "../../commonUI/date/LKOwnSingleDateComponent";

export default class PickOwnSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKComSingleDateComponent style={{flex: 1}}
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
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import LKDatePicker from "../picker/LKDatePicker";
import LKToastUtil from "../toast/LKToastUtil";

export default class LKComSingleDateComponent extends Component {
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

    constructor(props) {
        super(props);

        this.state={
            showingDateString: '',
        }
    }

    updateShowingDateString=(showingDateString)=>{
        this.setState({
            showingDateString: showingDateString,
        })
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
        let customStyles = this.props.isBankStyle ? bankCustomStyles : normalCustomStyles;

        let showingDateString = this.state.chooseDateString;
        if (showingDateString == null) {
            showingDateString = this.props.placeholder;
        }

        return (
            <TouchableOpacity style={style} onPress={()=>{
                LKDatePicker.show(
                    '2000-02-29',
                    (dateString) => {
                        LKToastUtil.showMessage(dateString);
                        this.updateShowingDateString(dateString);
                    },
                    (dateString) => {
                        LKToastUtil.showMessage(dateString);
                    },
                    (dateString) => {
                        LKToastUtil.showMessage(dateString);
                    },
                );
            }}>
                <Text style={customStyles}>{showingDateString}</Text>
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
    bankStyle: {
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: "transparent"
    },
})