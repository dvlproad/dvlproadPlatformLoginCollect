//PropsEasyPage.js
//没使用默认值
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PropsEasyPage extends Component {
    constructor(props) {
        super(props);
    }

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
    render() {
        return (
            <Text style={{backgroundColor: 'cyan'}}>
                {this.props.paramText}
            </Text>
        )
    }
}
