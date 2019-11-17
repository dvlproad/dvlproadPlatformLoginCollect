//TSPopupManagerPage.js
import React, { Component } from 'react';
import {
    LKDemoChooseBasePage,
    LKToast,
} from "../../lkcui/lkcui";
import {LKPopupManager, LKPopupType} from "../../commonUIEmployee/PopupManager/LKPopupManager";

export default class TSPopupManagerPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        let itemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            itemModel.actionBlock = () => {
                let selectedResultString = "你点击了标题" + itemModel.mainTitle;
                LKToast.showMessage(selectedResultString);
            }

            itemModels.push(itemModel);
        }

        this.state = {
            itemModels: itemModels,

            sectionDataModels: [
                { key: "弹窗管理",
                    data: [
                        {
                            title: "弹出长列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this._showPopupViewWithType(LKPopupType.ActionSheet);
                            },
                        },
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this._showPopupViewWithType(LKPopupType.MultipleChooseActionSheet);
                            },
                        },
                    ]
                },
            ],
        }
    }

    _showPopupViewWithType(popupType) {
        this.popupManager.showWithItems(popupType, this.state.itemModels);
    }



    renderChooseComponents() {
        return (
            <LKPopupManager ref={ref => this.popupManager = ref} />
        )
    }
}
