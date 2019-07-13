import React, { Component } from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LKTextButton from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import DatePicker from "react-native-pickers/view/DatePicker";
import LKDateUtil from "../../commonUtil/LKDateUtil";
import {LKDatePickShowType} from "../../commonUI/picker/LKComJSDatePicker";

var currentShowDateString = '';
var lastShowDateSting = '';
export default class DatePickerPage_00ComJS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }


    renderButton(text, callback) {
        return <TouchableOpacity
            onPress={callback.bind(this)}
            style={{
                width: 180, height: 35,
                justifyContent: 'center', alignItems: 'center',
                borderColor: '#999999', borderWidth: this.mOnePixel,
                padding: 10, backgroundColor: '#cccccc',
                borderRadius: 4, marginBottom: 20
            }}>
            <Text>{text}</Text>
        </TouchableOpacity >
    }

    tryShowDatePicker() {
        if (this.state.show) {
            this.showDatePicker();
        } else {
            this.setState({
                show: true,
            }, () => {
                this.showDatePicker();
            })
        }
    }

    showDatePicker() {
        if (this.birthdayDatePicker) {
            this.birthdayDatePicker.show();
        } else {
            LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    getDatePicker() {
        if (this.state.show) {
            return this.createDatePicker();
        } else {
            return null;
        }
    }

    createDatePicker(){
        let dateString = currentShowDateString;
        let defaultSelectedDate = LKDateUtil.yyyyMMdd_hhmmssDate(dateString);
        return (
            <DatePicker
                HH={false}
                mm={false}
                ss={false}
                unit={['年', '月', '日']}
                startYear={1900}
                selectedValue={
                    [
                        defaultSelectedDate.getFullYear() + '年',
                        defaultSelectedDate.getMonth() + 1 + '月',
                        defaultSelectedDate.getDate() + '日'
                    ]
                }
                onPickerConfirm={(pickedValue) => {
                    let year = pickedValue[0].split('年')[0];

                    let month = pickedValue[1].split('月')[0];
                    month = month < 10 ? ('0' + month) : month;

                    let day = pickedValue[2].split('日')[0];
                    day = day < 10 ? ('0' + day) : day;

                    let dateString = year + '-' + month + '-' + day;;
                    lastShowDateSting = dateString;

                    alert(JSON.stringify(pickedValue) + '\n' + lastShowDateSting);

                }}
                onPickerCancel={() => {
                    LKToastUtil.showMessage('取消');
                }}
                ref={ref => this.birthdayDatePicker = ref}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                <LKTextButton style={{ width: 180, backgroundColor:'red'}}
                              title={'默认选中' + '2019-05-12'}
                              onPress={()=>{
                                  currentShowDateString = '2019-05-12';
                                  this.tryShowDatePicker();
                              }}
                />
                <LKTextButton style={{ width: 180, backgroundColor:'green'}}
                              title={'默认选中' + '2015-11-31'}
                              onPress={()=>{
                                  currentShowDateString = '2015-11-31';
                                  this.tryShowDatePicker();
                              }}
                />
                <LKTextButton style={{ width: 180, backgroundColor:'blue'}}
                              title={'默认选中' + '1989-12-27'}
                              onPress={()=>{
                                  currentShowDateString = '1989-12-27';
                                  this.tryShowDatePicker();
                              }}
                />


                {this.getDatePicker()}

            </View>
        )
    }
}