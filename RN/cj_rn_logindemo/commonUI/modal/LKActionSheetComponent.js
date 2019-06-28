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
        children: PropTypes.array,
    };

    render() {
        return (
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(40,40,40,0.4)'}}
                onPress={this.props.cancel}
                activeOpacity={0.9}>
                <View style={{position: 'absolute', bottom: screenBottomHeight, left: 0, right: 0, backgroundColor: '#fff'}}>
                    {this.props.actionTitle ? <LKActionTitle actionTitle={this.props.actionTitle} /> : null}
                    {this.props.children}
                    <LKActionDom style={{borderTopWidth: 4, borderTopColor: '#eee'}}
                                 actionName={'取消'}
                                 onPress={this.props.cancel}
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
        actionName: PropTypes.string, //模态弹出效果
        onPress: PropTypes.func,
    };

    static defaultProps = {
        actionName: '按钮一',
        onPress: ()=>{},
    };

    render() {
        let actionCellHeight = 50;
        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: actionCellHeight,
                    borderBottomWidth: 1,
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
        color: '#333'
    }

});