import React, { Component } from 'react';

import {View} from 'react-native';
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import LKComJSDatePicker, {LKDatePickShowType} from "../../commonUI/picker/LKComJSDatePicker";
import LKSingleDateText from "../../commonUI/date/LKSingleDateText";


export default class ComJSSingleDatePage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthdayDateString: '2004-02-29',
            fullDateString: '2008-02-29 08:08:08',
        }
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center'}}>
                <LKSingleDateText style={{paddingTop: 20}}
                                  placeholder={'yyyy-MM-dd'}
                                  chooseDateString={this.state.birthdayDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      LKToastUtil.showMessage('fdfd');
                                      this.birthdayDatePicker.show()
                                  }}
                />

                <LKSingleDateText style={{paddingVertical: 20, paddingHorizontal: 10}}
                                  placeholder={'yyyy-MM-dd HH:mm:ss'}
                                  chooseDateString={this.state.fullDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      this.fullDatePicker.show()
                                  }}
                />

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

            </View>
        )
    }
}