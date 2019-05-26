// page2.js
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@ant-design/react-native'

export default class Page2 extends Component {
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world2!</Text>
                <Button type="warning"
                        onPress={() => {
                            navigate.goBack;
                        }}
                        title="返回首页"
                >返回首页</Button>
            </View>
        );
    }
}