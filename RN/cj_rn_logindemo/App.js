import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
// import { Button } from 'react-native';
import { Button } from '@ant-design/react-native'

export default class HelloWorldApp extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world!</Text>


                <Button
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="normal:里面的title"
                />

                <Button disabled
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="disabled:里面的title"
                >disabled:外面的title</Button>

            </View>
        );
    }
}