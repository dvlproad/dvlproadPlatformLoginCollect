// LKLoadingImage.js
/*
LKLoadingImage:图片控件(只含加载动画,但不含其他可操作事件) 的使用示例

import LKLoadingImage from '../../commonUI/image/LKLoadingImage';

                <LKLoadingImage style={{width: 200, height: 200, backgroundColor:'red'}}
                                imageWidth={200}
                                imageHeight={200}
                                imageSource={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}}
                />

 */

import React, { Component } from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator} from "react-native";
import PropTypes from "prop-types";

/// 图片加载状态
var ImageLoadStatus = {
    Pending: 0,     /**< 准备加载 */
    Loading: 1,     /**< 正在加载 */
    Success: 2,     /**< 加载成功 */
    Failure: 3,     /**< 加载失败 */
};

/// 图片来源
export var ImageUploadType = {
    NotNeed: 0,     /**< 不需要上传 */
    Waiting: 1,     /**< 等待上传 */
    Uploading: 2,   /**< 正在上传 */
    Success: 3,     /**< 上传成功 */
    Failure: 4,     /**< 上传失败 */
};

var isNetworkImage = false;

export default class LKLoadingImage extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        imageSource: PropTypes.object.isRequired,    //图片
        defaultSource: PropTypes.number,

        buttonIndex: PropTypes.number.isRequired,

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        imageSource: require('./resources/imageDefault.png'),
        defaultSource: require('./resources/imageDefault.png'),

        buttonIndex: 0,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: ImageUploadType.NotNeed,
        uploadProgress: 0,

        changeShowDebugMessage: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            loadStatus: ImageLoadStatus.Pending,
        }
    }

    /**
     * 是否是网络图片
     */
    checkIsNetworkImage= (imageSource) => {
        let isNetworkImage = false;
        if (imageSource.hasOwnProperty('uri') && typeof imageSource['uri'] === 'string') {
            let uri = imageSource['uri'];
            if (uri.indexOf('http:') == 0 || uri.indexOf('https:') == 0) {
                isNetworkImage = true;
            }
        }
        return isNetworkImage;
    }

    /**
     * 开始加载(当开始加载图片调用该方法)
     */
    onLoadStart = () => {
        let loadStatus = isNetworkImage ? ImageLoadStatus.Loading : ImageLoadStatus.Success;
        this.setState({
            loaded: false,
            loadStatus: loadStatus,
        })
    }


    /**
     * 加载结束(当加载完成回调该方法，不管图片加载成功还是失败都会调用该方法)
     */
    onLoadEnd = () => {
        this.setState({
            loaded: true,
        })
    }

    /**
     * 加载成功(当图片加载成功之后，回调该方法)
     */
    onLoadSuccess=() => {
        let simulateNetworkImageLoad = isNetworkImage ? 2000 : 0;
        setTimeout(()=> {
            this.setState({
                loadStatus: ImageLoadStatus.Success
            });

            this.props.onLoadComplete(this.props.buttonIndex);
        }, simulateNetworkImageLoad);
    }

    /**
     * 加载失败(该属性要赋值一个function，当加载出错执行赋值的这个方法)
     * @param {*} error
     */
    onLoadError=(error) => {
        console.log(error)
        this.setState({
            loadStatus: ImageLoadStatus.Failure
        });
        this.props.onLoadComplete(this.props.buttonIndex);
    }


    /**
     * 获取正式的信息
     */
    getFormalImageStateText=()=> {
        let formalImageStateText = '';
        switch (this.props.uploadType) {
            case ImageUploadType.Uploading: {
                formalImageStateText = this.changeTwoDecimal_f(this.props.uploadProgress) + '%';
                break;
            }
            case ImageUploadType.Success: {
                formalImageStateText = '上传成功';
                break;
            }
            case ImageUploadType.Failure: {
                formalImageStateText = '重新上传';
                break;
            }
            default: {
                formalImageStateText = '';
                break;
            }
        }
        return formalImageStateText;
    }

    /**
     * 始终保留两位小数的方法
     * @param x
     * @returns {string|*}
     */
    changeTwoDecimal_f(x) {
        try {
            let f_x1 = parseFloat(x);
            if (isNaN(f_x1)) {
                return x;
            }
            let f_x = Math.round(x * 100) / 100;
            let s_x = f_x.toString();
            let pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        } catch (e) {
            return '0.00';
        }
    }

    /**
     * 获取调试的信息
     */
    getDebugImageStateText=()=> {
        let debugImageStateText = 'ButtonIndex:' + this.props.buttonIndex;
        isNetworkImage = this.checkIsNetworkImage(this.props.imageSource);
        debugImageStateText += '\nisNetworkImage:' + (isNetworkImage?'true':'false');
        debugImageStateText += this.getDebugImageUploadStateText();

        // let imageSource = this.props.imageSource;
        // if (imageSource.hasOwnProperty('uri') && typeof imageSource['uri'] === 'string') {
        //     debugImageStateText += '\n' + imageSource['uri'];
        // }
        return debugImageStateText;
    }

    getDebugImageUploadStateText=()=> {
        let debugImageUploadStateText = '';
        switch (this.props.uploadType) {
            case ImageUploadType.NotNeed: {
                debugImageUploadStateText += '\n' + '不需要上传';
                break;
            }
            case ImageUploadType.Waiting: {
                debugImageUploadStateText += '\n' + '等待上传';
                break;
            }
            case ImageUploadType.Uploading: {
                debugImageUploadStateText += '\n' + 'uploadProgress:' + this.props.uploadProgress;
                break;
            }
            case ImageUploadType.Success: {
                debugImageUploadStateText += '\n' + '上传成功';
                break;
            }
            case ImageUploadType.Failure: {
                debugImageUploadStateText += '\n' + '上传失败';
                break;
            }
            default: {
                debugImageUploadStateText += '\n' + '什么情况';
                break;
            }
        }
        return debugImageUploadStateText;
    }


    render() {
        const { style } = this.props;

        const imageWidth = this.props.imageWidth;
        const imageHeight = this.props.imageHeight;


        let imageStateText = this.getFormalImageStateText();
        if (this.props.changeShowDebugMessage) {
            imageStateText = this.getDebugImageStateText()
        }

        let stateBGColor = imageStateText.length > 0 ? 'rgba(0,0,0,0.6)' : null;
        if (this.props.changeShowDebugMessage) {
            stateBGColor = 'rgba(0,0,255,0.3)';
        }

        let stateTextStyle ={flex: 1, textAlign: 'center', fontSize: 17, color: '#FFFFFF'};
        if (this.props.changeShowDebugMessage) {
            stateTextStyle = [stateTextStyle, {color: '#99ff22'}]
        } else {
            stateTextStyle = [stateTextStyle, {lineHeight: imageHeight}];
        }

        let stateComponent = (
            <View style={{backgroundColor:stateBGColor, position:'absolute', width:imageWidth, height:imageHeight}}>
                <Text style={stateTextStyle}>{imageStateText}</Text>
            </View>
        );

        return (
            <View style={[{flex:1}, style]} >

                <Image style={{width: imageWidth, height: imageHeight }}
                       source={this.props.imageSource}
                       defaultSource={this.props.defaultSource}
                       onLoadStart={this.onLoadStart}
                       onLoadEnd={this.onLoadEnd}
                       onLoad={this.onLoadSuccess}
                       onError={this.onLoadError}
                />

                {stateComponent}

                <ActivityIndicator
                    style={{
                        position:'absolute',
                        width:imageWidth,
                        height:imageHeight,
                    }}
                    size="large"
                    color="red"
                    animating={this.state.loadStatus == ImageLoadStatus.Loading}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({

})