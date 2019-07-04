//DateMomentPage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import moment from 'moment';

export default class DateMomentPage extends Component {
    render() {
        let momentAddDay1 = moment().add(1, 'days').calendar();
        let momentAddDay2 = moment().add(2, 'days').calendar();
        let momentAddDay3 = moment().add(3, 'days').calendar();
        let momentAddDay4 = moment().add(4, 'days').calendar();
        let momentAddDay5 = moment().add(5, 'days').calendar();
        let momentAddDay6 = moment().add(6, 'days').calendar();
        let momentAddDay7 = moment().add(7, 'days').calendar();
        let momentAddDay30 = moment().add(30, 'days').calendar();

        let now = new Date();
        let momentAddYear1 = moment().add(1,'years').now;

        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "flex-start" }}>
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