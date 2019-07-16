import React, { Component } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity, Dimensions,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import { Input, Button } from "teaset";
import LuckinButton from '../button/LKTextImageButton';

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

const [middleLeft] = [(screenWidth - 272.0) / 2.0];

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
    },
    mask: {
        backgroundColor: "#000",
        opacity: 0.3,
        position: "absolute",
        width: screenWidth,
        height: screenHeight,
    },
    contentBox: {
        width: 272,
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 6,
        left: middleLeft,
        overflow: 'hidden',
    },
    title: {
        fontSize: 14,
        color: '#333',
        marginTop: 30,
    },
    input: {
        marginTop: 20,
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        width: 230,
        height: 45,
        marginBottom: 66,
        textAlign: 'center'
    },
    buttonBox: {
        position: 'absolute',
        height: 46,
        width: 136,
        marginTop: 30,
        bottom: 0,
        left: 0,
    },
    buttonContent: {
        flexDirection: 'row',
        flex: 1,
        width: 272,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    onBlur: {
        backgroundColor: '#F9F9F9',
        borderColor: '#F9F9F9',
    },
    onFocus: {
        backgroundColor: '#fff',
        borderColor: '#5168F0',
    },
    chooseItemBox: {
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#E5E5E5',
        alignItems: 'center',
    },
    chooseItem: {
        height: 40,
        width: 230,
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    itemText: {
        color: '#333',
        fontSize: 14,
        width: 170,
    },
    listItem: {
        color: '#333',
        fontSize: 14,
        width: 200,
    }
});

