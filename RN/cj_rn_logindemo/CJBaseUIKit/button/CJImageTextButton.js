/**
 * CJImageTextButton.js
 * @Description: CJImageTextButton
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-10 13:58:36
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CJLoadingImage from "../image/CJLoadingImage";


// 图片按钮
export default class CJImageTextButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,

        imageStyle: PropTypes.object,
        imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        imageDefaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        onLoadComplete: PropTypes.func, //图片加载结束的回调
        // 是否需要加载动画(默认需要)
        // 有以下体验不友好的情况需要特殊处理：即从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好，需要设置本属性为false
        needLoadingAnimation: PropTypes.bool,

        title: PropTypes.string,
        imageAndTitleVertical: PropTypes.number,    //图片和文字之间的竖直间距(默认20)
    };

    static defaultProps = {
        onPress: () => { },

        imageStyle: {width: 42, height: 42},
        imageSource: null,
        imageDefaultSource: require('./resources/imageDefault.png'),
        onLoadComplete: (buttonIndex)=>{},
        needLoadingAnimation: true,

        title: "",
        imageAndTitleVertical: 20,
    };


    render() {
        return (
            <View style={this.props.style} >
                <TouchableOpacity onPress={this.props.onPress} >
                    <Image source={this.props.source} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.props.onPress}
            >
                <View style={{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
                    <CJLoadingImage
                        style={this.props.imageStyle}
                        source={this.props.imageSource}
                        defaultSource={this.props.imageDefaultSource}
                        onLoadComplete={this.props.onLoadComplete}
                        needLoadingAnimation={this.props.needLoadingAnimation}
                    />
                    <Text style={[styles.singleLineHVCenterText, {marginTop: 20}]} >
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


var styles = StyleSheet.create({
    singleLineHVCenterText: {   //单行文本水平&垂直居中
        height: 22,
        fontSize: 16,
        textAlign: 'center',
        lineHeight:22,
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
