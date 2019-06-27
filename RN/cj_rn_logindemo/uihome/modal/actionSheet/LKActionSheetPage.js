import React, {Component} from 'react';
import {View} from 'react-native';
import {LKActionSheet, LKActionDom} from "../../../commonUI/modal/LKActionSheet";
import LKTextButton from "../../../commonUI/button/LKTextButton";

export default class LKActionSheetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAction: true
        };
    }

    render() {
        return (
            <View>
                <LKTextButton title={'弹出actionSheet'}
                              onPress={()=>{
                                  this.state = {
                                      showAction: !this.state.showAction
                                  };
                              }}
                />

                <LKActionSheet
                    title={'请选择'}
                    showAction={this.state.showAction}
                    cancel={()=>{this.setState({showAction:false})}}
                >
                    <LKActionDom
                        actionName={'我是按钮一'}
                        onPress={()=>{
                            alert("你点击了按钮一")
                        }}
                    />
                    <LKActionDom
                        actionName={'我是按钮二'}
                        onPress={()=>{
                            alert("你点击了按钮一")
                        }}
                    />
                </LKActionSheet>
            </View>

        )
    }
}


