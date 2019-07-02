//LoadingImagePage.js

import React, { Component } from 'react'
import { View, Text } from 'react-native';
import LKLoadingImage from '../../commonUI/image/LKLoadingImage';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';

export default class LoadingImagePage extends Component {
    render() {
        let networkImage = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};
        let networkImageUrl = 'http://imgtest.luckycoffee.com/group1/M00/01/3B/Cmho11zV6USAJmimABPKrXesi64449.jpg';
        let errorNetworkImage = {uri: 'http://imgtest.luckycoffee.com/' + networkImageUrl};
        return (
            <View style={{flex:1}}>
                <Text style={{marginTop:20}}>LoadingImage</Text>
                <LKLoadingImage style={{width: 200, height: 200, backgroundColor:'red'}}
                                imageWidth={200}
                                imageHeight={200}
                                imageSource={networkImage}
                />
                <Text style={{marginTop:20}}>OtherLoadingImage</Text>
                <OtherLoadingImage style={{width: 200, height: 200}}
                                   source={networkImage}
                />
            </View>


        )
    }
}
