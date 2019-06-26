
import React, { Component } from 'react';
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import { View, Text } from 'react-native';
import { WebView } from "react-native-webview";

export default class WebViewPage1 extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://github.com/facebook/react-native'}}
                style={{marginTop: 20}}
                onLoad={(e) => LKToastUtil.showMessage('onLoad')}
                onLoadEnd={(e) => LKToastUtil.showMessage('onLoadEnd')}
                onLoadStart={(e) => LKToastUtil.showMessage('onLoadStart')}
                renderError={() => {
                    return <View><Text>renderError回调了，出现错误</Text></View>
                }}
                renderLoading={() => {
                    return <View><Text>这是自定义Loading...</Text></View>
                }}
            />
        );
    }
}