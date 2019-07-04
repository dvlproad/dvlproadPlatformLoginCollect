// LKDatePicker.js

import React from 'react';
import PropTypes from "prop-types";
import Picker from "react-native-picker";

export function LKDatePickerShow(onPickerConfirm, onPickerCancel, onPickerSelect) {
    Picker.init({
        pickerData: [1, 2, 3],
        pickerFontColor: [255, 0 ,0, 1],
        onPickerConfirm: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
            onPickerConfirm(pickedValue, pickedIndex);
        },
        onPickerCancel: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
            onPickerCancel(pickedValue, pickedIndex);
        },
        onPickerSelect: (pickedValue, pickedIndex) => {
            console.log('date', pickedValue, pickedIndex);
            onPickerSelect(pickedValue, pickedIndex);
        }
    });
    Picker.show();
}

export default class LKDatePicker {

}