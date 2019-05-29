//StateNormalPage.js
import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class StateNormalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText:	"旧标题",
            isShowNew: false
        };
    }

    render() {
        let currentShowText = this.state.isShowNew ? "新标题" : "旧标题"

        return (
            <View>
                <Button
                    title={"点击切换标题"}
                    onPress={()=>{
                        let isShowNew = !this.state.isShowNew;
                        this.setState({
                            isShowNew: isShowNew
                        })
                    }}
                />
                <Text>{currentShowText}</Text>
            </View>
        )
    }
}
