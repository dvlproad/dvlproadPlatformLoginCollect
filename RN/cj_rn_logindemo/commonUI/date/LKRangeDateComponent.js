// LKRangeDateComponent.js
/* 使用示例
import LKRangeDateComponent  from '../../commonUI/date/LKRangeDateComponent';

export default class PickRangeDatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDateString1: "2000-02-29",
        };
    }

    render() {
        return (
            <LKRangeDateComponent isEditing={true}
                                  beginDateString={this.state.beginDateString1}
                                  onBeginDateChange={ (date)=> {
                                    this.setState({
                                        beginDateString1: date
                                    })
                                }}
            />
        );
    }
}
 */
import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import LKDateUtil from '../../commonUtil/LKDateUtil';
import PropTypes from "prop-types";
import LKSingleDateComponent from "./LKSingleDateComponent";


export default class LKRangeDateComponent extends Component {
    static propTypes = {
        isEditing: PropTypes.bool,
        beginDateString: PropTypes.string,
        onBeginDateChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isEditing: false,
    };


    render() {
        const { style } = this.props;

        let beginDateString = this.props.beginDateString;
        let endDateString = '';
        if (beginDateString && beginDateString.length > 4) {
            let beginDate = LKDateUtil.parserDateString(beginDateString);
            let endDate = LKDateUtil.addYears(beginDate, 1);
            endDateString = LKDateUtil.yyyyMMddString(endDate);
        }


        return (
            <View style={[
                {flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
                style]
            }>
                <LKSingleDateComponent style={{flex: 1}}
                                       placeholder= {"选择日期"}
                                       chooseDateString={beginDateString}
                                       allowPickDate={this.props.isEditing}
                                       onDateChange={ (date) => {
                                      this.props.onBeginDateChange(date)
                                  }}
                />
                <DateConnectView style={{width: 20, marginHorizontal: 10}}
                                 showWave={this.props.isEditing}
                />
                <LKSingleDateComponent style={{flex: 1}}
                                       placeholder= {"自动填写"}
                                       chooseDateString={endDateString}
                                       allowPickDate={false}
                />
            </View>
        )
    }
}


class DateConnectView extends React.Component {
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