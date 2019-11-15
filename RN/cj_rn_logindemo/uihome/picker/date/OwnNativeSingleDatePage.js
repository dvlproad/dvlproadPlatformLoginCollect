//OwnNativeSingleDatePage.js
import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import {LKOwnNativeActionSingleDateText} from "../../../commonUI/luckincommonui";

export default class OwnNativeSingleDatePage extends Component {
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
                <LKOwnNativeActionSingleDateText style={{flex: 1, marginTop: 10}}
                                                 placeholder= {"选择日期"}
                                                 chooseDateString={beginDateString1}
                                                 allowPickDate={true}
                                                 onDateChange={ (date) => {
                                                     this.setState({
                                                         beginDateString1: date
                                                     })
                                                 }}
                                                 isBankStyle={false}
                />

                <Text style={{marginTop: 22}}>当前选择的起始日期为：{beginDateString2}</Text>
                <LKOwnNativeActionSingleDateText style={{flex: 1, marginTop: 10}}
                                                 placeholder= {"选择日期"}
                                                 chooseDateString={beginDateString2}
                                                 allowPickDate={true}
                                                 onDateChange={ (date) => {
                                                     this.setState({
                                                         beginDateString2: date
                                                     })
                                                 }}
                                                 isBankStyle={true}
                />

            </ScrollView>
        );
    }
}
