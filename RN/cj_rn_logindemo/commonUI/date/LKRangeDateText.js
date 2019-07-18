// LKRangeDateText.js
/* 使用示例
import LKRangeDateText  from '../../commonUI/date/LKRangeDateText';

export default class OwnNativeActionRangeDateTextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
            endDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKRangeDateText dateRangeEditingType={LKRangeDateEditingType.Begin}
                                  beginDateString={this.state.beginDateString1}
                                  onBeginDatePickChange={ (beginDateString, endDateString)=> {
                                      this.setState({
                                          beginDateString1: beginDateString,
                                          endDateString1: endDateString
                                      })
                                  }}
            />
        );
    }
}
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import LKDateUtil from '../../commonUtil/LKDateUtil';
import LKToastUtil from "../toast/LKToastUtil";
import LKSingleDateText from "./LKSingleDateText";

/**< 日期范围的编辑状态 */
export var LKRangeDateEditingType = {
    None: 0,     /**< 没有编辑状态的日期 */
    Begin: 1,    /**< 编辑起始日期中 */
    End: 2,      /**< 编辑终止日期中 */
    BeginEnd: 3  /**< 编辑起始和终止日期中 */
}

/**
 * 范围日期选择控件
 */
export default class LKRangeDateText extends Component {
    static propTypes = {
        dateRangeEditingType: PropTypes.number,

        beginDateString: PropTypes.string,
        beginMaxDateString: PropTypes.string,
        onBeginDatePickChange: PropTypes.func,
        onBeginDateAutoChange: PropTypes.func,  // 开始日期根据开始日期自动变化(仅在LKRangeDateEditingType.End下有效)

        endDateString: PropTypes.string,
        endMinDateString: PropTypes.string,
        onEndDatePickChange: PropTypes.func,
        onEndDateAutoChange: PropTypes.func,  // 结束日期根据开始日期自动变化(仅在LKRangeDateEditingType.Begin下有效)

        keepAlwaysWaveLine: PropTypes.bool,     // 是否始终显示成波浪线(如果否，则在在某个值是输入的情况下，会显示直线)


        onBeginDateChoose: PropTypes.func,      //选择开始日期的时间(参数为callback,callback的参数为新的newBeginDateString)
        onEndDateChoose: PropTypes.func,        //选择开始日期的时间(参数为callback,callback的参数为为新的newEndDateString)
    };

    static defaultProps = {
        dateRangeEditingType: LKRangeDateEditingType.Begin,

        beginMaxDateString: "2300-01-01",
        endMinDateString: "1900-01-01",

        keepAlwaysWaveLine: false,

        onBeginDateChoose: null,
        onEndDateChoose: null,
    };

    // 结束日期根据开始日期自动变化(仅在LKRangeDateEditingType.Begin下有效)
    autoUpdateEndDate=(beginDateString)=>{
        let endDateString = '';
        if (beginDateString && beginDateString.length > 4) {
            if (this.props.onEndDateAutoChange) {
                endDateString = this.props.onEndDateAutoChange(beginDateString);
            } else {
                let beginDate = LKDateUtil.yyyyMMdd_hhmmssDate(beginDateString);
                let endDate = LKDateUtil.addYears(beginDate, 1);
                endDateString = LKDateUtil.yyyyMMddString(endDate);
            }
        }
        return endDateString;
    }

    // 开始日期根据开始日期自动变化(仅在LKRangeDateEditingType.End下有效)
    autoUpdateBeginDate=(endDateString)=>{
        let beginDateString = '';
        if (endDateString && endDateString.length > 4) {
            if (this.props.onBeginDateAutoChange) {
                beginDateString = this.props.onBeginDateAutoChange(endDateString);
            } else {
                let endDate = LKDateUtil.yyyyMMdd_hhmmssDate(endDateString);
                let beginDate = LKDateUtil.addYears(endDate, -1);
                beginDateString = LKDateUtil.yyyyMMddString(beginDate);
            }
        }
        return beginDateString;
    }

    // 判断是否可以更新日期(主要进行日期大小的比较)
    checkCouldUpdateDate=(beginDateString, endDateString)=>{
        return true;
    }


