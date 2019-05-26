//TextHomePage.js
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class TextHomePage extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#6600ff", flex: 1, flexDirection: "column", justifyContent: "center" }}>
                <Text style={[styles.text, {backgroundColor: "red"}]}>1</Text>
                <Text style={[styles.text, {backgroundColor: "blue"}]}>2</Text>
                <Text style={[styles.text, {backgroundColor: "green"}]}>3</Text>
                <Text style={[styles.text, {backgroundColor: "orange"}]}>4</Text>
                <Text style={[styles.text, {backgroundColor: "purple"}]}>5</Text>
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
        width: 60,
        height: 44,
        lineHeight:44,	//添加这行即可使得Text文字垂直居中显示
        fontSize: 17,
    }
});