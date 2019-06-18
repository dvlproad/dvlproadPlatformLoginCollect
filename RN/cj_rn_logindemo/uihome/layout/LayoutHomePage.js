//LayoutHomePage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import { EnableBlueButton } from '../../commonUI/button/LKEditSubmitButton'

export default class LayoutHomePageHomePage extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start"}}>
                <View style={{backgroundColor: "#ff88ee", height: 150 }}>
                    <EnableBlueButton style={styles.button} submitTitle={"column"} />
                </View>
                <View style={{backgroundColor: "#6600ff", flex: 5, flexDirection: "column", justifyContent: "center" }}>
                    <Text style={[styles.text, {backgroundColor: "red"}]}>1</Text>
                    <Text style={[styles.text, {backgroundColor: "blue"}]}>2</Text>
                    <Text style={[styles.text, {backgroundColor: "green"}]}>3</Text>
                    <Text style={[styles.text, {backgroundColor: "orange"}]}>4</Text>
                    <Text style={[styles.text, {backgroundColor: "purple"}]}>5</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    background: {
        backgroundColor: "#6600ff",
    },
    button: {
        backgroundColor: "orange",
        flex: 1,
    },
    text: {
        backgroundColor: "#dd8822",
        width: 60,
        height: 44,
        lineHeight:44,	//添加这行即可使得Text文字垂直居中显示
        fontSize: 17,
    }
});