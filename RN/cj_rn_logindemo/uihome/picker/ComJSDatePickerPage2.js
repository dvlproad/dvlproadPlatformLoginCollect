// ComJSDatePickerPage2.js

import React, { Component } from 'react';
import {View} from 'react-native';
import LKTextButton from "../../commonUI/button/LKTextButton";
import LKDatePicker from "../../commonUI/picker/LKDatePicker";

export default class ComJSDatePickerPage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateString: '2019-06-06'
        }
    }

    render() {
        let dateString = this.state.dateString;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                <LKTextButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={dateString}
                    onPress={()=>{
                        this.datePicker.showIt(
                            dateString,
                            (dateString)=>{
                                this.setState({
                                    dateString: dateString
                                })
                            },
                            ()=>{},
                            ()=>{},
                        )
                    }}
                />

                <LKDatePicker ref={ref => this.datePicker = ref} />

            </View>
        )
    }
}