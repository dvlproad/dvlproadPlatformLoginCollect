//DateHomePage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import LKDateUtil from "../../commonUtil/LKDateUtil";
import moment from 'moment';

export default class DateHomePage extends Component {
    render() {
        let date = LKDateUtil.parserDateString("2019-01-01");
        let yyyyMMddString = LKDateUtil.yyyyMMddString(date);
        let yyyyMMdd_hhmmssString = LKDateUtil.yyyyMMdd_hhmmssString(date);

        let beginDateString1 = "2000-02-29";
        let beginDate = LKDateUtil.parserDateString(beginDateString1);
        let beginDateString2 = LKDateUtil.yyyyMMdd_hhmmssString(beginDate);
        let endDate = LKDateUtil.addYears(beginDate, 1);
        let endDateString = LKDateUtil.yyyyMMdd_hhmmssString(endDate);

        let momentAddDay1 = moment().add(1, 'days').calendar();
        let momentAddDay2 = moment().add(2, 'days').calendar();
        let momentAddDay3 = moment().add(3, 'days').calendar();
        let momentAddDay4 = moment().add(4, 'days').calendar();
        let momentAddDay5 = moment().add(5, 'days').calendar();
        let momentAddDay6 = moment().add(6, 'days').calendar();
        let momentAddDay7 = moment().add(7, 'days').calendar();
        let momentAddDay30 = moment().add(30, 'days').calendar();

        let now = new Date();
        let momentAddYear1 =moment().add(1,'years').now;

        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "flex-start" }}>

                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{yyyyMMddString}</Text>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>{yyyyMMdd_hhmmssString}</Text>

                    <Text style={[styles.text, {backgroundColor: "red"}]}>{beginDateString1}</Text>
                    <Text style={[styles.text, {backgroundColor: "red"}]}>{beginDateString2}</Text>
                    <Text style={[styles.text, {backgroundColor: "red"}]}>{endDateString}</Text>

                    <Text style={[styles.text, {backgroundColor: "green"}]}>{momentAddDay1}</Text>
                    <Text style={[styles.text, {backgroundColor: "orange"}]}>{momentAddDay2}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay3}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay4}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay5}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay6}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay7}</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddDay30}</Text>

                    <Text style={[styles.text, {backgroundColor: "purple"}]}>{momentAddYear1}</Text>
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