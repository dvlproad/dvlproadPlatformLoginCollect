//LKImageButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";

// 返回App的图片按钮
export class LKBackAppButton extends Component {
    render() {
        return (
            <LKBackButton onPress={() => {
                              
                          }}
            />
        )
    }
}

// 返回的图片按钮
export class LKBackButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
    };

    static defaultProps = {
        onPress: () => {},
    };

    render() {
        return (
            <LKImageButton style={this.props.style}
                           source={require('./resources/nav_back.png')}
                           onPress={this.props.onPress}
            />
        )
    }
}

// 删除的图片按钮
export class LKDeleteButton extends Component {
    static propTypes = {
        onPress: PropTypes.func
    };

    static defaultProps = {
        onPress: null,
    };


    render() {
        return (
            <LKImageButton style={this.props.style}
                           source={require('./resources/healthCer_delete_blue.png')}
                           onPress={this.props.onPress}
            />
        )
    }
}

// 图片按钮
export class LKImageButton extends Component {
    static propTypes = {
        source: PropTypes.number,
        onPress: PropTypes.func
    };

    static defaultProps = {
        source: null,
        onPress: ()=>{},
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