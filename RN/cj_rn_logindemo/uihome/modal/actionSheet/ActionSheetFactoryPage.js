import React, {Component} from 'react';
import {View} from 'react-native';

import {
    LKToastUtil,
    LKActionSheetFactory,
    LKActionDom,
    LKBlueBGButton,
} from '../../../commonUI/luckincommonui';

export default class ActionSheetFactory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAction: false
        };
    }

    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5'}}>
                <LKBlueBGButton title={'弹出actionSheet'}
                                onPress={()=>{
                                    this.setState({
                                        showAction: !this.state.showAction
                                    })
                                }}
                />

                <LKActionSheetFactory actionTitle={'请选择'}
                                      visible={this.state.showAction}
                                      cancel={()=>{this.setState({showAction:false})}}
                >
                    <LKActionDom actionName={'我是按钮一'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                    <LKActionDom actionName={'我是按钮二'}
                                 onPress={()=>{
                                     alert("你点击了按钮一")
                                 }}
                    />
                </LKActionSheetFactory>
            </View>

        )
    }
}


