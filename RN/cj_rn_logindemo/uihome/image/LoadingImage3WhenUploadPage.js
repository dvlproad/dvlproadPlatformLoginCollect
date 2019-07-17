//LoadingImage3WhenUploadPage.jsadPage.js

import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';
import {LKBlueBGButton, LKWhiteBGButton} from "../../commonUI/button/LKTextButton";

export const Title_LoadingImagePage2 = `LoadingImagePage2(看模拟上传图片时候的加载动画)`;
export default class LoadingImage3WhenUploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingLocalImage: false,
        };
    }

    render() {
        // let errorNetworkImage = {uri: 'http://' + landscapeImageUrl};
        let isShowingLocalImage = this.state.isShowingLocalImage;

        let landscapeImage = null;
        if (isShowingLocalImage) {
            landscapeImage = require('./resources/landscape.jpg');
        } else {
            landscapeImage = {uri: 'https://desk-fd.zol-img.com.cn/t_s1920x1200c5/g5/M00/02/02/ChMkJlbKxcOIPv9rAAgXA263NWsAALHawN2aRMACBcb586.jpg'};
        }

        let fogImage = null;
        if (isShowingLocalImage) {
            fogImage = require('./resources/landscape.jpg');
        } else {
            fogImage = {uri: 'http://www.v3wall.com/wallpaper/1366_768/1703/1366_768_20170310105503345670.jpg'};
        }


        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <View style={{flex:1}}>
                    <Text style={{marginTop:20}}>模拟图片上传(处理上传结束后不会多余显示loading)</Text>
                    <LKLoadingImage
                        style={{width: 200, height: 200, backgroundColor:'purple'}}
                        source={landscapeImage}
                        needLoadingAnimation={true}
                    />

                    <LKLoadingImage
                        style={{width: 200, height: 200, marginTop: 20, backgroundColor:'purple'}}
                        source={fogImage}
                        needLoadingAnimation={true}
                    />

                    <LKBlueBGButton
                        style={{paddingTop: 0}}
                        title={'测试数据源不变点击刷新是否会有重复的加载动画'}
                        onPress={()=>{
                            this.setState({
                                isShowingLocalImage: !this.state.isShowingLocalImage,
                            })
                        }}
                    />
                </View>



                {/*<Text style={{marginTop:20}}>OtherLoadingImage</Text>*/}
                {/*<OtherLoadingImage style={{width: 200, height: 200}}*/}
                {/*                   source={errorNetworkImage}*/}
                {/*/>*/}
            </ScrollView>


        )
    }
}
