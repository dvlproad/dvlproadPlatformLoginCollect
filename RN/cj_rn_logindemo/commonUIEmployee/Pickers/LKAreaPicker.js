import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJAreaPicker,
    CJAreaPickShowType
} from '../../CJBaseUIKit/CJBaseUIKit';


export default class LKAreaPicker extends CJAreaPicker {
    static propTypes = {

    };

    static defaultProps = {
        areaPickShowType: CJAreaPickShowType.ProvinceCity,
        areaPickerCreateTimeType: CJAreaPickShowType.Free,

        toolbarHeight: 40,
        // dateString: '',
        //
        // onPickerConfirm: (dateString)=>{},
        // onPickerCancel: ()=>{},
        // onPickerSelect: (dateString)=>{},
        onCoverPress: ()=>{},

        showToolbarValueText: true,
        toolbarValueText: '意向城市',
        toolbarValueFixed: true,
    };

}
