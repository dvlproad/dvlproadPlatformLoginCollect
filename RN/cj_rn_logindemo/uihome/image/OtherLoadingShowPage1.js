//OtherLoadingShowPage
import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';
import OtherLoadingImage from '../../commonUI/image/OtherLoadingImage';

var landscapeImageUrl = 'https://h1.ioliu.cn//bing/Transfagarasan_ZH-CN5760731327_1920x1080.jpg';

export const Title_LoadingImagePage1 = `LoadingImagePage1(只看加载动画)`;
export default class OtherLoadingShowPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let errorNetworkImage = {uri: 'http://' + landscapeImageUrl};

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop:20}}>OtherLoadingImage</Text>
                <OtherLoadingImage style={{width: 200, height: 200}}
                                   source={errorNetworkImage}
                />
            </ScrollView>


        )
    }
}
