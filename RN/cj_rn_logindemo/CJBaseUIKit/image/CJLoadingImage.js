// CJLoadingImage.js
/*
CJLoadingImage:图片控件(只含加载动画,但不含其他可操作事件) 的使用示例

import CJLoadingImage from '../../commonUI/image/CJLoadingImage';

                <CJLoadingImage style={{width: 200, height: 200, backgroundColor:'red'}}
                                source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}}
                />

 */

import React, { Component } from 'react';
import {StyleSheet, View, Image, Text, ActivityIndicator, ViewPropTypes} from "react-native";
import PropTypes from "prop-types";

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

import { ObjectCJHelper } from '../../CJBaseHelper/CJBaseHelper';

/// 图片加载状态
var CJImageLoadStatus = {
    Pending: 0,     /**< 准备加载 */
    Loading: 1,     /**< 正在加载 */
    Success: 2,     /**< 加载成功 */
    Failure: 3,     /**< 加载失败 */
    End:     4,     /**< 加载结束 */
    ErrorImageSuccess: 5,     /**< 加载"加载失败时候的照片"成功 */
    ErrorImageFailure: 6,     /**< 加载"加载失败时候的照片"也失败 */
};

/// 图片来源
export var CJImageUploadType = {
    NotNeed: 0,     /**< 不需要上传 */
    Waiting: 1,     /**< 等待上传 */
    Uploading: 2,   /**< 正在上传 */
    Success: 3,     /**< 上传成功 */
    Failure: 4,     /**< 上传失败 */
};



