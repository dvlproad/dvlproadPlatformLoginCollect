import React, { Component } from 'react';

import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LKTextButton from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import LKComJSDatePicker, {LKDatePickShowType} from "../../commonUI/picker/LKComJSDatePicker";
import LKSingleDateComponent from "../../commonUI/date/LKSingleDateComponent";


export default class ComJSSingleDatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthdayDateString: '2004-02-29',
            fullDateString: '2008-02-29 08:08:08',
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
                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMdd}
                                   dateString={this.state.birthdayDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           birthdayDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消');
                                   }}
                                   ref={ref => this.birthdayDatePicker = ref}
                />

                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMddHHmmss}
                                   dateString={this.state.fullDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           fullDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消');
                                   }}
                                   ref={ref => this.fullDatePicker = ref}
                />

                <LKTextButton title={'yyyyMMdd的日期选择'}
                              onPress={()=>{
                                  this.birthdayDatePicker.show()
                              }}
                />

                <LKSingleDateComponent style={{paddingTop: 20}}
                                       placeholder={'yyyy-MM-dd'}
                                       chooseDateString={this.state.birthdayDateString}
                                       isBankStyle={false}
                                       allowPickDate={true}
                                       onPress={()=>{
                                                this.birthdayDatePicker.show()
                                            }}
                />

                <LKSingleDateComponent style={{paddingTop: 20}}
                                       placeholder={'yyyy-MM-dd HH:mm:ss'}
                                       chooseDateString={this.state.fullDateString}
                                       isBankStyle={false}
                                       allowPickDate={true}
                                       onPress={()=>{
                                                this.fullDatePicker.show()
                                            }}
                />

            </View>
        )
    }
}