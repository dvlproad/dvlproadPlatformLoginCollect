import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import PropTypes from "prop-types";

let screenWidth = Dimensions.get('window').width;

export default class CJBottomToolbar extends Component {
    static propTypes = {
        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,

        toolbarHeight: PropTypes.number,

        confirmText: PropTypes.string,
        confirmTextSize: PropTypes.number,
        // confirmTextColor: PropTypes.color,

        cancelText: PropTypes.string,
        cancelTextSize: PropTypes.number,
        // cancelTextColor: PropTypes.color,

        valueText: PropTypes.string,
        valueTextSize: PropTypes.number,
        // valueTextColor: PropTypes.color,
    };

    static defaultProps = {
        onPickerCancel: () => {},
        onPickerConfirm: () => {},

        toolbarHeight: 40,

        confirmText: '完成',
        confirmTextSize: 17,
        confirmTextColor: '#172991',

        cancelText: '取消',
        cancelTextSize: 17,
        cancelTextColor: '#B2B2B2',

        valueText: '请选择日期/地区',
        valueTextSize: 17,
        valueTextColor: '#000000',
    }

    constructor(props) {
        super(props);
    }


    render() {
        let toolbarHeight = this.props.toolbarHeight;
        let cancelTextWidth = 60;
        let valueTextWidth = 210;
        let confirmTextWidth = 60;

        return (
            <View
                style={[
                    {
                        width: screenWidth,
                        height: toolbarHeight,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    },
                    this.props.style
                ]}
            >
                <TouchableOpacity
                    onPress={this.props.onPickerCancel}
                    style={{ width: cancelTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>
                        {this.props.cancelText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{ width: valueTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{ fontSize: this.props.valueTextSize, fontWeight: '400', color: this.props.valueTextColor }}
                        allowFontScaling={true}
                    >
                        {this.props.valueText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPickerConfirm}
                    style={{ width: confirmTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>
                        {this.props.confirmText}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
