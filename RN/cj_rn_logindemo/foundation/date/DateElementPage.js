//DateElementPage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import LKDateUtil from "../../commonUtil/LKDateUtil";

export default class DateElementPage extends Component {
    getDateShowString = (date)=>{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let dateShowString = year+'年' + '-' + month+'月' + '-' + day+'日';
        return dateShowString;
    }

    render() {
        // 日期创建
        let date1 = LKDateUtil.yyyyMMdd_hhmmssDate("2000-02-29");

        // 日期转字符串
        let dateStringLong1 = LKDateUtil.yyyyMMdd_hhmmssString(date1);

        // 获取年月日
        let dateShowString1 = this.getDateShowString(date1);

        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "flex-start" }}>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{dateStringLong1}</Text>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{dateShowString1}</Text>

                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    background: {
        backgroundColor: "#6600ff",
    },
    text: {
        backgroundColor: "#dd8822",
        width: 260,
        height: 44,
        lineHeight:44,	//添加这行即可使得Text文字垂直居中显示
        fontSize: 17,
    }
});