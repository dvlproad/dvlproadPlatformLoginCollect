import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import DateUtil from "./DateUtil";

// const {width, height} = Dimensions.get('window')





class CJDemoDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: DateUtil.today(),
            allowPickDate: true,
            datePickerWidth: 50
        };
    }


    render() {
        const { style } = this.props
        return (
            <DatePicker
                //style={{width: this.props.datePickerWidth}}
                style={[{flex: 1}, style]}
                disabled={!this.props.allowPickDate}
                placeholder="请选择日期"
                date={this.state.date}
                minDate="1900-01-01"
                maxDate="2016-06-01"

                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}
                customStyles={{
                    dateInput: {
                        borderWidth: this.props.allowPickDate ? 1 : 0,
                        borderColor: "#CCCCCC",
                        backgroundColor: this.props.allowPickDate ? "white" : "#F9F9F9"

                    }
                    // ... You can check the source to find the other keys.
                }}

                //onDateChange={(datetime) => {this.setState({datetime: datetime});}}
            />
        )
    }
}

class TestDatePicker extends DatePicker {
    render() {
        return (
            <DatePicker style={{flex:1}}
                showIcon={false}
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
                style={{width: 20, height: 10}}
                source={require('./resources/dateConnectWave.png')}
            />

        return (
            <View
                style={[{
                    backgroundColor: "red",
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




export default class CJDemoDateBeginEnd extends React.Component {
    _onLayout(event) {
        let { x, y, width2, height2 } = event.nativeEvent.layout;
        console.log('通过onLayout得到的宽度：' + width2);
        console.log('通过onLayout得到的高度：' + height2);

        // this.props.curWidth = width2

        // let { screenWidth, screenHeight } = Dimensions.get('window');
        // console.log('通过Dimensions得到的宽度：' + screenWidth);
        // console.log('通过Dimensions得到的高度：' + screenHeight);
    }

    constructor(props) {
        super(props);
        this.state = {
            curWidth: 100
        };
    }

    render() {
        const { style } = this.props

        const screenWidth = Dimensions.get('window').width
        const datePickerWidth = screenWidth/5- 40  //TODO:改为取本视图的宽度来计算
        //const datePickerWidth = this.props.curWidth/3

        return (

            <View onLayout = {this._onLayout} style={{flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
                <CJDemoDatePicker style={{flex: 1}} datePickerWidth={datePickerWidth} allowPickDate={true} />
                <DateConnectView style={{width: 20, marginHorizontal: 10}} showWave={false} />
                <CJDemoDatePicker style={{flex: 1}} datePickerWidth={datePickerWidth} allowPickDate={false} />
            </View>

            //原本用于测试布局的组件
            // <View onLayout = {this._onLayout} style={{flex:1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
            //    <CJDemoDatePicker style={{flex:1}} showIcon={false} />
            //    <View style={{width: 20, height: 1, marginHorizontal:10, backgroundColor: "black"}} />
            //    <TestDatePicker style={{flex:1}} showIcon={false}  />
            // </View>
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