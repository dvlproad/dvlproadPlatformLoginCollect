//cjdemoDateBeginEnd.js
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import DateUtil from "../../commonUtil/DateUtil";

// const {width, height} = Dimensions.get('window')





class CJDemoDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowPickDate: props.allowPickDate,
            chooseDateString: props.chooseDateString,
            onDateChange: props.onDateChange,
        };
    }


    render() {
        const { style } = this.props;
        let showDateString = this.state.chooseDateString;

        return (
            <DatePicker
                style={[{flex: 1}, style]}
                disabled={!this.props.allowPickDate}
                placeholder= {this.props.placeholder}
                date={showDateString}
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

                //onDateChange={this.state.onDateChange}
                onDateChange={(date) => { //
                    if(date.constructor===String) {
                        let dateString = date;
                        this.setState({chooseDateString: dateString})
                        this.state.onDateChange(dateString);
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




export default class CJDemoDateBeginEnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            beginDateString: props.beginDateString,
            ///endDateString: null,
            onBeginDateChange: props.onBeginDateChange,
        };
    }

    render() {
        const { style } = this.props;

        let beginDateString = "2000-02-29";
        //let beginDateString = this.state.beginDateString;

        let beginDate = DateUtil.parserDateString(beginDateString);
        let endDate = DateUtil.addDataTime(beginDate, 1, 'year');
        let endDateString = DateUtil.yyyyMMdd_hhmmssString(endDate);
        //let endDateString = "5050-05-05";

        return (
            <View style={[
                {flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
                style]
            }>
                <CJDemoDatePicker style={{flex: 1}}
                                  placeholder= {"选择日期"}
                                  chooseDateString={beginDateString}
                                  allowPickDate={this.props.isEditing}
                                  // onDateChange={ (date) => {
                                  //     this.setState({beginDate: date})
                                  // }}
                                  onDateChange={this.state.onBeginDateChange}
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