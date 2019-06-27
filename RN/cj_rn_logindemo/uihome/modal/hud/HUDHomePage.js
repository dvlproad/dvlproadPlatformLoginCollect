//HUDHomePage.js
import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native'

export default class HUDHomePage extends Component {
    render() {
        let screenWidth = Dimensions.get("window").width;
        let screenHeight = Dimensions.get("window").height;

        return (
            <View>
                <Text style={{backgroundColor: 'red', height: 100}}>HUD垂直水平居中显示</Text>
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    loadingView: {
        position:'absolute',
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        justifyContent: 'center',
        marginTop: -50,
    },
})