    render() {
        const { style } = this.props;

        let beginDateString = this.props.beginDateString;
        let endDateString = this.props.endDateString;

        let allowPickDateForBegin = false;
        let allowPickDateForEnd = false;
        let showWave = false;
        switch (this.props.dateRangeEditingType) {
            case LKRangeDateEditingType.Begin: {
                allowPickDateForBegin = true;
                allowPickDateForEnd = false;
                showWave = true;

                endDateString = this.autoUpdateEndDate(beginDateString);
                break;
            }
            case LKRangeDateEditingType.End: {
                allowPickDateForBegin = false;
                allowPickDateForEnd = true;
                showWave = false;

                beginDateString = this.autoUpdateBeginDate(endDateString);
                break;
            }
            case LKRangeDateEditingType.BeginEnd: {
                allowPickDateForBegin = true;
                allowPickDateForEnd = true;
                showWave = false;
                break;
            }
            default: {
                allowPickDateForBegin = false;
                allowPickDateForEnd = false;
                showWave = false;
            }
        }

        if (this.props.keepAlwaysWaveLine) {
            showWave = true;
        }


        let beginMaxDateString = this.props.beginMaxDateString;
        let endMinDateString = this.props.endDateString;
        let isSecondDateLater = LKDateUtil.compareSecondyyyyMMddDateStringLater(beginMaxDateString, endMinDateString);
        if (isSecondDateLater) {
            endMinDateString = beginMaxDateString;
        }

        return (
            <View style={
                [{flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
                    style]
            }>
                <LKSingleDateText
                    style={{flex: 1}}
                    isBankStyle={false}
                    placeholder= {"选择日期"}
                    chooseDateString={beginDateString}
                    allowPickDate={allowPickDateForBegin}
                    onPress={()=>{
                        if (this.props.onBeginDateChoose) {
                            this.props.onBeginDateChoose((dateString)=>{
                                let beginDateString = dateString;

                                let endDateString = this.props.endDateString;
                                if (this.props.dateRangeEditingType == LKRangeDateEditingType.Begin) {
                                    endDateString = this.autoUpdateEndDate(beginDateString);
                                }

                                let allowUpdate = this.checkCouldUpdateDate(beginDateString, endDateString);
                                if (allowUpdate) {
                                    this.props.onBeginDatePickChange(beginDateString, endDateString);
                                } else {
                                    LKToastUtil.showMessage('请重新选择，不满足起始日期小于结束日期');
                                }
                            })
                        } else {
                            LKToastUtil.showMessage("请完善开始日期的点击事件 onBeginDateChoose");
                        }
                    }}
                />


                <LKDateConnectView
                    style={{width: 14, marginHorizontal: 10}}
                    showWave={showWave}
                />

                <LKSingleDateText
                    style={{flex: 1}}
                    isBankStyle={false}
                    placeholder= {"自动填写"}
                    chooseDateString={endDateString}
                    allowPickDate={allowPickDateForEnd}
                    onPress={()=>{
                        if (this.props.onEndDateChoose) {
                            this.props.onEndDateChoose((dateString)=>{
                                let endDateString = dateString;

                                let beginDateString = this.props.beginDateString;
                                if (this.props.dateRangeEditingType == LKRangeDateEditingType.End) {
                                    beginDateString = this.autoUpdateBeginDate(endDateString);
                                }

                                let allowUpdate = this.checkCouldUpdateDate(beginDateString, endDateString);
                                if (allowUpdate) {
                                    this.props.onEndDatePickChange(beginDateString, endDateString);
                                } else {
                                    LKToastUtil.showMessage('请重新选择，不满足起始日期小于结束日期');
                                }
                            })
                        } else {
                            LKToastUtil.showMessage("请完善结束日期的点击事件 onEndDateChoose");
                        }
                    }}
                />
            </View>
        )
    }
}

// 范围日期之间的连接线
class LKDateConnectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWave: true
        };
    }

    render() {
        const { style } = this.props;

        let lineWidth = 14;
        if (this.props.style && this.props.style.width) {
            lineWidth = this.props.style.width;
        }

        let dateConnectView = this.props.showWave ?
            (
                <Image
                    style={{width: lineWidth, height: 5}}
                    source={require('./resources/dateConnectWave.png')}
                />
            )
            :
            (
                <View
                    style={{width: lineWidth, height: 1, backgroundColor: "black"}}
                />
            );


        return (
            <View
                style={[{
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
                }, style]}
            >
                {dateConnectView}
            </View>
        )
    }
}





const styles = StyleSheet.create({
    view: {
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
    },

    enableDateInput: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        backgroundColor: "white"
    },

    disableDateInput: {
        borderWidth: 10,
        backgroundColor: "#F9F9F9"

    }

})