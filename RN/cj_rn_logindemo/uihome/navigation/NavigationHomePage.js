//NavigationNavigation.js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native';


type Props = {};
export default class NavigationHomePage extends Component <Props> {
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




//NavigationPages
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

export const NavigationPages = {
    NavigationHome: {
        screen: NavigationHomePage,
        navigationOptions: () => ({
            title: `NavigationHome`,
        }),
    },
    A: {
        screen: Page1,
        navigationOptions: () => ({
            title: `A(react-native)`,
        }),
    },
    B: {
        screen: Page2,
        navigationOptions: () => ({
            title: `B(@ant-design/react-native)`,
        }),
    },
    C : {
        screen: Page3,
        navigationOptions: (props) => {//在这里定义每个页面的导航属性，动态配置
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;

            return {
                title: params.title ? params.title : '右上角测试专用页',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '编辑'}
                        onPress={() =>
                            setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
                    />
                ),
            }
        },
    },
};
