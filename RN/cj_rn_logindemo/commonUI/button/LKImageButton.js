// LKImageButton.js
/* LKBackAppButton:返回壳App的图片按钮--每个RN app的首页都需要使用的组件

import {LKBackAppButton} from "../commonUI/button/LKImageButton";

const HeathCerNavigator = createStackNavigator(
    {
        HealthCerHome: {
            screen: LKHealthCerHomePage,
            navigationOptions: () => ({
                title: `个人健康证`,
                headerStyle:{                                 //导航栏样式设置
                    backgroundColor:'#ffffff',
                },
                headerLeft: (
                    <LKBackAppButton />
                ),
            }),
        },
    },
    {
        initialRouteName: 'HealthCerHome'
    }
);
 */

/*
LKDeleteButton:删除的图片按钮(一般位于图片的右上角)

import {LKDeleteButton} from "../commonUI/button/LKImageButton";

        <LKDeleteButton
            style={{ position:'absolute', width: deleteButtonWidth, height: deleteButtonWidth}}
            onPress={()=> {
                this.props.deleteImageHandle(buttonIndex);
            }}
        />
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

// 返回壳App的图片按钮--每个RN app的首页都需要使用的组件
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
        onPress: () => { },
    };

    render() {
        return (
            <LKImageButton style={{ marginLeft: 4 }}
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