import React, { Component } from 'react';

import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LKTextButton from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import LKComJSDatePicker from "../../commonUI/picker/LKComJSDatePicker";


export default class ComJSSingleDatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unit: ['年', '月', '日'],
            startYear: 1900,
            active: false,
            modalVisible: false
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

    render() {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        return (
            <View style={{flex:1, backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center'}}>
                <LKComJSDatePicker dateString={'2000-02-29'}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消');
                                   }}
                                   ref={ref => this.birthdayDatePicker = ref}
                />

                <LKTextButton title={'yyyyMMdd的日期选择'}
                              onPress={()=>{
                                  this.birthdayDatePicker.show()
                              }}
                />
            </View>
        )
    }
}