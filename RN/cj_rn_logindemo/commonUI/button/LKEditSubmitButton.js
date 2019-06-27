// LKEditSubmitButton.js
// '提交'/'修改' 文字切换的按钮(包含各自的disable处理)
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet} from 'react-native';
import LKTextButton from "./LKTextButton";

export class LKEditSubmitButton extends Component {
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

        let showTextColor = isShowEditTitle ? (isDisable?"#01ADFE4C":"#01ADFE") : "#FFFFFF";
        let showTextFont = this.props.fontSize;

        let currentOnPress = isShowEditTitle ? this.props.clickEditTitleHandle : this.props.clickSubmitTitleHandle

        return (
            <LKTextButton style={[enableStateStyle, style]}
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
        borderRadius: 4,
        backgroundColor: "#01ADFEFF",
        borderWidth: 0
    },
    submitDisable: {
        borderRadius: 4,
        backgroundColor: "#01ADFE4C",
        borderWidth: 0
    },

    editEnable: {
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#01ADFE"
    },
    editDisable: {
        borderRadius: 4,
        backgroundColor: "#FFFFFF4C",
        borderWidth: 1,
        borderColor: "#01ADFE4C"
    }
});
