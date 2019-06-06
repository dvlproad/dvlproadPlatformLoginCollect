//LoadingImage.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, Image, Text, ActivityIndicator} from "react-native";


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

export default class LoadingImage extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        // imageSource: PropTypes.object.isRequired,    //图片

        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        imageSource: require('./imageDefault.png'),

        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: ImageUploadType.NotNeed,
        uploadProgress: 0,
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


    render() {
        const { style } = this.props;

        const imageWidth = this.props.imageWidth;
        const imageHeight = this.props.imageHeight;

        let buttonIndex = this.props.buttonIndex;


        let imageText = 'ButtonIndex:' + buttonIndex;
        isNetworkImage = this.checkIsNetworkImage(this.props.imageSource);
        imageText += '\nisNetworkImage:' + (isNetworkImage?'true':'false');
        // if (imageSource.hasOwnProperty('uri') && typeof imageSource['uri'] === 'string') {
        //     imageText += '\n' + imageSource['uri'];
        // }
        switch (this.props.uploadType) {
            case ImageUploadType.NotNeed: {
                imageText += '\n' + '不需要上传';
                break;
            }
            case ImageUploadType.Waiting: {
                imageText += '\n' + '等待上传';
                break;
            }
            case ImageUploadType.Uploading: {
                imageText += '\n' + 'uploadProgress:' + this.props.uploadProgress;
                break;
            }
            case ImageUploadType.Success: {
                imageText += '\n' + '上传成功';
                break;
            }
            case ImageUploadType.Failure: {
                imageText += '\n' + '上传失败';
                break;
            }
            default: {
                imageText += '\n' + '什么情况';
                break;
            }
        }

        let networkImage = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};

        return (
            <View style={{flex:1}} >

                <Image style={{width: imageWidth, height: imageHeight }}
                       source={networkImage}
                       defaultSource={require('./imageDefault.png')}
                       onLoadStart={this.onLoadStart}
                       onLoadEnd={this.onLoadEnd}
                       onLoad={this.onLoadSuccess}
                       onError={this.onLoadError}
                />

                <Text style={{
                    backgroundColor: 'rgba(0,0,255,0.3)',
                    position:'absolute',
                    width:imageWidth,
                    height:imageHeight,
                    //lineHeight: boxHeight,
                    textAlign: 'center',
                    fontSize: 17,
                    color: '#99ff22'
                }}
                >
                    {imageText}
                </Text>

                <ActivityIndicator
                    style={{position:'absolute', width:imageWidth, height:imageHeight}}
                    size="large"
                    color="red"
                    animating={this.state.loadStatus == ImageLoadStatus.Loading}
                />
            </View>
        );
    }
}