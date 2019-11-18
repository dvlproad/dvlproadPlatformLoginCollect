// DatePickerPage_01ComJS.js

import React, { Component } from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKTextButton,
    LKBlueBGButton,
} from '../../../commonUI/luckincommonui';

import {
    LKDatePicker,
} from '../../../lkcui/lkcui';

import CJBaseBottomPiker from '../../../CJBaseUIKit/base/CJBaseBottomPicker';



export default class DatePickerPage_01ComJS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dealIndex: 0,
            dateString1: '2019-06-06',
            dateString2: '2000-02-29'
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={this.state.dateString1}
                    onPress={()=>{
                        this.state.dealIndex = 0;
                        this.datePicker.showWithDateString(this.state.dateString1);
                    }}
                />

                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={this.state.dateString2}
                    onPress={()=>{
                        this.state.dealIndex = 1;
                        this.datePicker.show();
                    }}
                />

                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={this.state.dateString2}
                    onPress={()=>{
                        this.state.dealIndex = 1;
                        this.datePicker.showWithNoCover();
                    }}
                />

                <LKDatePicker ref={ref => this.datePicker = ref}
                              onPickerConfirm={(dateString)=>{
                                  if (this.state.dealIndex == 0) {
                                      this.setState({
                                          dateString1: dateString
                                      })
                                  } else if (this.state.dealIndex == 1) {
                                      this.setState({
                                          dateString2: dateString
                                      })
                                  }
                              }}
                />



            </View>
        )
    }
}
