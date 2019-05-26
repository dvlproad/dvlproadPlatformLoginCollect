//HelloWorldPage.js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
// import { Button } from 'react-native';
import { Button } from '@ant-design/react-native'

type Props = {};
export default class HelloWorldPage extends Component <Props> {
    render() {
        const {navigate} = this.props.navigation;   //TODO:怎么判断导航栏是否为空

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world!</Text>


                <Button
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="reactnative里面的title"
                />

                <Button onPress={() => {
                            Alert.alert("你点击了按钮！");
                        }}
                        title="antd里面的title"
                >antd外面的title</Button>


            </View>
        );
    }
}