export default class CJLoadingImage extends Component {
    static propTypes = {
        //source: PropTypes.number.isRequired,    //图片
        defaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),    //图片加载前的默认显示图
        errorSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),      //图片加载失败的显示图
        imageBorderStyle: stylePropTypes,   //图片边框样式

        buttonIndex: PropTypes.number.isRequired,

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度(值范围为0到100)
        // 是否需要加载动画(默认需要)
        // 有以下体验不友好的情况需要特殊处理：即从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好，需要设置本属性为false
        needLoadingAnimation: PropTypes.bool,

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        source: require('./resources/imageDefault.png'),
        defaultSource: require('./resources/imageDefault.png'),
        errorSource: require('./resources/imageError.png'),
        imageBorderStyle: {
            borderRadius: 6,
            borderWidth: 0,
            borderColor: "#E5E5E5",
        },

        buttonIndex: 0,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: CJImageUploadType.NotNeed,
        uploadProgress: 0,
        needLoadingAnimation: false,

        changeShowDebugMessage: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            isNetworkImage: false,
            loadStatus: CJImageLoadStatus.Pending,
            shouldShowErrorSource: false,
            isShowingErrorSource: false,
        }
    }

    componentDidMount(): void {
        this.state.isNetworkImage = this.checkIsNetworkImage(this.props.source);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.source !== nextProps.source){
            this.state.shouldShowErrorSource = false;
            this.state.isShowingErrorSource = false;

            let isNetworkImage = this.checkIsNetworkImage(nextProps.source);
            this.setState({
                isNetworkImage: isNetworkImage,
            })
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
        let loadStatus = this.state.isNetworkImage ? CJImageLoadStatus.Loading : CJImageLoadStatus.Success;
        this.setState({
            loadStatus: loadStatus,
        })
    }


    /**
     * 加载结束(当加载完成回调该方法，不管图片加载成功还是失败都会调用该方法)
     */
    onLoadEnd = () => {
        if (this.state.isShowingErrorSource) { //防止重复setState，死循环

        } else {
            this.props.onLoadComplete(this.props.buttonIndex);
        }

        this.setState({
            loadStatus: CJImageLoadStatus.End
        })
    }


    /**
     * 加载成功(当图片加载成功之后，回调该方法)
     */
    onLoadSuccess=() => {
        if (this.state.isShowingErrorSource) {
            this.state.loadStatus = CJImageLoadStatus.ErrorImageSuccess;
        } else {
            this.state.loadStatus = CJImageLoadStatus.Success;
        }
    }

    /**
     * 加载失败(该属性要赋值一个function，当加载出错执行赋值的这个方法)
     * @param {*} error
     */
    onLoadError=(error) => {
        if (this.state.isShowingErrorSource) {
            console.log("如果当要显示的图加载失败时候，转为显示加载失败时，" +
                "却发现连传入的图片加载失败图都是错误的，那就不处理");
            this.state.loadStatus = CJImageLoadStatus.ErrorImageFailure;

        } else {
            this.state.shouldShowErrorSource = true;
            if (this.state.isNetworkImage) {
                console.log("加载图片失败" + '\n'
                    + "加载的图片的地址是:" + this.props.source['uri'] + '\n'
                    + '失败原因:' + error.nativeEvent.error);
            } else {
                console.log("加载图片失败" + '\n'
                    + "加载的图片的地址是:" + "为本地图片" + '\n'
                    + '失败原因:' + error.nativeEvent.error);
            }

            this.state.loadStatus = CJImageLoadStatus.Failure;
        }
    }


    /**
     * 获取正式的信息
     */
    getFormalImageStateText=()=> {
        let formalImageStateText = '';
        switch (this.props.uploadType) {
            case CJImageUploadType.Waiting: {
                formalImageStateText = '准备上传';
                break;
            }
            case CJImageUploadType.Uploading: {
                formalImageStateText = this.changeTwoDecimal_f(this.props.uploadProgress) + '%';
                break;
            }
            case CJImageUploadType.Success: {
                formalImageStateText = '上传成功';
                break;
            }
            case CJImageUploadType.Failure: {
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
     * @param x 要处理的数字
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
        let isNetworkImage = this.state.isNetworkImage;
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
            case CJImageUploadType.NotNeed: {
                debugImageUploadStateText += '\n' + '不需要上传';
                break;
            }
            case CJImageUploadType.Waiting: {
                debugImageUploadStateText += '\n' + '等待上传';
                break;
            }
            case CJImageUploadType.Uploading: {
                debugImageUploadStateText += '\n' + 'uploadProgress:' + this.props.uploadProgress;
                break;
            }
            case CJImageUploadType.Success: {
                debugImageUploadStateText += '\n' + '上传成功';
                break;
            }
            case CJImageUploadType.Failure: {
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
        let selfStyle = ObjectCJHelper.dealPropStyle(this.props.style);

        const imageWidth = selfStyle.width;
        const imageHeight = selfStyle.height;

        if (selfStyle.width > 0 && selfStyle.height > 0) {

        } else {
            selfStyle = [{flex:1}, selfStyle];
        }


        let imageStateText = this.getFormalImageStateText();
        if (this.props.changeShowDebugMessage) {
            imageStateText = this.getDebugImageStateText()
        }

        let stateBGColor = imageStateText.length > 0 ? 'rgba(0,0,0,0.6)' : null;
        if (this.props.changeShowDebugMessage) {
            stateBGColor = 'rgba(0,0,255,0.3)';
        }

        let stateTextStyle ={flex: 1, textAlign: 'center', fontSize: 17, color: '#FFFFFF'};
        let stateTextWidth = imageWidth;
        let stateTextHeight = imageHeight;
        if (this.props.uploadType == CJImageUploadType.Success) {
            stateTextHeight = 0;
        }
        //let stateTextHeight = imageHeight * (1-this.props.uploadProgress/100);

        if (this.props.changeShowDebugMessage) {
            stateTextStyle = [stateTextStyle, {color: '#99ff22'}]
        } else {
            stateTextStyle = [stateTextStyle, {lineHeight: stateTextHeight}];
        }

        let stateComponentStyle = [
            {
                backgroundColor:stateBGColor,
                position:'absolute',
                width:stateTextWidth,
                height:stateTextHeight
            },
            this.props.imageBorderStyle
        ];

        let stateComponent = (
            <View style={stateComponentStyle}>
                <Text
                    style={stateTextStyle}
                >
                    {imageStateText}
                </Text>
            </View>
        );

        let showLoadingHUD = false;
        if (this.props.needLoadingAnimation) {
            showLoadingHUD = this.state.loadStatus == CJImageLoadStatus.Loading;
        }

        let imageStyle = [
            {
                width: imageWidth,
                height: imageHeight,
                borderRadius: 6,
                borderWidth: 0,
                borderColor: "#E5E5E5",
            },
            this.props.imageBorderStyle
        ];

        let showingImage = this.props.source;
        if (this.state.shouldShowErrorSource) {
            showingImage = this.props.errorSource;
            this.state.isShowingErrorSource = true;
        }

        return (
            <View
                style={selfStyle}
            >
                <Image
                    style={imageStyle}
                    source={showingImage}
                    defaultSource={this.props.defaultSource}
                    resizeMode={'stretch'}
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
                    color="#172991"
                    animating={showLoadingHUD}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    imageBorder: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    }
})
