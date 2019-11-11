// AreaPickerPage.js

import React, { Component } from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKTextButton,
    LKBlueBGButton,
    LKDatePicker,
} from '../../commonUI/luckincommonui';

import AreaJson from '../../CJBaseUIKit/areaPicker/area.json';
import { CJAreaPicker } from "../../CJBaseUIKit/CJBaseUIKit";
import CJAreaPickerView from "../../CJBaseUIKit/areaPicker/CJAreaPickerView";


export default class AreaPickerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areaSelectedValues1: ['香港', '香港', '九龙城区'],
            areaSelectedValues2: ['香港', '香港', '九龙城区']
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                {/* r*/}
                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={"行政区域 CJAreaPickerView"}
                    onPress={()=>{
                        this.areaPickerView.show()
                    }}
                />

                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={"行政区域 CJAreaPicker(弹出上次选择的地区)"}
                    onPress={()=>{
                        this.lastValueAreaPicker.showWithLastAreaSelectedValues((selectedValues)=>{
                            let string = selectedValues.join('-');
                            LKToastUtil.showMessage(string);
                        });
                    }}
                />

                <LKBlueBGButton
                    style={{
                        width: 180,
                        backgroundColor:'red'
                    }}
                    title={"行政区域 CJAreaPicker(弹出指定选择的地区)"}
                    onPress={()=>{
                        this.designativeValueAreaPicker.showWithAreaSelectedValues(['香港', '香港', '九龙城区'], (selectedValues)=>{
                            let string = selectedValues.join('-');
                            LKToastUtil.showMessage(string);
                        });
                    }}
                />


                <LKDatePicker ref={ref => this.datePicker = ref} />

                <CJAreaPickerView
                    areaJson={AreaJson}
                    toolbarValueText={'选择地区'}
                    onPickerCancel={() => { }}
                    onPickerConfirm={(selectedValues) => {
                        let string = selectedValues.join('-');
                        LKToastUtil.showMessage(string);
                    }}
                    ref={ref => this.areaPickerView = ref}
                />

                <CJAreaPicker
                    toolbarValueText={'选择地区'}
                    onPickerCancel={() => { }}
                    onPickerConfirm={(selectedValues) => {
                        LKToastUtil.showMessage(selectedValues);
                    }}
                    ref={ref => this.lastValueAreaPicker = ref}
                />
                <CJAreaPicker
                    toolbarValueText={'选择地区'}
                    onPickerCancel={() => { }}
                    onPickerConfirm={(value) => {
                        LKToastUtil.showMessage(value);
                    }}
                    ref={ref => this.designativeValueAreaPicker = ref}
                />

            </View>
        )
    }
}