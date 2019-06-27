// LKTextButton.js
// ①文本按钮、②白色背景+黑色文字的按钮
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";

// 白色背景+黑色文字的按钮
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
        onPress: () => {},
        disabled: false,
    };

    render() {
        const {style} = this.props;

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
            />
        )
    }
}

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
        onPress: () => {},
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
            <View style={[{justifyContent: "center", height: 44}, style]} >
                <TouchableOpacity
                    onPress={this.props.onPress}
                    disabled={this.props.disabled}
                    //activeOpacity={0.4}
                >
                    <Text
                        style={{
                            textAlign:'center',
                            color: this.props.color,
                            fontSize:this.props.fontSize
                        }}
                    >
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
