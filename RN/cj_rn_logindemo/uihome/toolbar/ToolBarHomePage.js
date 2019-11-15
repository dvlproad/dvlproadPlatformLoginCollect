//ToolBarHomePage.js
import React, { Component } from 'react';
import {ScrollView, Button, Text, View, TouchableWithoutFeedback} from 'react-native';
import {
    LKNavigationFactory,
} from "../../commonUI/luckincommonui";
import CJBottomToolbar from "../../CJBaseUIKit/base/CJBottomToolbar";

export default class ToolBarHomePage extends Component {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        let toolbarHeight = 70;

        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
                <CJBottomToolbar
                    style={{
                        height: toolbarHeight,
                    }}

                    onPickerCancel={()=>{

                    }}
                    onPickerConfirm={() => {

                    }}

                    toolbarHeight={toolbarHeight}

                    confirmText={'我是确定'}
                    // confirmTextSize={this.props.confirmTextSize}
                    // confirmTextColor={this.props.confirmTextColor}

                    cancelText={'我是取消'}
                    // cancelTextSize={this.props.cancelTextSize}
                    // cancelTextColor={this.props.cancelTextColor}

                    valueText={'我是值'}
                    // valueTextSize={this.props.valueTextSize}
                    // valueTextColor={this.props.valueTextColor}
                />

            </ScrollView>
        )
    }
}


//ToolBarChildPages

export const ToolBarChildPages = {
    // ToolBarHomePage: {
    //     screen: ToolBarHomePage,
    //     navigationOptions: () => ({
    //         title: `ToolBarHomePage`,
    //     }),
    // },
}
