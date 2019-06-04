//StringPage.js
import React, { Component } from "react";
import { View, Text } from 'react-native';

export default class StringPage extends Component {
    /**
     * 是否是网络图片
     */
    checkIsNetworkImage= (imageSource) => {
        let isNetworkImage = false;
        if (imageSource.hasOwnProperty('uri') && typeof imageSource['uri'] === 'string') {
            let uri = imageSource['uri'];
            if (uri.indexOf('http:') == 0 || uri.indexOf('https:') == 0) {
                isNetworkImage = true;
            }
        }
        return isNetworkImage;
    }

    render() {
        let isNetworkImage1 = this.checkIsNetworkImage({uri: 'file:///Users/1.png'});
        let isNetworkImage2 = this.checkIsNetworkImage({uri: 'http://1.png'});
        let isNetworkImage3 = this.checkIsNetworkImage({uri: 'https://1.png'});


        return (
            <View>
                <Text>{isNetworkImage1?'true':'false'}</Text>
                <Text>{isNetworkImage2?'true':'false'}</Text>
                <Text>{isNetworkImage3?'true':'false'}</Text>
            </View>
        )
    }
}