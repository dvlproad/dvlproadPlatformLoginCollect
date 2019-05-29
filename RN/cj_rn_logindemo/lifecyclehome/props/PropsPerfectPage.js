//PropsPerfectPage.js
//使用默认值，且进行类型检查)
//更详细的用法可查看：[react中使用prop-types检测props数据类型](https://www.jianshu.com/p/a73fb26c88b5)
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types'

export default class PropsPerfectPage extends Component {
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
    static defaultProps = {
        paramText: "我是默认文本",
    }

    static propTypes = {
        paramText: PropTypes.string,
    }

    render() {
        return (
            <Text style={{backgroundColor: 'cyan'}}>
                {this.props.paramText}
            </Text>
        )
    }
}