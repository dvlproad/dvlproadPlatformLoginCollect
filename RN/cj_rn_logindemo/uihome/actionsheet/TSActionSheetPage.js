//TSActionSheetPage.js
import React, { Component } from 'react';
import {View} from 'react-native';
import {
    LKDemoChooseBasePage,
    LKActionSheet
} from "../../commonUI/luckincommonui";

export default class TSActionSheetPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "事项选择",
                    data: [
                        {
                            title: "弹出拍摄图片选择actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.showPhotoCameraActionSheet();
                            },
                        },
                        {
                            title: "弹出长列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.showListActionSheet();
                            },
                        },
                    ]
                },
            ],
        }
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


    renderChooseComponents() {
        return (
            <View>
                <LKActionSheet ref={ref => this.photoCameraActionSheet = ref} />
                <LKActionSheet ref={ref => this.listActionSheet = ref} />
            </View>

        )
    }
}
