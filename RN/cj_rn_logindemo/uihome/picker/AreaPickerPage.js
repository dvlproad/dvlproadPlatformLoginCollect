// AreaPickerPage.js

import React, { Component } from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKTextButton,
    LKBlueBGButton,
    LKDatePicker,
} from '../../commonUI/luckincommonui';

import AreaJson from '../../CJBaseUIKit/areaPicker/Area.json';
import { CJAreaPicker } from "../../CJBaseUIKit/CJBaseUIKit";


export default class AreaPickerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateString1: '2019-06-06',
            dateString2: '2000-02-29'
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                {/* r*/}
                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={"行政区域picker"}
                    onPress={()=>{
                        this.areaPicker.show()
                    }}
                />

                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={this.state.dateString2}
                    onPress={()=>{
                        this.datePicker.showAllEvent(
                            this.state.dateString2,
                            (dateString)=>{
                                this.setState({
                                    dateString2: dateString
                                })
                            },
                            ()=>{},
                            ()=>{},
                        )
                    }}
                />

                <LKDatePicker ref={ref => this.datePicker = ref} />

                <CJAreaPicker
                    areaJson={AreaJson}
                    onPickerCancel={() => { }}
                    onPickerConfirm={(value) => {
                        alert(JSON.stringify(value));
                    }}
                    ref={ref => this.areaPicker = ref} />

            </View>
        )
    }
}