//LoadingImage1LoadingShowPage1.jshowPage1.js

import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';
import {LKWhiteBGButton} from "../../commonUI/button/LKTextButton";

var carImageUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1562053677&di=9c7e86f3099929712b5f97b94bc153c5&src=http://01.minipic.eastday.com/20161109/20161109230347_7e6b8aeb814b27aad394cc65d42237d8_4.jpeg';
var landscapeImageUrl = 'https://h1.ioliu.cn//bing/Transfagarasan_ZH-CN5760731327_1920x1080.jpg';
var mountainroadImageUrl = 'https://h1.ioliu.cn//bing/Transfagarasan_ZH-CN5760731327_1920x1080.jpg';

export const Title_LoadingImagePage1 = `LoadingImagePage1(只看加载动画)`;
export default class LoadingImage1LoadingShowPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldExchangeImage: true,
            showingCarImageUrl: carImageUrl,
            showingLandscapeImageUrl: landscapeImageUrl,
        };
    }

    render() {
        // let errorNetworkImage = {uri: 'http://' + landscapeImageUrl};

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop:20}}>LoadingImage(小图)</Text>
                <LKLoadingImage
                    style={{width: 100, height: 100, backgroundColor:'orange'}}
                    source={{uri:this.state.showingCarImageUrl}}
                />

                <Text style={{marginTop:20}}>LoadingImage(大图)</Text>
                <LKLoadingImage
                    style={{width: 200, height: 200, backgroundColor:'orange'}}
                    source={{uri: this.state.showingLandscapeImageUrl}}
                    needLoadingAnimation={true}
                />

                <LKWhiteBGButton
                    style={{paddingTop: 0}}
                    title={'测试图片source更新时候的加载动画' + this.state.shouldExchangeImage}
                    onPress={()=>{
                        let shouldExchangeImage = this.state.shouldExchangeImage;
                        let showingCarImageUrl = shouldExchangeImage ? landscapeImageUrl : carImageUrl;
                        let showingLandscapeImageUrl = shouldExchangeImage ? carImageUrl : landscapeImageUrl;

                        this.setState({
                            shouldExchangeImage: !shouldExchangeImage,
                            showingCarImageUrl: showingCarImageUrl,
                            showingLandscapeImageUrl: showingLandscapeImageUrl,
                        })
                    }}
                />


                {/*<Text style={{marginTop:20}}>OtherLoadingImage</Text>*/}
                {/*<OtherLoadingImage style={{width: 200, height: 200}}*/}
                {/*                   source={errorNetworkImage}*/}
                {/*/>*/}
            </ScrollView>


        )
    }
}
