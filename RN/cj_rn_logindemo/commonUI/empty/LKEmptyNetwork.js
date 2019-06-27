//LKEmptyNetwork.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {ScrollView, StyleSheet, Text, Image, View} from "react-native";
import {LKWhiteBGButton} from "../button/LKTextButton";

export default class LKEmptyNetwork extends Component {
    static propTypes = {
        refreshHandle: PropTypes.func,
    };

    static defaultProps = {
        refreshHandle: () => {},
    };


    render() {
        const { style } = this.props;

        return (
                <ScrollView style={[{flex:1}, style]} contentContainerStyle={{flexGrow:1}}>
                    <View style={{flex:1, flexDirection: "column", marginTop:-60, justifyContent: "center", alignItems:'center'}}>
                        <Image
                            source={require('./resources/networkError.png')}
                        />

                        <Text style={[styles.text, {marginTop: 22}]}>网络好像有点问题</Text>

                        <LKWhiteBGButton style={{width:160, marginTop:60}}
                                         title={'刷新'}
                                         onPress={this.props.refreshHandle}
                        />
                    </View>
                </ScrollView>
            )
    }
}

var styles = StyleSheet.create({
    text: {
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
        color: '#999999'
    },
});