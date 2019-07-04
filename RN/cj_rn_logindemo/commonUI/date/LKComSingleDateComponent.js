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
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import LKTextButton from "../button/LKTextButton";
import LKDatePicker from "../picker/LKDatePicker";
import Picker from "react-native-picker";

export default class LKComSingleDateComponent extends Component {
    static propTypes = {
        isBankStyle: PropTypes.bool,    //是否没有样式
        allowPickDate: PropTypes.bool,
        chooseDateString: PropTypes.string,
        onDateChange: PropTypes.func,

        minDate: PropTypes.string,
        maxDate: PropTypes.string,
    };

    static defaultProps = {
        isBankStyle: false,
        allowPickDate: false,

        minDate: "1900-01-01",
        maxDate: "2300-01-01",
    };


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

        return (
            <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={()=>{
                Picker.init({
                    pickerData: LKCalendarUtil.createDateData(1900, 2300),
                    pickerFontColor: [255, 0 ,0, 1],
                    onPickerConfirm: (pickedValue, pickedIndex) => {
                        console.log('date', pickedValue, pickedIndex);
                        // onPickerConfirm(pickedValue, pickedIndex);
                    },
                    onPickerCancel: (pickedValue, pickedIndex) => {
                        console.log('date', pickedValue, pickedIndex);
                        // onPickerCancel(pickedValue, pickedIndex);
                    },
                    onPickerSelect: (pickedValue, pickedIndex) => {
                        console.log('date', pickedValue, pickedIndex);
                        // onPickerSelect(pickedValue, pickedIndex);
                    }
                });
                Picker.show();

                // LKDatePicker.showDatePicker(
                //     (pickedValue, pickedIndex) => {
                //
                //     },
                //     (pickedValue, pickedIndex) => {
                //
                //     },
                //     (pickedValue, pickedIndex) => {
                //
                //     },
                // )
            }}>
                <Text>DatePicker</Text>
            </TouchableOpacity>
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