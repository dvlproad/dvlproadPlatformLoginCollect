import React, { Component } from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LKTextButton from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import DatePicker from "react-native-pickers/view/DatePicker";

export default class ComJSSingleDatePage1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthdayDateString: '2004-02-29',
            fullDateString: '2008-02-29 08:08:08',

            show: false,
        }
    }


    renderButton(text, callback) {
        return <TouchableOpacity
            onPress={callback.bind(this)}
            style={{
                width: 180, height: 35,
                justifyContent: 'center', alignItems: 'center',
                borderColor: '#999999', borderWidth: this.mOnePixel,
                padding: 10, backgroundColor: '#cccccc',
                borderRadius: 4, marginBottom: 20
            }}>
            <Text>{text}</Text>
        </TouchableOpacity >
    }

    tryShowDatePicker() {
        if (this.state.show) {
            this.showDatePicker();
        } else {
            this.setState({
                show: true,
            }, () => {
                this.showDatePicker();
            })
        }
    }

    showDatePicker() {
        if (this.birthdayDatePicker) {
            this.birthdayDatePicker.show();
        } else {
            LKToastUtil.showMessage('Error：你还未创建日期选择器');
        }
    }

    getDatePicker() {
        if (this.state.show) {
            return this.createDatePicker();
        } else {
            return null;
        }
    }

    createDatePicker(){
        return (
            <DatePicker
                HH={false}
                mm={false}
                ss={false}
                unit={['年', '月', '日']}
                startYear={1900}
                onPickerConfirm={(value) => {
                    alert(JSON.stringify(value))
                }}
                onPickerCancel={() => {
                    LKToastUtil.showMessage('取消');
                }}
                ref={ref => this.birthdayDatePicker = ref}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                <LKTextButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={'yyyyMMdd的日期选择'}
                    onPress={()=>{
                        this.tryShowDatePicker();
                    }}
                />

                {this.getDatePicker()}

            </View>
        )
    }
}