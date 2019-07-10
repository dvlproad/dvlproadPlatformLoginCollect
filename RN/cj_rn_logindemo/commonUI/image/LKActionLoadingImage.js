// LKActionLoadingImage.js
/*
LKActionLoadingImage:图片控件(含加载动画和其他可操作事件) 的使用示例

import LKActionLoadingImage  from '../../commonUI/image/LKActionLoadingImage';

                <LKActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'red', borderRadius:10,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 6,
                        borderWidth: 3,
                        borderColor: "cyan",
                    }}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562747201772&di=e5e02e2208aea4acdfd1fa92d4a10d42&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FI9-_x2ze5vz07q7YorAc1Q%3D%3D%2F151715012463950227.jpg'}}

                    isEditing={true}
                    uploadType={ImageUploadType.Uploading}
                    uploadProgress={60}
                    clickButtonHandle={()=>{
                        LKToastUtil.showMessage('点击图片');
                    }}
                    deleteImageHandle={()=>{
                        LKToastUtil.showMessage('点击删除');
                    }}
                />
 */

import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, ViewPropTypes} from 'react-native';
import LKLoadingImage, { ImageUploadType } from './LKLoadingImage';
import PropTypes from "prop-types";
import {LKDeleteButton} from "../button/LKImageButton";

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class LKActionLoadingImage extends Component {
    static propTypes = {
        //source: PropTypes.number.isRequired,    //图片
        defaultSource: PropTypes.number,
        imageBorderStyle: stylePropTypes,   //图片边框样式

        clickButtonHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度
        // 是否需要加载动画(默认需要)
        // 有以下体验不友好的情况需要特殊处理：即从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好，需要设置本属性为false
        needLoadingAnimation: PropTypes.bool,

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        source: require('./resources/imageDefault.png'),
        defaultSource: require('./resources/imageDefault.png'),
        imageBorderStyle: {
            borderRadius: 6,
            borderWidth: 0,
            borderColor: "#E5E5E5",
        },

        clickButtonHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: ImageUploadType.NotNeed,
        uploadProgress: 0,
        needLoadingAnimation: true,

        changeShowDebugMessage: false,
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        const { style } = this.props;

        let buttonIndex = this.props.buttonIndex;

        const boxWidth = this.props.style.width;
        const boxHeight = this.props.style.height;
        let testBoxStyle = this.props.changeShowDebugMessage ? {backgroundColor: 'red'} : null;
        let boxStyle = [
            {width:boxWidth},
            style,
            testBoxStyle
        ];

        // 图片删除按钮
        const deleteButtonWidth = 22;
        let shouldShowDeleteButton = this.props.isEditing && !this.props.isAddIcon;
        let deleteButtonStyle = {
            position:'absolute',
            width: deleteButtonWidth,
            height: deleteButtonWidth
        };
        let deleteImageButton = shouldShowDeleteButton ?
            (
                <LKDeleteButton
                    style={deleteButtonStyle}
                    onPress={()=> {
                        this.props.deleteImageHandle(this.props.buttonIndex);
                    }}
                />
            )
            :
            null;

        // 图片展示视图
        const imageWidth = boxWidth-deleteButtonWidth/2;
        const imageHeight = boxHeight-deleteButtonWidth/2;
        const imageTopRightPadding = deleteButtonWidth/2;
        let imageStyle = {
            width: imageWidth,
            height: imageHeight,
            marginTop: imageTopRightPadding,
            marginRight:imageTopRightPadding
        };


        return (
            <TouchableOpacity
                style={boxStyle}
                onPress={()=> {
                    this.props.clickButtonHandle(buttonIndex);
                }}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >
                    <LKLoadingImage
                        style={imageStyle}
                        source={this.props.source}
                        defaultSource={this.props.defaultSource}
                        imageBorderStyle={this.props.imageBorderStyle}
                        buttonIndex={buttonIndex}
                        onLoadComplete={this.props.onLoadComplete}
                        uploadType={this.props.uploadType}
                        uploadProgress={this.props.uploadProgress}
                        needLoadingAnimation={this.props.needLoadingAnimation}
                        changeShowDebugMessage={this.props.changeShowDebugMessage}
                    />
                    {deleteImageButton}
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    button: {

    }
})