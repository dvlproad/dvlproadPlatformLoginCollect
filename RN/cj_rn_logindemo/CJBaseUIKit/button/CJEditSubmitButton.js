// LKEditSubmitButton.js

/* LKEditSubmitButton:'提交'/'修改' 文字切换的按钮(包含各自的disable处理) 的使用示例

import {LKEditSubmitButton} from "../../commonUI/button/LKEditSubmitButton";

            <LKEditSubmitButton isShowEditTitle={this.props.isShowEditTitle}
                                isDisabled={this.props.isDisabled}
                                clickEditTitleHandle={() => {
                                    Alert.alert("你点击了编辑按钮！");
                                }}
                                clickSubmitTitleHandle={() => {
                                    Alert.alert("你点击了提交按钮！");
                                }}
            />
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet} from 'react-native';
import CJTextButton from "./CJTextButton";

// var enableBlueColor = '#01ADFE';
// var disableBlueColor = '#01ADFE4C';
var enableBlueColor = 'rgba(23, 41, 145, 1)';
var disableBlueColor = 'rgba(23, 41, 145, 0.4)';

export class CJEditSubmitButton extends Component {
    static propTypes = {
        submitTitle: PropTypes.string.isRequired,
        editTitle:  PropTypes.string.isRequired,
        fontSize: PropTypes.number,
        isShowEditTitle: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool,
        clickEditTitleHandle: PropTypes.func,
        clickSubmitTitleHandle: PropTypes.func,
    };

    static defaultProps = {
        submitTitle: "提交",
        editTitle:  "修改",
        fontSize: 17,
        isShowEditTitle: false,
        isDisabled: false,
        clickEditTitleHandle: () => {},
        clickSubmitTitleHandle: () => {}
    };


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { style } = this.props;

        let isShowEditTitle = this.props.isShowEditTitle;
        let submitTitle = this.props.submitTitle ? this.props.submitTitle : this.state.submitTitle;
        let editTitle = this.props.editTitle ? this.props.editTitle : this.state.editTitle;
        let showTitle = isShowEditTitle ? editTitle : submitTitle;

        let isDisable = this.props.isDisabled;
        let enableStateStyle = isShowEditTitle ? (isDisable?styles.editDisable:styles.editEnable) : (isDisable?styles.submitDisable:styles.submitEnable)

        let showTextColor = isShowEditTitle ? (isDisable?disableBlueColor:enableBlueColor) : "#FFFFFF";
        let showTextFont = this.props.fontSize;

        let currentOnPress = isShowEditTitle ? this.props.clickEditTitleHandle : this.props.clickSubmitTitleHandle

        return (
            <CJTextButton style={[enableStateStyle, style]}
                          title={showTitle}
                          color={showTextColor}
                          fontSize={showTextFont}
                          onPress={currentOnPress}
                          disabled={isDisable}
            />
        )
    }
}


const styles = StyleSheet.create({
    submitEnable: {
        height: 46,
        borderRadius: 3,
        backgroundColor: enableBlueColor,
        borderWidth: 0
    },
    submitDisable: {
        height: 46,
        borderRadius: 3,
        backgroundColor: disableBlueColor,
        borderWidth: 0
    },

    editEnable: {
        height: 40,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: enableBlueColor
    },
    editDisable: {
        height: 40,
        borderRadius: 3,
        backgroundColor: "#FFFFFF4C",
        borderWidth: 1,
        borderColor: disableBlueColor
    }
});
