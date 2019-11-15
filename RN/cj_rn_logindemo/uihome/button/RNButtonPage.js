//RNButtonPages.js
import React, {Component} from 'react';
import {ScrollView, Button, Text, View, TouchableWithoutFeedback} from 'react-native';
import {
    LKDemoScrollHomeComponent
} from '../../commonUIEmployee/commonUIEmployee';

export default class RNButtonPage extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
                <View style={{backgroundColor: "#01ADFE", marginTop: 20}}>
                    <Button
                        style={{
                            flex: 1,
                            backgroundColor: "red", //按钮背颜色不在此设置
                            color: "white"          //按钮文字颜色不在此设置
                        }}
                        title={"测试按钮文字颜色的设置"}
                        color={"white"}
                    />
                </View>



                <View style={{backgroundColor: "#01ADFE4C", marginTop: 40}}>
                    <Button
                        style={{flex: 1}}
                        title={"查看disable下的按钮《白色》文字颜色的变化"}
                        color={"white"}
                        disabled={true}         //按钮disable后
                    />
                </View>

                <TouchableWithoutFeedback>
                    <View style={{backgroundColor: "#01ADFE", marginTop: 10}}>
                        <Button
                            style={{flex: 1}}
                            title={"测试disable下的按钮文字颜色修改"}
                            color={"white"}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{backgroundColor: "#01ADFE4C"}}>
                    <Button
                        style={{flex: 1}}
                        title={"测试disable下的按钮文字颜色修改"}
                        color={"#FFFFFF"}
                        //disabled={true}
                        onPress={null}
                    />
                </View>


                <View style={{paddingTop: 60, alignItems: 'center'}}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            marginBottom: 30,
                            width: 260,
                            alignItems: 'center',
                            backgroundColor: '#2196F3'
                        }}>
                            <Text
                                style={{padding: 20, color: 'white'}}
                            >
                                TouchableWithoutFeedback
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ height: 64, width: 64, borderRadius: 12, backgroundColor:'#ff0000', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:24, textAlign:'center', backgroundColor:"green"}}>1</Text>
                </View>
            </ScrollView>
        );
    }
}
