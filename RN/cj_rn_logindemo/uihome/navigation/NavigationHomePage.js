//NavigationNavigation.js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native';

type Props = {};
export default class HomePage extends Component <Props> {
    render() {
        const {navigate} = this.props.navigation;   //TODO:怎么判断导航栏是否为空

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world!</Text>


                <Button
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="点我"
                />


                <Button onPress={() => {
                            navigate('A');
                        }}
                        title="进入第一页"
                />

                <Button onPress={() => {
                            navigate('B');
                        }}
                        title="进入第二页"
                />

                <Button onPress={() => {
                            navigate('C',{ name: 'dvlproad' });
                        }}
                        title="进入测试右上角按钮"
                />


            </View>
        );
    }
}