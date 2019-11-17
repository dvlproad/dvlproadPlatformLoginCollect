/**
 * CJMultipleChooseActionSheetComponent.js
 *
 * @Description: 【多选】ActionSheet中含①顶部标题、②内容区域列表、③底部确认部分的整体视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-17 23:03:27
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;

export default class CJMultipleChooseActionSheetComponent extends Component {
    static propTypes = {
        headerTitle: PropTypes.string,          // 顶部标题
        cancelHandle: PropTypes.func,           // 取消操作
        confirmHandle: PropTypes.func,          // 确认操作
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };
    static defaultProps = {
        headerTitle: '',
        cancelHandle: ()=>{},
        confirmHandle: ()=>{},
    };

    render() {
        return (
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(40,40,40,0.4)'}}
                onPress={this.props.cancelHandle}
                activeOpacity={0.9}>
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff'}}>
                    {this.props.headerTitle ? <CJMultipleChooseActionSheetHeader actionTitle={this.props.headerTitle} /> : null}
                    {this.props.children}
                    <View style={{borderTopWidth: 10, borderTopColor: '#F1EFF0'}}></View>
                    <CJMultipleChooseActionSheetFooter title={'确定'}
                                                       onPress={this.props.confirmHandle}
                    />
                    <Text style={{backgroundColor: '#fff', height: screenBottomHeight}}
                    />

                </View>
            </TouchableOpacity>
        )
    }
}

class CJMultipleChooseActionSheetHeader extends Component {
    static propTypes = {
        headerTitle: PropTypes.string,
    };

    static defaultProps = {
        headerTitle: '请选择',
    };

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            }}>
                <Text style={styles.titleText}>
                    {this.props.headerTitle}
                </Text>
            </View>
        );
    }
}


export class CJMultipleChooseActionSheetFooter extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        actionCellHeight: PropTypes.number,     //cell高
        onPress: PropTypes.func,
    };

    static defaultProps = {
        title: '按钮标题',
        actionCellHeight: 52,
        onPress: ()=>{},
    };

    render() {
        let actionCellHeight = this.props.actionCellHeight;

        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: actionCellHeight,
                    borderBottomColor: '#eee'
                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={{
                    height: actionCellHeight,
                    fontSize: 15,
                    textAlign: 'center',
                    lineHeight:actionCellHeight,
                    color: '#172991'
                }}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}




const styles = StyleSheet.create({
    titleText: {
        height: 44,
        fontSize: 14,
        textAlign: 'center',
        lineHeight:44,
        color: '#aaa'
    },
});