export default class LuckinModal extends Component {
    mixins = [TimerMixin];
    parent = {};
    chooseAction = null;
    initHeight = 0;
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            title: '',
            placeholder: '',
            hide: true,
            inputText: '',
            isFocused: false,
            /**列表 */
            chooseItems: null,
            selectIndex: 0,
            isOpen: false,
            contentHeightAnimated: new Animated.Value(191),
            contentHeight: 191,
            secureTextEntry: true,
            top: screenHeight,
            topAnimated: new Animated.Value(screenHeight),
        };
    }

    render() {
        if (this.state.hide) {
            return (<View />)
        } else {
            return (
                <Modal style={styles.container}
                    transparent={true}
                >
                    <Animated.View style={styles.mask}>
                    </Animated.View>
                    <Animated.View style={[styles.contentBox, {
                        height: this.state.contentHeightAnimated,
                        top: this.state.topAnimated,
                    }]}>

                        <Text style={styles.title}>{this.state.title}</Text>
                        {
                            this.state.chooseItems && this.renderChooseItem()
                        }
                        <Input
                            style={[styles.input, this.state.isFocused ? styles.onFocus : styles.onBlur]}
                            placeholder={this.state.placeholder}
                            placeholderColor={'#999'}
                            secureTextEntry={this.state.secureTextEntry}
                            onBlur={() => {
                                //失去焦点
                                this.setState({
                                    isFocused: false,
                                })
                            }}
                            onFocus={() => {
                                //获取焦点
                                this.setState({
                                    isFocused: true,
                                })
                            }}
                            结束编辑获取输入内容
                            onEndEditing={() => {
                                this.setState({
                                    inputText: this.state.inputText,
                                })
                            }}
                            onChangeText={(text) => {
                                this.state.inputText = text;
                            }}
                        />
                        <View style={styles.buttonBox}>
                            <View style={{ height: 1, backgroundColor: '#E5E5E5', position: 'absolute', left: 0, bottom: 46, width: 272 }} />
                            <View style={styles.buttonContent}>
                                <Button
                                    style={{ borderWidth: 0 }}
                                    titleStyle={{ color: '#666' }}
                                    type='default'
                                    size='md'
                                    title='取消'
                                    onPress={() => {
                                        this.iknow();
                                    }}
                                />
                                <View style={{ height: 46, width: 1, backgroundColor: '#E5E5E5', position: 'absolute', left: 136, bottom: 0 }}></View>
                                <Button
                                    style={{ borderWidth: 0 }}
                                    titleStyle={{ color: '#172991' }}
                                    type='default'
                                    size='md'
                                    title='确认'
                                    onPress={() => {
                                        if (this.state.chooseItems) {
                                            this.choose(this.state.inputText, this.state.chooseItems[this.state.selectIndex]);
                                        } else {
                                            this.choose(this.state.inputText, null);
                                        }

                                        this.iknow();
                                    }}
                                />
                            </View>

                        </View>
                    </Animated.View>
                </Modal >
            );
        }
    }

    renderChooseItem() {
        return <View style={styles.chooseItemBox}>
            <View style={styles.chooseItem}>
                <Text style={styles.itemText}>{this.state.chooseItems[this.state.selectIndex].reasonDesc}</Text>
                <LuckinButton
                    style={{ paddingLeft: 20 }}
                    imageName={this.state.isOpen ? require('./resources/item_blue_arrow_up.png') : require('../source/img/store_more_arrow.png')}
                    onClick={() => {
                        let isOpen = !this.state.isOpen;
                        let contentHeight = isOpen ? 236 + this.state.chooseItems.length * 30 : 236;
                        let top = (screenHeight - contentHeight) / 2;
                        this.setState({
                            isOpen: isOpen,
                            contentHeight: contentHeight,
                            top: top,
                        }, () => {
                            this.changeAnimate();
                        })
                    }}
                />
            </View>
            {
                this.state.isOpen && this.renderSelectList()
            }
        </View>
    }

    renderSelectList() {
        let items = [];
        for (let i = 0; i < this.state.chooseItems.length; i++) {
            let itemText = this.state.chooseItems[i].reasonDesc;
            items.push(
                <TouchableOpacity
                    style={{ height: 30 }}
                    key={i}
                    activeOpacity={0.4}
                    onPress={() => {
                        let top = (screenHeight - 236) / 2;
                        this.setState({
                            selectIndex: i,
                            isOpen: false,
                            contentHeight: 236,
                            top: top,
                        }, () => {
                            this.changeAnimate();
                        })
                    }}
                >
                    <Text style={styles.listItem}>{itemText}</Text>
                </TouchableOpacity>)

        }
        return items;
    }

    changeAnimate() {
        Animated.parallel([
            Animated.timing(
                this.state.contentHeightAnimated,
                {
                    duration: 200,
                    toValue: this.state.contentHeight
                }
            ),
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            )
        ]).start();
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            ),
            Animated.timing(
                this.state.contentHeightAnimated,
                {
                    duration: 200,
                    toValue: this.state.contentHeight
                }
            )
        ]).start();
    }

    //隐藏动画
    out() {
        this.state.top = screenHeight;
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            ),
            Animated.timing(
                this.state.contentHeightAnimated,
                {
                    duration: 200,
                    toValue: this.initHeight
                }
            )
        ]).start();

        setTimeout(
            () => this.setState({ hide: true }),
            200
        );
    }

    //取消
    iknow(event) {
        if (!this.state.hide) {
            this.out();
        }
        this.setState({
            isFocused: false,
            inputText: '',
            isOpen: false,
            selectIndex: 0,
            contentHeight: this.initHeight,
        })
    }

    //选择
    choose(msg, item) {
        if (!this.state.hide) {
            this.out();
            if (this.chooseAction) {
                this.chooseAction(msg, item);
            }
        }
    }

    /**
   * 显示弹窗
   * @param {弹窗标题} title
   * @param {输入框提示} placeholder
   * @param {拒绝理由的选项数组} chooseItems
   * @param {默认的白色背景高度} contentHeight
   * @param {父组件可为null} obj
   * @param {点击确定的回调} clickButtonAction
   */
    show(title, placeholder, chooseItems, contentHeight, secureTextEntry, obj, clickButtonAction) {
        this.parent = obj;
        this.initHeight = contentHeight;
        this.chooseAction = clickButtonAction;
        if (this.state.hide) {
            this.setState({
                title: title,
                placeholder: placeholder,
                chooseItems: chooseItems,
                contentHeight: contentHeight,
                secureTextEntry: secureTextEntry,
                hide: false,
                top: (screenHeight - contentHeight) / 2
            }, this.in);
        }
    }
}

