//LKEmptyNetwork.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import LKImageButton from "../button/LKImageButton";
import {ScrollView, StyleSheet, Text, View} from "react-native";

export default class LKEmptyNetwork extends Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
    };


    render() {
        const { style } = this.props;

        return (
                <ScrollView style={[{flex:1}, style]} contentContainerStyle={{flexGrow:1}}>
                    <View style={{flex:1, flexDirection: "column", justifyContent: "center", marginTop:-60}}>
                        <LKImageButton
                            imageName={require('./resources/networkError.png')}
                            onClick={this.props.onClick}
                        />

                        <Text style={styles.singleLineHVCenterText} >网络好像有点问题</Text>
                    </View>
                </ScrollView>
            )
    }
}

var styles = StyleSheet.create({
    singleLineHVCenterText: {   //单行文本水平&垂直居中
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
    },
});