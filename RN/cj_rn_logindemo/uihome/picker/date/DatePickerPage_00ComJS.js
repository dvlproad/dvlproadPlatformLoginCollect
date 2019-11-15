import React, { Component } from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';

import CJDatePickerView from "../../../CJBaseUIKit/datePicker/CJDatePickerView";

import {
    LKToastUtil,
    LKTextButton,
    LKBlueBGButton,
} from '../../../commonUI/luckincommonui';

import {
    LKDateUtil,
} from '../../../commonUtil/luckincommonutil';


var currentShowDateString = '';
var lastShowDateSting = '';
/**
 * 用于测试只用一个日期选择器时候，能不能根据日期来正确更新，而不是说就得多个日期选择器
 */
export default class DatePickerPage_00ComJS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            needCreate: false,
            currentShowDateString: '',

            rerenderFlag: false,
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
        // 先判断是否已经创建了，只有创建了才能调用显示方法
        if (this.state.needCreate) {
            this.showDatePicker();

            // 如果不设置setState无法，重新render选择器
            // this.setState({
            //     needCreate: true,
            // }, () => {
            //     this.showDatePicker();
            // })
        } else {
            this.setState({
                needCreate: true,
            }, () => {
                this.showDatePicker();
            })
        }
    }

    showDatePicker() {
        if (this.birthdayDatePicker) {
            let dateString = currentShowDateString;
            this.birthdayDatePicker.updateDefaultSelectedDateString(dateString);

            this.birthdayDatePicker.show();


        } else {
            LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    getDatePicker() {
        if (this.state.needCreate) {
            return this.createDatePicker();
        } else {
            return null;
        }
    }

    createDatePicker(){
        let dateString = currentShowDateString;
        let defaultSelectedDate = LKDateUtil.yyyyMMdd_hhmmssDate(dateString);
        return (
            <CJDatePickerView
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
                <Text>{'是否重新加载' + this.state.rerenderFlag}</Text>
                <LKBlueBGButton style={{ width: 280}}
                                title={'尝试重绘日期选择器重绘成功来更新弹出时候的选中日期'}
                                onPress={()=>{
                                    this.setState({
                                        needCreate: false,
                                    }, ()=> {
                                        LKToastUtil.showMessage('日期选择器重绘成功')
                                    })
                                }}
                />

                <LKTextButton style={{ width: 180, backgroundColor:'red'}}
                              title={'默认选中' + '2019-02-28'}
                              onPress={()=>{
                                  currentShowDateString = '2019-02-28';
                                  this.tryShowDatePicker();
                              }}
                />
                <LKTextButton style={{ width: 180, backgroundColor:'green'}}
                              title={'默认选中' + '2015-11-30'}
                              onPress={()=>{
                                  currentShowDateString = '2015-11-30';
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
