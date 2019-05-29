//PropsNormalPage.js
//使用默认值，但没进行类型检查
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PropsNormalPage extends Component {
    render() {
        return (
            <View>
                <TestPropsText paramText="我要要传递的字符串" />
                <TestPropsText paramText={123} />
                <TestPropsText />
            </View>
        )
    }
}

export class TestPropsText extends Component {
    static defaultProps = {
        paramText: "我是默认文本",
    }

    render() {
        return (
            <Text style={{backgroundColor: 'cyan'}}>
                {this.props.paramText}
            </Text>
        )
    }
}