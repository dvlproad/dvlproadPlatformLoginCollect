//DateFormatterPage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import LKDateUtil from "../../commonUtil/LKDateUtil";

export default class DateFormatterPage extends Component {
    render() {
        // 日期创建
        let date1 = new Date();
        let date2 = LKDateUtil.yyyyMMddDate("2000-02-29");

        // 日期转字符串
        let dateStringShort1 = LKDateUtil.yyyyMMddString(date1);
        let dateStringLong1 = LKDateUtil.yyyyMMdd_hhmmssString(date1);

        let dateStringShort2 = LKDateUtil.yyyyMMddString(date2);
        let dateStringLong2 = LKDateUtil.yyyyMMdd_hhmmssString(date2);

        // 日期计算
        let endDate = LKDateUtil.addYears(date1, 1);
        let endDateStringShort1 = LKDateUtil.yyyyMMddString(endDate);
        let endDateStringLong1 = LKDateUtil.yyyyMMdd_hhmmssString(endDate);

        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "flex-start" }}>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{dateStringShort1}</Text>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{dateStringLong1}</Text>
                    <Text style={[styles.text, {backgroundColor: "red"}]}>{dateStringShort2}</Text>
                    <Text style={[styles.text, {backgroundColor: "red"}]}>{dateStringLong2}</Text>

                    <Text style={[styles.text, {backgroundColor: "green"}]}>{endDateStringShort1}</Text>
                    <Text style={[styles.text, {backgroundColor: "green"}]}>{endDateStringLong1}</Text>

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