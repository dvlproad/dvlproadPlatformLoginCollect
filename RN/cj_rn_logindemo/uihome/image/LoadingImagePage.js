//LoadingImagePage.js

import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';

export default class LoadingImagePage extends Component {
    render() {
        let carImageUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1562053677&di=9c7e86f3099929712b5f97b94bc153c5&src=http://01.minipic.eastday.com/20161109/20161109230347_7e6b8aeb814b27aad394cc65d42237d8_4.jpeg';

        let landscapeImageUrl = 'https://uploadfile.bizhizu.cn/up/61/39/c2/6139c29f6000d0553af3840ee9094317.jpg.source.jpg';

        let errorNetworkImage = {uri: 'http://' + landscapeImageUrl};
        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>


                <Text style={{marginTop:20}}>LoadingImage(小图)</Text>
                <LKLoadingImage style={{width: 200, height: 200, backgroundColor:'orange'}}
                                imageSource={{uri:carImageUrl}}
                />

                <Text style={{marginTop:20}}>LoadingImage(大图)</Text>
                <LKLoadingImage style={{width: 200, height: 200, backgroundColor:'orange'}}
                                imageSource={{uri: landscapeImageUrl}}
                />


                {/*<Text style={{marginTop:20}}>OtherLoadingImage</Text>*/}
                {/*<OtherLoadingImage style={{width: 200, height: 200}}*/}
                {/*                   source={errorNetworkImage}*/}
                {/*/>*/}
            </ScrollView>


        )
    }
}
