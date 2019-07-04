//PickRangeDatePage.js
import React, { Component } from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import LKRangeDateComponent, {LKRangeDateEditingType} from '../../commonUI/date/LKRangeDateComponent';

export default class PickRangeDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: '',
            endDateString1: '',

            beginDateString2: "2000-02-29",
            endDateString2: "2000-02-29",

            NNBeginDateString: "2000-02-29",
            NNEndDateString: "2000-02-29",

            BNBeginDateString: "2000-02-29",
            BNEndDateString: "",

            NEBeginDateString: "",
            NEEndDateString: "2000-02-29",

            BEBeginDateString: "2000-02-29",
            BEEndDateString: "2000-03-29",
        };
    }

    render() {
        let beginDateString1 = this.state.beginDateString1;
        let endDateString1 = this.state.endDateString1;

        let beginDateString2 = this.state.beginDateString2;
        let endDateString2 = this.state.endDateString2;

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
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop: 22}}>初始日期：空</Text>
                <Text>当前选择的起始日期为：{beginDateString1}</Text>
                <Text>当前选择的结束日期为：{endDateString1}</Text>
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.Begin}
                                      beginDateString={beginDateString1}
                                      onBeginDatePickChange={ (beginDateString, endDateString)=> {
                                          this.setState({
                                              beginDateString1: beginDateString,
                                              endDateString1: endDateString
                                          })
                                      }}
                />

                <Text style={{marginTop: 22}}>初始日期：有值</Text>
                <Text>当前选择的起始日期为：{beginDateString2}</Text>
                <Text>当前选择的结束日期为：{endDateString2}</Text>
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.Begin}
                                      beginDateString={beginDateString2}
                                      onBeginDatePickChange={ (beginDateString, endDateString)=> {
                                          this.setState({
                                              beginDateString2: beginDateString,
                                              endDateString2: endDateString
                                          })
                                      }}
                />

                <Text style={{marginTop: 22}}>可编辑：None</Text>
                <Text>当前选择的起始日期为：{NNBeginDateString}</Text>
                <Text>当前选择的结束日期为：{NNEndDateString}</Text>
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.None}
                                      beginDateString={NNBeginDateString}
                                      endDateString={NNEndDateString}
                />

                <Text style={{marginTop: 22}}>可编辑：Begin</Text>
                <Text>当前选择的起始日期为：{BNBeginDateString}</Text>
                <Text>当前选择的结束日期为：{BNEndDateString}</Text>
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.Begin}
                                      beginDateString={BNBeginDateString}
                                      onBeginDatePickChange={ (beginDateString, endDateString)=> {
                                          this.setState({
                                              BNBeginDateString: beginDateString,
                                              BNEndDateString: endDateString
                                          })
                                      }}
                />

                <Text style={{marginTop: 22}}>可编辑：End</Text>
                <Text>当前选择的起始日期为：{NEBeginDateString}</Text>
                <Text>当前选择的结束日期为：{NEEndDateString}</Text>
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.End}
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
                <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.BeginEnd}
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


            </ScrollView>
        );
    }
}