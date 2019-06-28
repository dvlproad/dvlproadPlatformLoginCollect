//PickDateRangePage.js
import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import LKRangeDateComponent  from '../../commonUI/date/LKRangeDateComponent'

export default class PickDateRangePage extends Component {
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
                <LKRangeDateComponent isEditing={true}
                                      beginDateString={beginDateString1}
                                      onBeginDateChange={ (date)=> {
                                        this.setState({
                                            beginDateString1: date
                                        })
                                    }}
                />

                <Text style={{marginTop: 22}}>当前选择的起始日期为：{beginDateString2}</Text>
                <LKRangeDateComponent isEditing={true}
                                      beginDateString={beginDateString2}
                                      onBeginDateChange={ (date)=> {
                                        this.setState({
                                            beginDateString2: date
                                        })
                                        //Alert.alert(newBeginDateString);
                                    }}
                />


            </ScrollView>
        );
    }
}