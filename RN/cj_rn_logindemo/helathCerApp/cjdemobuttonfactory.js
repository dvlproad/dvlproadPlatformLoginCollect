import React from 'react'
import { Button, View, StyleSheet } from 'react-native'
import type {PressEvent} from "react-native/Libraries/Types/CoreEventTypes";

class ButtonFactory {
    static blueButton() {
        return <Button title="内标题">外标题</Button>
    }
}

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitTitle: "提交",
            editTitle:  "修改",
            isShowEditTitle: false,
            isDisabled: false,
            clickEditTitleHandle: (event?: PressEvent) => mixed,
            clickSubmitTitleHandle: (event?: PressEvent) => mixed

        };
    }

    render() {
        const { style } = this.props

        let isShowEditTitle = this.props.isShowEditTitle
        let submitTitle = this.props.submitTitle ? this.props.submitTitle : this.state.submitTitle
        let editTitle = this.props.editTitle ? this.props.editTitle : this.state.editTitle
        let showTitle = isShowEditTitle ? editTitle : submitTitle

        let isDisable = this.props.isDisabled
        let showStyle = isShowEditTitle ? (isDisable?styles.editDisable:styles.editEnable) : (isDisable?styles.submitDisable:styles.submitEnable)

        let showColor = isShowEditTitle ? "#01ADFE" : "#FFFFFF"

        let currentOnPress = isShowEditTitle ? this.props.clickEditTitleHandle : this.props.clickSubmitTitleHandle

        return (
            <View style={showStyle} >
                <Button
                    title={showTitle}
                    color={showColor}
                    disabled={isDisable}
                    onPress={currentOnPress}
                />
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
                <Button title={this.state.submitTitle} color="#FFFFFF" >外标题</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    submitEnable: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: "#01ADFEFF",
        borderWidth: 0
    },
    submitDisable: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: "#01ADFE4C",
        borderWidth: 0
    },

    editEnable: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#01ADFE"
    },

    editDisable: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#01ADFE"
    }
});


export {ButtonFactory, EnableBlueButton, SubmitButton};