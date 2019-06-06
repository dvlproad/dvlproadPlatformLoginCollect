//LoadingImagePage.js

import React, { Component } from 'react'
import { View, Text } from 'react-native';
import LoadingImage from '../../commonUI/image/LoadingImage'
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage'

export default class LoadingImagePage extends Component {
    render() {
        let networkImage = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};
        return (
            <View style={{flex:1}}>
                <Text style={{marginTop:20}}>LoadingImage</Text>
                <LoadingImage
                    style={{width: 200, height: 200, backgroundColor:'red'}}
                    imageWidth={200}
                    imageHeight={200}
                    imageSource={networkImage}
                />
                <Text style={{marginTop:20}}>OtherLoadingImage</Text>
                <OtherLoadingImage
                    style={{width: 200, height: 200}}
                    source={networkImage}
                />
            </View>


        )
    }
}
