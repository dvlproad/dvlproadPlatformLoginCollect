//TSActionSheetPage.js
import React, { Component } from 'react';
import {View, Alert} from 'react-native';
import {
    LKDemoChooseBasePage,
    LKActionSheet,
    LKMultipleChooseActionSheet,
    LKToast,
} from "../../lkcui/lkcui";

export default class TSActionSheetPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "事项选择",
                    data: [
                        {
                            title: "弹出toast",
                            clickButtonHandle: (moduleModel) => {
                                LKToast.showMessage('我是测试');
                            },
                        },
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
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.showMultipleChooseActionSheet();
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
                LKToast.showMessage("你点击了标题" + i);
            }

            itemModels.push(itemModel);
        }

        this.listActionSheet.showWithItems(itemModels);
    }

    showMultipleChooseActionSheet() {
        let itemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            itemModel.actionBlock = () => {
                console.log("你点击了标题" + i);
            }

            itemModels.push(itemModel);
        }

        this.multipleChooseActionSheet.showWithItems(itemModels);
    }


    renderChooseComponents() {
        return (
            <View>
                <LKActionSheet ref={ref => this.photoCameraActionSheet = ref} />
                <LKActionSheet ref={ref => this.listActionSheet = ref} />
                <LKMultipleChooseActionSheet ref={ref => this.multipleChooseActionSheet = ref}
                                             headerTitle={'4G网络运营商'}
                                             confirmHandle={(selectedItemModels)=>{
                                                 let selectedItemTitles = [];
                                                 for (let i = 0; i < selectedItemModels.length; i++) {
                                                     let selectedItemModel = selectedItemModels[i];
                                                     selectedItemTitles.push(selectedItemModel.mainTitle);
                                                 }
                                                 let selectedResultString = selectedItemTitles.join('/');
                                                 LKToast.showMessage(selectedResultString);
                                             }}
                />
            </View>

        )
    }
}
