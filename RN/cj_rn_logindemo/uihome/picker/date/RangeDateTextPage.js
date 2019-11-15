// RangeDateTextPage
import  React, { Component } from 'react';
import {Text, ScrollView, View, Dimensions} from 'react-native';
import LKRangeDateText, {LKRangeDateEditingType} from "../../../commonUI/date/LKRangeDateText";
import {
    LKToastUtil,

    LKDatePickShowType,
    LKDatePicker,
    LKDatePickerCreateTimeType,
} from "../../../commonUI/luckincommonui";

export default class RangeDateTextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NNBeginDateString: "2000-02-29",
            NNEndDateString: "2000-02-29",

            BNBeginDateString: "2004-02-29",
            BNEndDateString: "",

            NEBeginDateString: "",
            NEEndDateString: "2008-02-29",

            BEBeginDateString: "2012-02-29",
            BEEndDateString: "2012-03-29",
        };
    }

    /**
     * 测试选择 yyyyMMdd 的日期
     */
    chooseBNBeginDateString=(callback)=>{
        let BNBeginDateString = this.state.BNBeginDateString;
        this.BNBeginDatePicker.showWithDateString(
            BNBeginDateString,
            (dateString)=>{
                LKToastUtil.showMessage(dateString);
                this.setState({
                    BNBeginDateString: dateString,
                });
                callback(dateString);
            }
        )
    }


    actionRangeDateText = ()=>{
        //LKRangeDateEditingType.None
        let NNBeginDateString = this.state.NNBeginDateString;
        let NNEndDateString = this.state.NNEndDateString;

        //LKRangeDateEditingType.Begin
        let BNBeginDateString = this.state.BNBeginDateString;
        let BNEndDateString = this.state.BNEndDateString;

        //LKRangeDateEditingType.End
        let NEBeginDateString = this.state.NEBeginDateString;
        let NEEndDateString = this.state.NEEndDateString;

        //LKRangeDateEditingType.BeginEnd
        let BEBeginDateString = this.state.BEBeginDateString;
        let BEEndDateString = this.state.BEEndDateString;

        return (
            <View
                style={{
                    flex:1,
                    backgroundColor: '#f9fafb',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    // width: Dimensions.get('window').width
                }}
            >
                <Text style={{marginTop: 22}}>可编辑：None</Text>
                <Text>当前选择的起始日期为：{NNBeginDateString}</Text>
                <Text>当前选择的结束日期为：{NNEndDateString}</Text>
                <LKRangeDateText
                    dateRangeEditingType={LKRangeDateEditingType.None}
                    beginDateString={NNBeginDateString}
                    endDateString={NNEndDateString}
                />

                <Text style={{marginTop: 22}}>可编辑：Begin</Text>
                <Text>当前选择的起始日期为：{BNBeginDateString}</Text>
                <Text>当前选择的结束日期为：{BNEndDateString}</Text>
                <LKRangeDateText
                    dateRangeEditingType={LKRangeDateEditingType.Begin}
                    beginDateString={BNBeginDateString}
                    onBeginDatePickChange={ (beginDateString, endDateString)=> {
                        this.setState({
                            BNBeginDateString: beginDateString,
                            BNEndDateString: endDateString
                        })
                    }}
                    onBeginDateChoose={(callback)=>{
                        this.chooseBNBeginDateString(callback);
                    }}
                />


                <Text style={{marginTop: 22}}>可编辑：End</Text>
                <Text>当前选择的起始日期为：{NEBeginDateString}</Text>
                <Text>当前选择的结束日期为：{NEEndDateString}</Text>
                <LKRangeDateText
                    dateRangeEditingType={LKRangeDateEditingType.End}
                    endDateString={NEEndDateString}
                    onEndDatePickChange={ (beginDateString, endDateString)=> {
                        this.setState({
                            NEBeginDateString: beginDateString,
                            NEEndDateString: endDateString
                        })
                    }}
                />

                <Text style={{marginTop: 22}}>可编辑：BeginEnd</Text>
                <Text>当前选择的起始日期为：{BEBeginDateString}</Text>
                <Text>当前选择的结束日期为：{BEEndDateString}</Text>
                <LKRangeDateText
                    dateRangeEditingType={LKRangeDateEditingType.BeginEnd}
                    beginDateString={BEBeginDateString}
                    onBeginDatePickChange={ (beginDateString, endDateString)=> {
                        this.setState({
                            BEBeginDateString: beginDateString,
                            BEEndDateString: endDateString
                        })
                    }}
                    endDateString={BEEndDateString}
                    onEndDatePickChange={ (beginDateString, endDateString)=> {
                        this.setState({
                            BEBeginDateString: beginDateString,
                            BEEndDateString: endDateString
                        })
                    }}
                />
            </View>
        );
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

                {this.actionRangeDateText()}

                <LKDatePicker
                    datePickShowType={LKDatePickShowType.yyyyMMdd}
                    datePickerCreateTimeType={LKDatePickerCreateTimeType.Free}
                    ref={ref => this.BNBeginDatePicker = ref}
                />

            </View>
        );
    }
}
