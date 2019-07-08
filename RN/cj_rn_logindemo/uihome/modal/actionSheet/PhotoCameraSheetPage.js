import React, {Component} from 'react';
import {View} from 'react-native';
import {LKPhotoCameraSheet} from "../../../commonUI/modal/LKActionSheet";
import LKTextButton from "../../../commonUI/button/LKTextButton";

export default class PhotoCameraSheetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoCameraSheetShow: false
        };
    }

    // 获取图片选择器
    photoCameraSheet=()=>{
        return (
            <LKPhotoCameraSheet visible={this.state.photoCameraSheetShow}
                                clickCancel={this.hidePhotoCameraSheet}
                                clickTakePhoto={()=>{
                                    this.hidePhotoCameraSheet();
                                    alert("你点击了拍摄")
                                }}
                                clickChooseFromLibrary={()=>{
                                    this.hidePhotoCameraSheet();
                                    alert("你点击了从相册选择")
                                }}
            />
        )
    }

    // 显示图片选择器
    showPhotoCameraSheet=()=>{
        this.setState({
            photoCameraSheetShow: true
        })
    }

    // 隐藏图片选择器
    hidePhotoCameraSheet=()=>{
        this.setState({
            photoCameraSheetShow: !this.state.photoCameraSheetShow
        })
    }

    render() {
        return (
            <View>
                {this.photoCameraSheet()}
                <LKTextButton title={'弹出actionSheet'}
                              onPress={this.showPhotoCameraSheet}
                />
            </View>

        )
    }
}


