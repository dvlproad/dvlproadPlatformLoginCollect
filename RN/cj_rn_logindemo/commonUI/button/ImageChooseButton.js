//ImageChooseButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, Image, Text, TouchableOpacity, ActivityIndicator} from "react-native";

/// 图片来源
export var ImageSourceType = {
    Default: 0,     /**< 无, 使用默认图片 */
    Local: 1,       /**< 本地 */
    Network: 2      /**< 网络 */
};

/// 图片加载状态
var ImageLoadStatus = {
    Pending: 0,     /**< 准备加载 */
    Loading: 1,     /**< 正在加载 */
    Success: 2,     /**< 加载成功 */
    Failure: 3,     /**< 加载失败 */
};


export default class ImageChooseButton extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        // imageSource: PropTypes.object.isRequired,

        clickButtonHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        imageSource: require('./resources/healthCerImage1.png'),

        clickButtonHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loadStatus: ImageLoadStatus.Pending,
        }
    }

    /**
     * 开始加载(当开始加载图片调用该方法)
     */
    onLoadStart = () => {
        this.setState({
            loaded: false,
            loadStatus: ImageLoadStatus.Loading,
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
        this.setState({
            loadStatus: ImageLoadStatus.Success
        })
    }

    /**
     * 加载失败(该属性要赋值一个function，当加载出错执行赋值的这个方法)
     * @param {*} error
     */
    onLoadError=(error) => {
        console.log(error)
        this.setState({
            loadStatus: ImageLoadStatus.Failure
        })
    }


    render() {
        const { style } = this.props;

        const boxWidth = this.props.imageWidth;
        const boxHeight = this.props.imageHeight;

        let imageSource = this.props.imageSource;

        const deleteButtonWidth = 22;
        const imageWidth = boxWidth-deleteButtonWidth/2;
        const imageHeight = boxHeight-deleteButtonWidth/2;
        const imageTopRightPadding = deleteButtonWidth/2;

        let buttonIndex = this.props.buttonIndex;

        let deleteImageButton = this.props.isEditing && !this.props.isAddIcon ? <DeleteImageButton
            style={{ position:'absolute', width: deleteButtonWidth, height: deleteButtonWidth}}
            deleteImageHandle={()=> {
                this.props.deleteImageHandle(buttonIndex);
            }}
        /> : null;

        let imageText = 'ButtonIndex:' + buttonIndex;

        return (
            <TouchableOpacity
                style={[{width:boxWidth, backgroundColor:'red'}, style]}
                onPress={()=> {
                    this.props.clickButtonHandle(buttonIndex);
                }}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >

                    <Image style={{width: imageWidth, height: imageHeight, marginTop: imageTopRightPadding, marginRight:imageTopRightPadding }}
                           source={imageSource}
                           defaultSource={require('./resources/imageLook.png')}
                           onLoadStart={this.onLoadStart}
                           onLoadEnd={this.onLoadEnd}
                           onLoad={this.onLoadSuccess}
                           onError={this.onLoadError}
                    />

                    <Text style={{
                        backgroundColor: 'rgba(0,0,255,0.3)',
                        position:'absolute',
                        width:boxWidth,
                        height:boxHeight,
                        lineHeight: boxHeight,
                        textAlign: 'center',
                        fontSize: 26,
                        color: '#99ff22'
                    }}
                    >
                        {imageText}
                    </Text>

                    <ActivityIndicator
                        style={{position:'absolute', width:boxWidth, height:boxHeight}}
                        size="large"
                        color="red"
                        animating={this.state.loadStatus == ImageLoadStatus.Loading}
                    />

                    {deleteImageButton}
                </View>




            </TouchableOpacity>
        );
    }
}

export class DeleteImageButton extends Component {
    static propTypes = {
        deleteImageHandle: PropTypes.func
    };

    static defaultProps = {
        deleteImageHandle: null,
    };


    render() {
        return (
            <View style={this.props.style} >
                <TouchableOpacity onPress={this.props.deleteImageHandle} >
                    <Image source={require('./resources/healthCer_delete_blue.png') } />
                </TouchableOpacity>
            </View>
        )
    }
}