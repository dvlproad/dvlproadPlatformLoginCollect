/**
 * CJMultipleChooseActionSheetTableView.js
 *
 * @Description: 【多选】ActionSheet中不含①顶部标题与③底部取消部分的内容区域【多选】列表视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-17 22:56:47
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {FlatList, StyleSheet, Text, Image, TouchableOpacity} from "react-native";

export default class CJMultipleChooseActionSheetTableView extends Component {
    static propTypes = {
        itemModels: PropTypes.array,
        actionCellHeight: PropTypes.number,
        listMaxHeight: PropTypes.number,
        clickItemCompleteBlock: PropTypes.func,
    };

    static defaultProps = {
        itemModels: [
            // {'mainTitle': '拍摄'},
        ],
        actionCellHeight: 50,
        listMaxHeight: 100,
        clickItemCompleteBlock: (selectedItemModels) => {},
    };

    constructor(props) {
        super(props);

        this.state = {
            itemModels: props.itemModels,
        }
    }

    _clickItem(item, index) {
        item.selected = !item.selected;
        this.state.itemModels[index] = item;
        this.setState({
            itemModels: this.state.itemModels,
        }, ()=>{
            if (this.props.clickItemCompleteBlock) {
                let selectedItemModels = [];
                for (let i = 0; i < this.state.itemModels.length; i++) {
                    let itemModel = this.state.itemModels[i];
                    if (itemModel.selected) {
                        selectedItemModels.push(itemModel);
                    }
                }
                this.props.clickItemCompleteBlock(selectedItemModels);
            }
        })
    }

    render() {
        let actionCellHeight = this.props.actionCellHeight;
        let listHeight = this.props.itemModels.length * actionCellHeight;
        let listMaxHeight = this.props.listMaxHeight;
        let scrollEnabled = false;
        if (listHeight > listMaxHeight) {
            scrollEnabled = true;
            listHeight = listMaxHeight;
        }

        return (
            <FlatList style={{height: listHeight}}
                      scrollEnabled={scrollEnabled}
                      data={this.state.itemModels}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => {
                          return (
                              <CJMultipleChooseActionSheetTableCell
                                  actionCellHeight={actionCellHeight}
                                  itemModel={item}
                                  onPress={() => {
                                     this._clickItem(item, index)
                                  }}
                              />
                          )
                      }}
            />
        )
    }
}

export class CJMultipleChooseActionSheetTableCell extends Component {
    static propTypes = {
        itemModel: PropTypes.object.isRequired,
        actionCellHeight: PropTypes.number,     //cell高
        showBottomLine: PropTypes.bool,         //是否显示底部的分割线
        onPress: PropTypes.func,
    };

    static defaultProps = {
        itemModel:{
            mainTitle: '按钮标题',
            selected: false,
        },
        actionCellHeight: 50,
        showBottomLine: true,
        onPress: ()=>{},
    };

    render() {
        let actionCellHeight = this.props.actionCellHeight;
        let borderBottomWidth = this.props.showBottomLine ? 1 : 0;

        let image = null;
        if (this.props.itemModel.selected) {
            image = require('./resources/check_selected.png');
        } else {
            image = require('./resources/check_normal.png');
        }

        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: actionCellHeight,
                    borderBottomWidth: borderBottomWidth,
                    borderBottomColor: '#eee'
                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={[styles.actionText, {'marginLeft': 15}]}>
                    {this.props.itemModel.mainTitle}
                </Text>
                <Image style={{'marginRight': 12}} source={image} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    actionText: {
        height: 44,
        fontSize: 15,
        textAlign: 'center',
        lineHeight:44,
        color: '#333333'
    }
});
