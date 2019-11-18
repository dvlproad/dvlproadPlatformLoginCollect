//TSDatePickerShowPage.js
import React, { Component } from 'react';
import {View, Alert} from 'react-native';
import {
    LKDemoChooseBasePage,
    LKActionSheet,
    LKMultipleChooseActionSheet,
    LKToast,
    LKDatePicker,
} from "../../../lkcui/lkcui";

export default class TSDatePickerShowPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        this.state = {
            dealIndex: 0,

            sectionDataModels: [
                { key: "事项选择",
                    data: [
                        {
                            title: "每次均为上次选中时间",
                            detailText: '2019-06-06',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.datePicker.show();
                            },
                        },
                        {
                            title: "每次均为指定2000-02-29",
                            detailText: '2000-02-29',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.datePicker.showWithDateString('2000-02-29');
                            },
                        },
                        {
                            title: "弹出日期控件",
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.datePicker.show();
                            },
                        },
                    ]
                },
            ],
        }
    }


    renderChooseComponents() {
        return (
                <LKDatePicker ref={ref => this.datePicker = ref}
                              onPickerConfirm={(dateString)=>{
                                  let sectionDataModel = this.state.sectionDataModels[0];
                                  let dataModel = sectionDataModel.data[this.state.dealIndex];
                                  dataModel.detailText = dateString;


                                  // this.state.sectionDataModels[index] = item;
                                  this.setState({
                                      sectionDataModels: this.state.sectionDataModels,
                                  }, ()=>{

                                  })

                                  // if (this.state.dealIndex == 0) {
                                  //     this.setState({
                                  //         dateString1: dateString
                                  //     })
                                  // } else if (this.state.dealIndex == 1) {
                                  //     this.setState({
                                  //         dateString2: dateString
                                  //     })
                                  // }
                              }}
                />

        )
    }
}
