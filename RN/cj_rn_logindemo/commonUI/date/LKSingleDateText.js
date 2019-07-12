// LKSingleDateText.js

/* 使用示例
import LKSingleDateText from "../../commonUI/date/LKSingleDateText";

export default class OwnNativeSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKSingleDateText style={{flex: 1}}
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
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LKToastUtil from "../toast/LKToastUtil";

export default class LKSingleDateText extends Component {
    static propTypes = {
        isBankStyle: PropTypes.bool,    //是否没有样式
        allowPickDate: PropTypes.bool,

        placeholder: PropTypes.string,
        chooseDateString: PropTypes.string,
        onPress: PropTypes.func,        //点击日期文本执行的事件(如果是在子控件中不需要设置此属性，而是重写clickDateTextAction方法)
    };

    static defaultProps = {
        isBankStyle: false,
        allowPickDate: false,

        placeholder: '请选择日期',
        chooseDateString: '',
        onPress: ()=>{},
    };

    constructor(props) {
        super(props);
    }

    renderDatePicker() {
        return null;
    }

    clickDateTextAction() {
        if (this.props.onPress) {
            this.props.onPress();
        } else {
            //LKToastUtil.showMessage('请完善点击事件');
        }

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
            <TouchableOpacity style={[{width: 100}, style]}
                              disabled={!this.props.allowPickDate}
                              onPress={this.clickDateTextAction.bind(this)}
            >
                <Text style={textStyles}>{dateString}</Text>
                {this.renderDatePicker()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        // fontSize: 18,
        textAlign: 'center',
        paddingVertical: 10,
    },
})