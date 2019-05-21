// page1.js
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native';

export default class Page1 extends Component {
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world1!</Text>
                <Button type="warning"
                        onPress={() => {
                            navigate('B');
                        }}
                        title="进入第一页"
                >进入第一页</Button>
            </View>
        );
    }
}