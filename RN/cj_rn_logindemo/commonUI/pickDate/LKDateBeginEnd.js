//LKDateBeginEnd.js
import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import DatePicker from 'react-native-datepicker'
import DateUtil from "../../commonUtil/DateUtil";
import PropTypes from "prop-types";


export default class LKDateBeginEnd extends Component {
    static propTypes = {
        isEditing: PropTypes.bool,
        beginDateString: PropTypes.string.isRequired,
        onBeginDateChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isEditing: false,
    };


    render() {
        const { style } = this.props;

        let beginDateString = this.props.beginDateString;
        let endDateString = '';
        if (beginDateString.length > 4) {
            let beginDate = DateUtil.parserDateString(beginDateString);
            let endDate = DateUtil.addYears(beginDate, 1);
            endDateString = DateUtil.yyyyMMddString(endDate);
        }


        return (
            <View style={[
                {flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
                style]
            }>
                <CJDemoDatePicker style={{flex: 1}}
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
                <CJDemoDatePicker style={{flex: 1}}
                                  placeholder= {"自动填写"}
                                  chooseDateString={endDateString}
                                  allowPickDate={false}
                />
            </View>
        )
    }
}

class CJDemoDatePicker extends React.Component {
    static propTypes = {
        allowPickDate: PropTypes.bool,
        chooseDateString: PropTypes.string.isRequired,
        onDateChange: PropTypes.func,
    };

    static defaultProps = {
        allowPickDate: false,
    };


    render() {
        const { style } = this.props;

        return (
            <DatePicker
                style={[{flex: 1}, style]}
                disabled={!this.props.allowPickDate}
                placeholder= {this.props.placeholder}
                date={this.props.chooseDateString}
                minDate="1900-01-01"
                maxDate="2300-01-01"

                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}
                customStyles={{
                    dateInput: {
                        borderRadius: 4,
                        borderWidth: this.props.allowPickDate ? 1 : 0,
                        borderColor: "#CCCCCC",
                        backgroundColor: this.props.allowPickDate ? "white" : "#F9F9F9"
                    }
                    // ... You can check the source to find the other keys.
                }}

                onDateChange={(date) => { //
                    if(date.constructor===String) {
                        let dateString = date;
                        // this.setState({chooseDateString: dateString})
                        this.props.onDateChange(dateString);
                    }
                }}
            />
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