//LoadingImage2ErrorPage.js

import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';
import {LKBlueBGButton} from "../../commonUI/button/LKTextButton";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";

export const Title_LoadingImagePage3 = 'LoadingImage2ErrorPage(加载到错误图片时候，界面会不会卡死)';
export default class LoadingImage2ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
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
                <LKBlueBGButton
                    style={{paddingTop: 0}}
                    title={'测试图片source更新时候的加载动画(如果你点击按钮有响应，说明没卡死)'}
                    onPress={()=>{
                        LKToastUtil.showMessage('你点击到了按钮，说明没卡死');
                    }}
                />


                <LKLoadingImage
                    style={{width: 200, height: 200, backgroundColor:'orange', marginVertical: 20}}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563345638317&di=98e13924cafe05c31072b28b9b418e11&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-8%2F201281416145837523.jpg'}}
                    needLoadingAnimation={true}
                />

                <LKBlueBGButton
                    style={{paddingTop: 0}}
                    title={'刷新视图' + this.state.count}
                    onPress={()=>{
                        LKToastUtil.showMessage('正在刷新视图');
                        this.setState({
                            count: this.state.count+1,
                        })
                    }}
                />
            </ScrollView>


        )
    }
}
