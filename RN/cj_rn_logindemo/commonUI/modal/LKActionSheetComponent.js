import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;

export default class LKActionSheetComponent extends Component {
    static defaultProps = {
        actionTitle: '',
    };
    static propTypes = {
        actionTitle: PropTypes.string, //头部
        cancel: PropTypes.func,     // 取消操作
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    render() {
        return (
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(40,40,40,0.4)'}}
                onPress={this.props.cancel}
                activeOpacity={0.9}>
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff'}}>
                    {this.props.actionTitle ? <LKActionTitle actionTitle={this.props.actionTitle} /> : null}
                    {this.props.children}
                    <View style={{borderTopWidth: 10, borderTopColor: '#F1EFF0'}}></View>
                    <LKActionDom actionName={'取消'}
                                 showBottomLine={false}
                                 onPress={this.props.cancel}
                    />
                    <Text style={{backgroundColor: '#fff', height: screenBottomHeight}}
                    />

                </View>
            </TouchableOpacity>
        )
    }
}

class LKActionTitle extends Component {
    static propTypes = {
        actionTitle: PropTypes.string,
    };

    static defaultProps = {
        actionTitle: '请选择',
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
                    {this.props.actionTitle}
                </Text>
            </View>
        );
    }
}

export class LKActionDom extends Component {
    static propTypes = {
        actionName: PropTypes.string.isRequired,
        actionCellHeight: PropTypes.number,     //cell高
        showBottomLine: PropTypes.bool,         //是否显示底部的分割线
        onPress: PropTypes.func,
    };

    static defaultProps = {
        actionName: '按钮标题',
        actionCellHeight: 50,
        showBottomLine: true,
        onPress: ()=>{},
    };

    render() {
        let actionCellHeight = this.props.actionCellHeight;
        let borderBottomWidth = this.props.showBottomLine ? 1 : 0;

        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: actionCellHeight,
                    borderBottomWidth: borderBottomWidth,
                    borderBottomColor: '#eee'
                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={styles.actionText}>
                    {this.props.actionName}
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
    actionText: {
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
        color: '#333333'
    }

});