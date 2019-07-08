import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    Dimensions,
} from 'react-native';

import { Button } from "teaset";

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
const [middleTop] = [(screenHeight - 60.0) / 2.0];

export default class LKAlertModal extends Component {
    initHeight = 0;
    isHide = false;
    constructor(props) {
        super(props);
        this.state = {
            confirmClick: null,
            buttonTitle1: null,
            buttonTitle2: null,
            visible: false,
            title: null,
            message: null,
            top: screenHeight,
            topAnimated: new Animated.Value(screenHeight),
        };
    }
    render() {
        return (
            <Modal style={styles.container}
                transparent={true}
                visible={this.state.visible}
            >
                <Animated.View style={styles.mask1}>
                </Animated.View>
                <Animated.View style={[styles.contentBox, { top: this.state.topAnimated }]} onLayout={(e) => { this._onLayout(e) }}>
                    {
                        this.state.title ? <Text style={[styles.title, { marginBottom: this.state.message ? 20 : 76 }]}>{this.state.title}</Text> : null
                    }
                    {
                        this.state.message ?
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    maxHeight: screenHeight / 2,
                                    overflow: 'scroll',
                                    marginBottom: 70,
                                }}>
                                <Text style={[styles.message, { marginTop: this.state.title ? 0 : 30 }]}>{this.state.message}</Text>

                            </ScrollView>
                            : null
                    }
                    <View style={styles.buttonBox}>
                        <View style={{ height: 1, backgroundColor: '#E5E5E5', position: 'absolute', left: 0, bottom: 46, width: 272 }} />
                        {
                            this.state.buttonTitle1 && this.state.buttonTitle2 ? this.renderTowButton() : this.renderOneBotton()
                        }
                    </View>
                </Animated.View>
            </Modal >
        );
    }

    //获取底层灰色bar的宽度
    _onLayout(event) {
        if (this.isHide) {
            return;
        }
        let { height } = event.nativeEvent.layout;
        if (screenHeight != this.state.top) {
            return;
        }
        let top = (screenHeight - height) / 2;
        this.setState({
            top: top
        }, this.changeTop)
    }
    changeTop() {
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 300,
                    toValue: this.state.top
                }
            )
        ]).start();
    }

    renderOneBotton() {
        return <View style={styles.buttonContent}>
            <Button
                style={{ borderWidth: 0 }}
                titleStyle={{ color: '#172991' }}
                type='default'
                size='md'
                title={this.state.buttonTitle1 ? this.state.buttonTitle1 : this.state.buttonTitle2}
                onPress={() => {
                    this.isHide = true;
                    this.state.confirmClick && this.state.confirmClick(1);
                    this.out();
                }}
            />
        </View>;
    }

    renderTowButton() {
        return <View style={styles.buttonContent}>
            <Button
                style={{ borderWidth: 0 }}
                titleStyle={{ color: '#666' }}
                type='default'
                size='md'
                title={this.state.buttonTitle1}
                onPress={() => {
                    this.isHide = true;
                    this.state.confirmClick && this.state.confirmClick(0);
                    this.out();
                }}
            />
            <View style={{ height: 46, width: 1, backgroundColor: '#E5E5E5', position: 'absolute', left: 136, bottom: 0 }}></View>
            <Button
                style={{ borderWidth: 0 }}
                titleStyle={{ color: '#172991' }}
                type='default'
                size='md'
                title={this.state.buttonTitle2}
                onPress={() => {
                    this.isHide = true;
                    this.state.confirmClick && this.state.confirmClick(1);
                    this.out();
                }}
            />
        </View>;
    }
    /**
     *显示弹窗
     *
     * @param {标题*} [title=null]
     * @param {消息内容*} [message=null]
     * @param {第一个按钮标题*} [buttonTitle1=null]
     * @param {第二个按钮标题*} [buttonTitle2=null]
     * @param {点击按钮回调*} confirmClick（index = 0:第一个按钮点击，1：第二个那妞点击，只有一个按钮无需处理）
     * @memberof LKAlertModal
     */
    show(title = null, message = null, buttonTitle1 = null, buttonTitle2 = null, confirmClick) {
        this.setState({
            title: title,
            message: message,
            buttonTitle1: buttonTitle1,
            buttonTitle2: buttonTitle2,
            visible: true,
            confirmClick: confirmClick,
        }, this.in)
    }
    /**
     *显示默认取消，确定按钮弹窗
     *
     * @param {标题*} [title=null]
     * @param {消息内容*} [message=null]
     * @param {点击按钮回调*} confirmClick（index = 0:第一个按钮点击，1：第二个那妞点击，只有一个按钮无需处理）
     * @memberof LKAlertModal
     */
    showDefaultButton(title = null, message = null, confirmClick) {
        this.setState({
            title: title,
            message: message,
            buttonTitle1: '取消',
            buttonTitle2: '确定',
            visible: true,
            confirmClick: confirmClick,
        }, this.in)
    }
    dismiss() {
        this.setState({
            message: null,
            buttonTitle1: null,
            buttonTitle2: null,
            visible: false,
            confirmClick: null,
        })
        this.isHide = false;
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 300,
                    toValue: this.state.top
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
                    duration: 300,
                    toValue: this.state.top
                }
            ),
        ]).start();

        setTimeout(
            () => this.dismiss(),
            300
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
    },
    mask: {
        position: "absolute",
        width: screenWidth,
        height: screenHeight,
    },
    mask1: {
        backgroundColor: "#000",
        opacity: 0.3,
        position: "absolute",
        width: screenWidth,
        height: screenHeight,
    },
    content: {
        width: screenWidth,
        height: 60,
        position: 'absolute',
        left: 0,
        top: middleTop,
        alignItems: 'center',
    },
    imageBox: {
        width: 48,
        height: 48,
    },
    tipMessage: {
        marginTop: 15,
        fontSize: 15,
        color: '#FFF',

    },
    contentBox: {
        overflow: 'hidden',
        width: 272,
        backgroundColor: '#FFF',
        borderRadius: 5,
        left: (screenWidth - 272) / 2
    },
    title: {
        marginHorizontal: 15,
        marginTop: 30,
        lineHeight: 18,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    message: {
        marginHorizontal: 15,
        lineHeight: 16,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',

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
    actionSheetBox: {
        backgroundColor: '#FFF',
    },
    actionSheetTitleBox: {
        height: 51,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionSheetTitle: {
        lineHeight: 51,
        marginHorizontal: 15,
        color: '#999',
        fontSize: 14,
        textAlign: 'center',
    },
    closeButton: {
        marginHorizontal: 15,
    },
    itemBox: {
        width: screenWidth,
        height: 51,
        borderTopWidth: 1,
        borderTopColor: '#F1F1F1',
        backgroundColor: '#FFF',
    }
});
