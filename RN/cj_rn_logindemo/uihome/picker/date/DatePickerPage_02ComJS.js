// DatePickerPage_01ComJS.js

import React, { Component } from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKTextButton,
    LKBlueBGButton,
    LKDatePicker,
} from '../../../commonUI/luckincommonui';

import CJBaseBottomPiker from '../../../CJBaseUIKit/base/CJBaseBottomPicker';



export default class DatePickerPage_02ComJS extends Component {

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

                    }}
                />


                <LKDatePicker style={{width:300, height:300, backgroundColor: 'green'}}
                              shouldCreateItRightNow={true}
                />




            </View>
        )
    }
}
