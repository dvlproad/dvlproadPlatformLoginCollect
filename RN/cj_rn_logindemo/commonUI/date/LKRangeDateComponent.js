// LKRangeDateComponent.js
/* 使用示例
import LKRangeDateComponent  from '../../commonUI/date/LKRangeDateComponent';

export default class PickRangeDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
            endDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKRangeDateComponent dateRangeEditingType={LKRangeDateEditingType.Begin}
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
import LKOwnSingleDateComponent from "./LKOwnSingleDateComponent";
import LKToastUtil from "../toast/LKToastUtil";

/**< 日期范围的编辑状态 */
export var LKRangeDateEditingType = {
    None: 0,     /**< 没有编辑状态的日期 */
    Begin: 1,    /**< 编辑起始日期中 */
    End: 2,      /**< 编辑终止日期中 */
    BeginEnd: 3  /**< 编辑起始和终止日期中 */
}

export default class LKRangeDateComponent extends Component {
    static propTypes = {
        dateRangeEditingType: PropTypes.number,

        beginDateString: PropTypes.string,
        onBeginDatePickChange: PropTypes.func,
        onBeginDateAutoChange: PropTypes.func,  // 开始日期根据开始日期自动变化(仅在LKRangeDateEditingType.End下有效)

        endDateString: PropTypes.string,
        onEndDatePickChange: PropTypes.func,
        onEndDateAutoChange: PropTypes.func,  // 结束日期根据开始日期自动变化(仅在LKRangeDateEditingType.Begin下有效)
    };

    static defaultProps = {
        dateRangeEditingType: LKRangeDateEditingType.Begin,
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


        return (
            <View style={
                [{flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
                    style]
            }>
                <LKOwnSingleDateComponent style={{flex: 1}}
                                          placeholder= {"选择日期"}
                                          chooseDateString={beginDateString}
                                          allowPickDate={allowPickDateForBegin}
                                          onDateChange={ (date) => {
                                           let beginDateString = date;

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
                                       }}
                />
                <LKDateConnectView style={{width: 20, marginHorizontal: 10}}
                                   showWave={showWave}
                />
                <LKOwnSingleDateComponent style={{flex: 1}}
                                          placeholder= {"自动填写"}
                                          chooseDateString={endDateString}
                                          allowPickDate={allowPickDateForEnd}
                                          onDateChange={ (date) => {
                                           let endDateString = date;

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
                                       }}
                />
            </View>
        )
    }
}


class LKDateConnectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWave: true
        };
    }

    render() {
        const { style } = this.props

        let dateConnectView = this.props.showWave ?
            <View
                style={{width: 20, height: 1, backgroundColor: "black"}}
            />
            :
            <Image
                style={{width: 20, height: 5}}
                source={require('./resources/dateConnectWave.png')}
            />

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