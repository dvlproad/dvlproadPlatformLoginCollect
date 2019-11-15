import React, { Component } from 'react';

import {View} from 'react-native';
import {
    LKToastUtil,
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKDatePicker,
} from "../../../commonUI/luckincommonui";

import LKSingleDateText from "../../../commonUI/date/LKSingleDateText";
import LKTextButton from "../../../commonUI/button/LKTextButton";


export default class ComJSSingleDatePage21 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthdayDateString: '2004-02-29',
            fullDateString: '2008-02-29 08:08:08',
        }
    }

    /**
     * 测试选择
     */
    chooseDate = () => {
        this.birthdayDatePicker.showWithDateString(
            '',
            (dateString)=>{
                LKToastUtil.showMessage(dateString)
            }
        )
    }

    /**
     * 测试选择 yyyyMMdd 的日期
     */
    chooseBirthday=()=>{
        this.birthdayDatePicker.showWithDateString(
            this.state.birthdayDateString,
            (dateString)=>{
                LKToastUtil.showMessage(dateString);
                this.setState({
                    birthdayDateString: dateString,
                })
            }
        )
    }

    /**
     * 测试选择 yyyyMMddHHmmss 的日期
     */
    chooseFullDate= ()=> {
        this.fullDatePicker.showWithDateString(
            this.state.fullDateString,
            (dateString)=>{
                LKToastUtil.showMessage(dateString)
                this.setState({
                    fullDateString: dateString,
                })
            }
        )
    }


    render() {
        return (
            <View
                style={{
                    flex:1,
                    backgroundColor: '#f9fafb',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LKTextButton
                    style={{ width: 180, backgroundColor:'red'}}
                    title={'yyyyMMdd的日期选择'}
                    onPress={()=>{
                        this.chooseDate();
                    }}
                />

                <LKSingleDateText style={{paddingTop: 20}}
                                  placeholder={'yyyy-MM-dd'}
                                  chooseDateString={this.state.birthdayDateString}
                                  isBankStyle={false}
                                  allowPickDate={true}
                                  onPress={()=>{
                                      this.chooseBirthday();
                                  }}
                />

                <LKSingleDateText
                    style={{paddingVertical: 20, paddingHorizontal: 10}}
                    placeholder={'yyyy-MM-dd HH:mm:ss'}
                    chooseDateString={this.state.fullDateString}
                    isBankStyle={false}
                    allowPickDate={true}
                    onPress={()=>{
                        this.chooseFullDate();
                    }}
                />

                <LKDatePicker
                    datePickShowType={LKDatePickShowType.yyyyMMdd}
                    datePickerCreateTimeType={LKDatePickerCreateTimeType.Free}
                    ref={ref => this.birthdayDatePicker = ref}
                />

                <LKDatePicker
                    datePickShowType={LKDatePickShowType.yyyyMMddHHmmss}
                    ref={ref => this.fullDatePicker = ref}
                />

            </View>
        )
    }
}
