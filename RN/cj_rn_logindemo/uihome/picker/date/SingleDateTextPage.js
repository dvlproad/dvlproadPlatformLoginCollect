import React, { Component } from 'react';

import {View} from 'react-native';
import LKToastUtil from "../../../commonUI/toast/LKToastUtil";
import LKSingleDateText from "../../../commonUI/date/LKSingleDateText";

import {
    LKDatePickShowType,
    LKComJSDatePicker
} from "../../../commonUI/luckincommonui";

export default class SingleDateTextPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yyyyMMddDateString: '2004-02-29',
            yyyyMMddHHmmDateString: '2008-02-29 08:08',
            yyyyMMddHHmmssDateString: '2008-02-29 08:08:08',
            yyyyMMDateString: '2008-02',
        }
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center'}}>
                <LKSingleDateText style={{paddingTop: 20, width: 200}}
                                  placeholder={'yyyy-MM-dd'}
                                  chooseDateString={this.state.yyyyMMddDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      LKToastUtil.showMessage('fdfd');
                                      this.yyyyMMddDatePicker.show()
                                  }}
                />

                <LKSingleDateText style={{paddingVertical: 20, paddingHorizontal: 10, width: 200}}
                                  placeholder={'yyyy-MM-dd HH:mm'}
                                  chooseDateString={this.state.yyyyMMddHHmmDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      this.yyyyMMddHHmmDatePicker.show()
                                  }}
                />

                <LKSingleDateText style={{paddingVertical: 20, paddingHorizontal: 10, width: 200}}
                                  placeholder={'yyyy-MM-dd HH:mm:ss'}
                                  chooseDateString={this.state.yyyyMMddHHmmssDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      this.yyyyMMddHHmmssDatePicker.show()
                                  }}
                />

                <LKSingleDateText style={{paddingVertical: 20, paddingHorizontal: 10, width: 200}}
                                  placeholder={'yyyy-MM'}
                                  chooseDateString={this.state.yyyyMMDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      this.yyyyMMDatePicker.show()
                                  }}
                />


                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMdd}
                                   dateString={this.state.yyyyMMddDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           yyyyMMddDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消《年月日》的选择');
                                   }}
                                   ref={ref => this.yyyyMMddDatePicker = ref}
                />


                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMddHHmm}
                                   dateString={this.state.yyyyMMddHHmmDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           yyyyMMddHHmmDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消《年月日时分》的选择');
                                   }}
                                   ref={ref => this.yyyyMMddHHmmDatePicker = ref}
                />

                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMMddHHmmss}
                                   dateString={this.state.yyyyMMddHHmmssDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           yyyyMMddHHmmssDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消《年月日时分秒》的选择');
                                   }}
                                   ref={ref => this.yyyyMMddHHmmssDatePicker = ref}
                />

                <LKComJSDatePicker datePickShowType={LKDatePickShowType.yyyyMM}
                                   dateString={this.state.yyyyMMDateString}
                                   onPickerConfirm={(dateString) => {
                                       LKToastUtil.showMessage(dateString)
                                       this.setState({
                                           yyyyMMDateString: dateString,
                                       })
                                   }}
                                   onPickerCancel={() => {
                                       LKToastUtil.showMessage('取消《年月》的选择');
                                   }}
                                   ref={ref => this.yyyyMMDatePicker = ref}
                />

            </View>
        )
    }
}
