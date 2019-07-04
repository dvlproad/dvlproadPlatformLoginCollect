//ButtonColorPage.js
import React, {Component} from 'react';
import {
    Button,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

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
            </ScrollView>

        );
    }
}