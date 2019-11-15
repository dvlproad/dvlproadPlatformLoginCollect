/**
 * CJImageButton.js
 * @Description: CJImageButton
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-10 13:58:36
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";


// 图片按钮
export default class CJImageButton extends Component {
    static propTypes = {
        source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        onPress: PropTypes.func
    };

    static defaultProps = {
        source: null,
        onPress: () => { },
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
}
