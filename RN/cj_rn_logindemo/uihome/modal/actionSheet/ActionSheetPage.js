import React, {Component} from 'react';
import {View} from 'react-native';
import {LKActionSheet} from "../../../commonUI/modal/LKActionSheet";
import {LKActionDom} from "../../../commonUI/modal/LKActionSheetComponent";
import LKTextButton from "../../../commonUI/button/LKTextButton";

export default class ActionSheetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAction: false
        };
    }

    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5'}}>
                <LKTextButton title={'弹出actionSheet'}
                              onPress={()=>{
                                  this.setState({
                                      showAction: !this.state.showAction
                                  })
                              }}
                />

                <LKActionSheet actionTitle={'请选择'}
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
                </LKActionSheet>
            </View>

        )
    }
}


