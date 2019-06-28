import React, {Component} from 'react';
import {View} from 'react-native';
import {LKPhotoCameraSheet} from "../../../commonUI/modal/LKActionSheet";
import LKTextButton from "../../../commonUI/button/LKTextButton";

export default class LKActionSheetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAction: true
        };
    }



    render() {
        let photoCameraSheet = (
            <LKPhotoCameraSheet visible={this.state.showAction}
                                clickCancel={()=>{
                                    this.setState({
                                        showAction: !this.state.showAction
                                    })
                                }}
                                clickTakePhoto={()=>{
                                    alert("你点击了拍摄")
                                }}
                                clickChooseFromLibrary={()=>{
                                    alert("你点击了从相册选择")
                                }}
            />
        );

        return (
            <View>
                <LKTextButton title={'弹出actionSheet'}
                              onPress={()=>{
                                  this.setState({
                                      showAction: true
                                  })
                              }}
                />

                {photoCameraSheet}

            </View>

        )
    }
}


