//TextHomePage.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

export default class TextHomePage extends Component {
    render() {
        let normalText = '常见未特殊配置的文本（会发现不会垂直居中）';
        let horizontalCenterText = '水平居中的文本';
        let verticalCenterText = '竖直居中的文本';
        let singleLineHVCenterText = '单行文本水平&垂直居中';
        let multipleLineHVCenterText1 = '长文本的多行文本垂直居中，长文本的多行文本垂直居中，长文本的多行文本垂直居中，' +
            '长文本的多行文本垂直居中，长文本的多行文本垂直居中，长文本的多行文本垂直居中，' +
            '长文本的多行文本垂直居中，长文本的多行文本垂直居中，长文本的多行文本垂直居中，' +
            '长文本的多行文本垂直居中，长文本的多行文本垂直居中，长文本的多行文本垂直居中，';
        let multipleLineHVCenterText2 = '换行符的多行文本垂直居中\n第二行\n第三行';

        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "center" }}>

                    <View style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
                        <Text style={{
                            width:300,
                            height:44,
                            textAlign: 'center',
                            fontSize: 17,
                            color: '#FFFFFF'
                        }}
                        >
                            100%(设置文本'背景色'的方法)
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontSize: 17,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            backgroundColor: "purple"
                        }}
                    >
                        不设置宽高时候的，是否能居中
                    </Text>

                    <Text style={[styles.normalText, {backgroundColor: "orange"}]}>
                        {normalText}
                    </Text>

                    <Text style={[styles.horizontalCenterText, {backgroundColor: "purple"}]}>
                        {horizontalCenterText}
                    </Text>

                    <Text style={[styles.verticalCenterText, {backgroundColor: "cyan"}]}>
                        {verticalCenterText}
                    </Text>

                    <Text style={[styles.singleLineHVCenterText, {backgroundColor: "red"}]}>
                        {singleLineHVCenterText}
                    </Text>

                    <Text style={[styles.multipleLineHVCenterText, {backgroundColor: "blue"}]}>
                        {multipleLineHVCenterText1}
                    </Text>


                    <Text style={[styles.multipleLineHVCenterText, {backgroundColor: "green"}]}>
                        {multipleLineHVCenterText2}
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    normalText: {               //常见未特殊配置的文本（会发现不会垂直居中）
        height: 44,
        fontSize: 17,
    },
    horizontalCenterText: {     //水平居中的文本
        height: 44,
        fontSize: 17,
        textAlign: 'center',    //添加这行即可使得Text文字水平居中显示
    },
    verticalCenterText: {       //竖直居中的文本
        height: 44,
        fontSize: 17,
        lineHeight:44,	        //添加这行即可使得Text文字垂直居中显示
    },
    singleLineHVCenterText: {   //单行文本水平&垂直居中
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
    },
    multipleLineHVCenterText: { //长文本的多行文本垂直居中
        height: 144,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:144,
        textAlignVertical: 'center',
        // ...Platform.select({
        //     ios: { lineHeight: 100},
        //     android: {}
        // })
    },
});