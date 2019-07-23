import React, {Component} from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKActionSheet,
    LKPhotoCameraSheet,
    LKBlueBGButton,
} from '../../../commonUI/luckincommonui';

export default class PhotoCameraSheetPage extends Component {
    constructor(props) {
        super(props);

    }


    // 显示图片选择器
    showPhotoCameraSheet=()=>{
        this.photoCameraSheet.showDefaultPhotoCameraSheet(
            ()=>{
                LKToastUtil.showMessage('你点击了拍摄');
            },
            ()=>{
                LKToastUtil.showMessage('你点击了从手机相册选择');
            },
        )
    }


    render() {
        return (
            <View style={{flex:1, backgroundColor:'#f5f5f5'}}>
                <LKActionSheet ref={ref => this.photoCameraSheet = ref} />
                <LKBlueBGButton title={'弹出actionSheet'}
                                onPress={this.showPhotoCameraSheet}
                />
            </View>

        )
    }
}


