//ButtonColorPage.js
import React, {Component} from 'react';
import {
    Button,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {
    LKWhiteBGButton,
    LKBlueBGButton,
}

from "../../commonUI/luckincommonui"

export default class ButtonColorPage extends Component {
    render() {
        return (

            <ScrollView style={{backgroundColor: "green", paddingHorizontal: 15}}>
                <View style={{backgroundColor: 'red'}}>
                    <Button style={{flex: 1}}
                            title={"测试按钮文字颜色的设置2"}
                            color={"white"}
                    />
                </View>

                <View style={{backgroundColor: 'red'}}>
                    <TouchableOpacity style={{backgroundColor:'#F9F9F9', flex:1}}>
                        <Text style={{backgroundColor: "#F9F9F9", flex:1}}>
                            测试指定背景色的日期文本
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, flexDirection: 'row',  backgroundColor: "cyan"}}>
                    <View style={{backgroundColor: 'red',flex: 1}}>
                        <Button
                            style={{ height: 34, marginRight: 10, backgroundColor: "red" }}
                            title='按钮1'
                        />
                    </View>

                    <View style={{backgroundColor: 'red',flex: 1}}>
                        <Button
                            style={{ height: 34, marginRight: 10, backgroundColor: "blue" }}
                            title='按钮2'
                        />
                    </View>

                    <View style={{backgroundColor: 'red',flex: 2}}>
                        <Button
                            style={{  height: 34, backgroundColor: "yellow" }}
                            title={'开始按钮'}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row',  backgroundColor: "cyan"}}>
                    <LKWhiteBGButton
                        style={{ flex: 1, height: 34, marginRight: 10, backgroundColor: "red" }}
                        title='按钮1'
                    />

                    <LKWhiteBGButton
                        style={{ flex: 1, height: 34, marginRight: 10, backgroundColor: "blue" }}
                        title='按钮2'
                    />

                    <LKBlueBGButton
                        style={{ flex: 2, height: 34, backgroundColor: "yellow" }}
                        title={'开始按钮'}
                    />
                </View>
            </ScrollView>

        );
    }
}