//LoadingImagePage3.js

import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';
import {LKWhiteBGButton} from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";

export const Title_LoadingImagePage3 = 'LoadingImagePage3(加载到错误图片时候，界面会不会卡死)';
export default class LoadingImagePage3 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let errorNetworkImage = {uri: 'http://xxx.jpg'};

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop:20}}>测试加载到错误图片时候，界面会不会卡死</Text>

                <Text style={{marginTop:20}}>LoadingImage(大图)</Text>
                <LKLoadingImage
                    style={{width: 200, height: 200, backgroundColor:'orange'}}
                    source={errorNetworkImage}
                    needLoadingAnimation={true}
                />

                <LKWhiteBGButton
                    style={{paddingTop: 0}}
                    title={'测试图片source更新时候的加载动画' + this.state.shouldExchangeImage}
                    onPress={()=>{
                        LKToastUtil.showMessage('你点击到了按钮，说明没卡死');
                    }}
                />
            </ScrollView>


        )
    }
}
