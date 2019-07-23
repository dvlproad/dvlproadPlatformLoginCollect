import React, {Component} from 'react';
import {View} from 'react-native';
import {LKActionDom} from "../../../commonUI/modal/LKActionSheetComponent";

import {
    LKToastUtil,
    LKActionSheet,
    LKBlueBGButton,
} from '../../../commonUI/luckincommonui';

export default class ActionSheetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    showPhotoCameraActionSheet() {
        this.photoCameraActionSheet.showWithItems([
            {
                mainTitle: "拍摄",
                actionBlock: ()=>{
                    console.log("你点击了'拍摄'");
                },
            },
            {
                mainTitle: "从手机相册选择",
                actionBlock: ()=>{
                    console.log("你点击了'从手机相册选择'");
                },
            },
        ]);
    }

    showListActionSheet() {
        let itemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            itemModel.actionBlock = () => {
                console.log("你点击了标题" + i);
            }

            itemModels.push(itemModel);
        }

        this.listActionSheet.showWithItems(itemModels);
    }

    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5'}}>
                <LKActionSheet ref={ref => this.photoCameraActionSheet = ref} />
                <LKBlueBGButton title={'弹出拍摄图片选择actionSheet'}
                                onPress={()=>{
                                    this.showPhotoCameraActionSheet();
                                }}
                />

                <LKActionSheet ref={ref => this.listActionSheet = ref} />
                <LKBlueBGButton title={'弹出长列表actionSheet'}
                                onPress={()=>{
                                    this.showListActionSheet();
                                }}
                />
            </View>

        )
    }
}


