//cjdemobuttonfactory.js
import React, { Component } from 'react'
import {Button, View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import type {PressEvent} from "react-native/Libraries/Types/CoreEventTypes";

class ButtonFactory {
    static blueButton() {
        return <Button title="内标题">外标题</Button>
    }
}

class SubmitButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitTitle: "提交",
            editTitle:  "修改",
            fontSize: 17,
            isShowEditTitle: false,
            isDisabled: false,
            clickEditTitleHandle: (event?: PressEvent) => mixed,
            clickSubmitTitleHandle: (event?: PressEvent) => mixed
        };
    }

    render() {
        const { style } = this.props

        let isShowEditTitle = this.props.isShowEditTitle;
        let submitTitle = this.props.submitTitle ? this.props.submitTitle : this.state.submitTitle;
        let editTitle = this.props.editTitle ? this.props.editTitle : this.state.editTitle;
        let showTitle = isShowEditTitle ? editTitle : submitTitle;

        let isDisable = this.props.isDisabled;
        let enableStateStyle = isShowEditTitle ? (isDisable?styles.editDisable:styles.editEnable) : (isDisable?styles.submitDisable:styles.submitEnable)

        let showTextColor = isShowEditTitle ? (isDisable?"#01ADFE4C":"#01ADFE") : "#FFFFFF";
        let showTextFont = this.props.fontSize;

        let currentOnPress = isShowEditTitle ? this.props.clickEditTitleHandle : this.props.clickSubmitTitleHandle

        // 使用Button组件，无法处理disabled时候的文字颜色问题
        // return (
        //     <View style={[{flex:1}, enableStateStyle, style]} >
        //         <Button
        //             title={showTitle}
        //             color={showTextColor}
        //             disabled={isDisable}
        //             onPress={currentOnPress}
        //         />
        //     </View>
        // )
        return (

                <View style={[{justifyContent: "center", height: 44}, enableStateStyle, style]} >
                    <TouchableOpacity
                        onPress={currentOnPress}
                        disabled={isDisable}
                        //activeOpacity={0.4}
                    >
                    <Text
                        style={{textAlign:'center',
                            color: showTextColor,
                            //backgroundColor:'red',
                            fontSize:showTextFont}}
                    >
                        {showTitle}
                    </Text>
                    </TouchableOpacity>
                </View>

        )
    }
}

class EnableBlueButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitTitle: "title"
        };
    }

    render() {
        const { style } = this.props

        return (
            <View style={styles.submitEnable} >
                <Button title={this.props.submitTitle} color="#FFFFFF" >外标题</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    submitEnable: {
        borderRadius: 4,
        backgroundColor: "#01ADFEFF",
        borderWidth: 0
    },
    submitDisable: {
        borderRadius: 4,
        backgroundColor: "#01ADFE4C",
        borderWidth: 0
    },

    editEnable: {
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#01ADFE"
    },
    editDisable: {
        borderRadius: 4,
        backgroundColor: "#FFFFFF4C",
        borderWidth: 1,
        borderColor: "#01ADFE4C"
    }
});


export {ButtonFactory, EnableBlueButton, SubmitButton};