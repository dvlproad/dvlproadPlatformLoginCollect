//NavigationNavigation.js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
// import { Button } from 'react-native';
import { Button } from '@ant-design/react-native'

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
                    title="normal:里面的title"
                />

                <Button disabled
                        onPress={() => {
                            Alert.alert("你点击了按钮！");
                        }}
                        title="disabled:里面的title"
                >disabled:外面的title</Button>


                <Button type="warning"
                        onPress={() => {
                            navigate('A');
                        }}
                        title="进入第一页"
                >进入第一页</Button>

                <Button type="warning"
                        onPress={() => {
                            navigate('B');
                        }}
                        title="进入第二页"
                >进入第二页</Button>

                <Button type="warning"
                        onPress={() => {
                            navigate('C',{ name: 'dvlproad' });
                        }}
                        title="进入测试右上角按钮"
                >进入测试右上角按钮</Button>


                <Button type="primary"
                        onPress={() => {
                            navigate('Movie',{ name: 'dvlproad' });
                        }}
                >电影</Button>
                <Button type="primary"
                        onPress={() => {
                            navigate('HelathCer',{ name: 'dvlproad' });
                        }}
                >健康证</Button>

            </View>
        );
    }
}