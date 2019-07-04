//PickComSingleDatePage.js
import React, { Component } from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import LKComSingleDateComponent from "../../commonUI/date/LKComSingleDateComponent";
import Picker from 'react-native-picker';

export default class PickComSingleDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: '',
            beginDateString2: "2000-02-29",
        };
    }

    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerFontColor: [255, 0 ,0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }


    render() {
        let beginDateString1 = this.state.beginDateString1;
        let beginDateString2 = this.state.beginDateString2;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>

                <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showDatePicker.bind(this)}>
                    <Text>DatePicker</Text>
                </TouchableOpacity>

                <Text style={{marginTop: 22}}>当前选择的起始日期为：{beginDateString1}</Text>
                <LKComSingleDateComponent style={{flex: 1, marginTop: 10}}
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
                <LKComSingleDateComponent style={{flex: 1, marginTop: 10}}
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