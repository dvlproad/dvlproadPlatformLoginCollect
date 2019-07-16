// LKTextButton.js
// ①文本按钮、②白色背景+黑色文字的按钮
/* LKWhiteBGButton:白色背景+黑色文字的按钮(常见于'刷新'按钮)

import {LKWhiteBGButton} from "../commonUI/button/LKTextButton";

                        <LKWhiteBGButton style={{width:160, marginTop:60}}
                                         title={'刷新'}
                                         onPress={this.props.refreshHandle}
                        />
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

// LKWhiteBGButton:白色背景+黑色文字的按钮(常见于'刷新'按钮)
export class LKWhiteBGButton extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        fontSize: PropTypes.number,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        title: "title",
        fontSize: 17,
        onPress: () => { },
        disabled: false,
    };

    render() {
        const { style } = this.props;

        return (
            <LKTextButton
                style={[{
                    borderRadius: 6,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#E5E5E5"
                }, style]}
                title={this.props.title}
                color={'#333333'}
                fontSize={this.props.fontSize}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            />
        )
    }
}

// var enableBlueColor = '#01ADFE';
// var disableBlueColor = '#01ADFE4C';
var enableBlueColor = 'rgba(23, 41, 145, 1)';
var disableBlueColor = 'rgba(23, 41, 145, 0.4)';

// LKBlueBGButton:蓝色背景+白色文字的按钮(常见于操作按钮)
export class LKBlueBGButton extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        fontSize: PropTypes.number,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        title: "title",
        fontSize: 17,
        onPress: () => { },
        disabled: false,
    };

    render() {
        const { style } = this.props;

        return (
            <LKTextButton
                style={[{
                    borderRadius: 6,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#E5E5E5"
                }, style]}
                title={this.props.title}
                color={'#333333'}
                fontSize={this.props.fontSize}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            />
        )
    }
}

const styles = StyleSheet.create({
    submitEnable: {
        height: 46,
        borderRadius: 6,
        backgroundColor: enableBlueColor,
        borderWidth: 0
    },
    submitDisable: {
        height: 46,
        borderRadius: 6,
        backgroundColor: disableBlueColor,
        borderWidth: 0
    },

    editEnable: {
        height: 40,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: enableBlueColor
    },
    editDisable: {
        height: 40,
        borderRadius: 4,
        backgroundColor: "#FFFFFF4C",
        borderWidth: 1,
        borderColor: disableBlueColor
    }
});

// 文本按钮
export default class LKTextButton extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        fontSize: PropTypes.number,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        title: "title",
        color: "#01ADFE",
        fontSize: 17,
        onPress: () => { },
        disabled: false,
    };

    render() {
        const { style } = this.props;

        // 使用Button组件，无法处理disabled时候的文字颜色问题
        // return (
        //     <View style={[{flex:1}, style]} >
        //         <Button
        //             title={this.props.title}
        //             color={this.props.color}
        //             disabled={this.props.disabled}
        //             onPress={this.props.onPress}
        //         />
        //     </View>
        // )
        return (
            <View style={[{ justifyContent: "center", height: 44 }, style]} >
                <TouchableOpacity
                    onPress={this.props.onPress}
                    disabled={this.props.disabled}
                //activeOpacity={0.4}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: this.props.color,
                            fontSize: this.props.fontSize
                        }}
                    >
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
