//PickWeightPage.js
import React, { Component } from 'react';
import {Text, ScrollView, Picker} from 'react-native';

export default class PickWeightPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: '',
            beginDateString2: "2000-02-29",
        };
    }

    render() {
        let beginDateString1 = this.state.beginDateString1;
        let beginDateString2 = this.state.beginDateString2;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop: 22}}>当前选择的起始日期为：{beginDateString1}</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>


            </ScrollView>
        );
    }
}