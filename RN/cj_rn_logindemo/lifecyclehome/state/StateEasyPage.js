//StateEasyPage.js
import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class StateEasyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText:	"旧标题"
        };
    }

    render() {
        return (
            <View>
                <Button
                    title={"点击切换标题"}
                    onPress={()=>{
                        this.setState({
                            showText: "新标题"
                        })
                    }}
                />
                <Text>{this.state.showText}</Text>
            </View>
        )
    }
}
