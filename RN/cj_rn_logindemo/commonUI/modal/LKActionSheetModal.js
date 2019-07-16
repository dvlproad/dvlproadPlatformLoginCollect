import React, { Component } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Animated,
    ScrollView,
    TouchableHighlight,
    PanResponder,
    Dimensions,
} from 'react-native';


let screenHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 20;
let screenWidth = Dimensions.get('window').width;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
const [screenMiddleTop] = [(screenHeight - 60.0) / 2.0];

export default class LKActionSheetModal extends Component {
    constructor(props) {
        super(props);
        this.watcher = null;   //监视器
        this.state = {
            confirmClick: null,
            visible: false,
            title: null,
            arrayItems: [],
            showKey: null,
            top: Dimensions.get('window').height,
            topAnimated: new Animated.Value(screenHeight),
            height: 0,
        };
    }

    componentWillMount() {
        this.watcher = PanResponder.create({  //建立监视器
            onStartShouldSetPanResponder: () => true,  //判断是否要监听，这里直接返回true
            onPanResponderEnd: (event) => {
                this.out();
            },   //结束
        });
    }
    render() {
        let actionSheetTitleBox = (
            this.state.title ? <View style={styles.actionSheetTitleBox}>
                <Text style={styles.actionSheetTitle}>{this.state.title}</Text>
            </View> : null
        );

        return (
            <Modal style={styles.container}
                transparent={true}
                visible={this.state.visible}
            >
                <Animated.View style={styles.mask1} {...this.watcher.panHandlers}>
                </Animated.View>
                <Animated.View style={[styles.actionSheetBox, { top: this.state.topAnimated }]}>
                    {actionSheetTitleBox}

                    <ScrollView
                        style={{ height: this.state.height }}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                    >
                        {
                            this.renderItemArray()
                        }
                    </ScrollView>
                    <View style={{ backgroundColor: '#F1F1F1', height: 10, marginBottom: screenBottomHeight + 52 }} />
                    {
                        this.renderOneButton()
                    }
                </Animated.View>
            </Modal >
        );
    }

    renderItemArray() {
        let array = [];
        let items = this.state.arrayItems;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            array.push(this.renderItem(i, item));
        }
        return array;
    }

    renderItem(index, item) {
        return <View key={index} style={styles.itemBox}>
            <TouchableHighlight
                style={{ flex: 1 }}
                activeOpacity={0.8}
                underlayColor={'#F1F1F1'}
                onPress={() => {
                    this.state.confirmClick && this.state.confirmClick(index, item);
                    this.out();
                }}>
                <Text style={{ color: '#333', fontSize: 15, textAlign: 'center', lineHeight: 50 }}>{this.state.showKey ? item[this.state.showKey] : item}</Text>
            </TouchableHighlight>
        </View>
    }

    renderOneButton() {
        return <View style={{
            height: 52, position: 'absolute', left: 0, right: 0,
            bottom: screenBottomHeight
        }}>
            <Button
                style={{ borderWidth: 0, height: 52 }}
                titleStyle={{ color: '#172991' }}
                type='default'
                size='md'
                title={'取消'}
                onPress={() => {
                    this.out();
                }}
            />
        </View>;
    }

    /**
     * 显示弹窗
     *
     * @param {标题 *}
     * @param {item数组 *}
     * @param {显示内容的key,null时数组的成员是字符串，不为 null时数组的对象是json*} [showKey=null]
     * @param {点击按钮回调 *} confirmClick（index = 0:第一个按钮点击，1：第二个那妞点击，只有一个按钮无需处理）
     * @memberof LKActionSheetModal
     */
    show(title = null, arrayItems, showKey = null, confirmClick) {
        let titleHeight = title ? 51 : 0;
        let otherHeight = screenBottomHeight + 52 + 10 + titleHeight;

        let height = otherHeight + (arrayItems.length * 51);
        if (height > screenHeight * 0.7) {
            height = screenHeight * 0.7;
        }
        let top = screenHeight - height;
        this.setState({
            title: title,
            arrayItems: arrayItems,
            showKey: showKey,
            visible: true,
            confirmClick: confirmClick,
            top: top,
            height: height - otherHeight,
        }, this.in)
    }
    dismiss() {
        this.setState({
            arrayItems: [],
            showKey: null,
            visible: false,
            confirmClick: null,
        })
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
        ]).start();

        setTimeout(
            () => this.dismiss(),
            200
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
        top: screenMiddleTop,
        alignItems: 'center',
    },
    imageBox: {
        width: 48,
        height: 48,
    },
    tipMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'white',

    },
    contentBox: {
        overflow: 'hidden',
        width: 272,
        backgroundColor: 'white',
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



