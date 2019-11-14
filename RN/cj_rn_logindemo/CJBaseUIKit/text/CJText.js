import React, { Component } from 'react';
import {StyleSheet, Text} from "react-native";
import PropTypes from "prop-types";


export default class CJCenterText extends Component {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: null,
    };


    render() {
        return (
            <Text style={[styles.singleLineHVCenterText, this.props.style]}>
                {this.props.text}
            </Text>
        )
    }
}

var styles = StyleSheet.create({
    normalText: {               //常见未特殊配置的文本（会发现不会垂直居中）
        height: 44,
        fontSize: 17,
    },
    horizontalCenterText: {     //水平居中的文本
        height: 44,
        fontSize: 17,
        textAlign: 'center',    //添加这行即可使得Text文字水平居中显示
    },
    verticalCenterText: {       //竖直居中的文本
        height: 44,
        fontSize: 17,
        lineHeight:44,	        //添加这行即可使得Text文字垂直居中显示
    },
    singleLineHVCenterText: {   //单行文本水平&垂直居中
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
    },
    multipleLineHVCenterText: { //长文本的多行文本垂直居中
        height: 144,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:144,
        textAlignVertical: 'center',
        // ...Platform.select({
        //     ios: { lineHeight: 100},
        //     android: {}
        // })
    },
});