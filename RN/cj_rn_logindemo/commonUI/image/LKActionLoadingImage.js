// LKActionLoadingImage.js
/*
LKActionLoadingImage:图片控件(含加载动画和其他可操作事件) 的使用示例

import LKActionLoadingImage  from '../../commonUI/image/LKActionLoadingImage';

                <LKActionLoadingImage style={{width: 164, height: 108, backgroundColor:'red'}}
                                    imageWidth={164}
                                    imageHeight={108}
                                    source={this.state.imageSource}
                                    buttonIndex={buttonIndex}

                                    clickButtonHandle={this.clickButtonHandle}
                                    deleteImageHandle={this.deleteImageHandle}

                                    isEditing={true}
                                    isAddIcon={this.isAddIcon(buttonIndex)}
                />
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import LKLoadingImage, { ImageUploadType } from './LKLoadingImage';
import PropTypes from "prop-types";
import {LKDeleteButton} from "../button/LKImageButton";

export default class LKActionLoadingImage extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        //source: PropTypes.number.isRequired,    //图片
        defaultSource: PropTypes.number,
        showImageBorder: PropTypes.bool,      //是否显示图片边框(默认否)

        clickButtonHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度
        // 判断图片是否已经显示出来了
        // 只用于处理以下体验不友好的特殊情况：从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好
        hasShow: PropTypes.bool,

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        source: require('./resources/imageDefault.png'),
        defaultSource: require('./resources/imageDefault.png'),
        showImageBorder: false,

        clickButtonHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: ImageUploadType.NotNeed,
        uploadProgress: 0,
        hasShow: false,

        changeShowDebugMessage: false,
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        const { style } = this.props;

        const boxWidth = this.props.imageWidth;
        const boxHeight = this.props.imageHeight;

        let imageSource = this.props.source;

        const deleteButtonWidth = 22;
        const imageWidth = boxWidth-deleteButtonWidth/2;
        const imageHeight = boxHeight-deleteButtonWidth/2;
        const imageTopRightPadding = deleteButtonWidth/2;

        let buttonIndex = this.props.buttonIndex;

        let deleteImageButton = this.props.isEditing && !this.props.isAddIcon ? <LKDeleteButton
            style={{ position:'absolute', width: deleteButtonWidth, height: deleteButtonWidth}}
            onPress={()=> {
                this.props.deleteImageHandle(buttonIndex);
            }}
        /> : null;


        let testBoxStyle = this.props.changeShowDebugMessage ? {backgroundColor: 'red'} : null;

        return (
            <TouchableOpacity
                style={[{width:boxWidth}, style, testBoxStyle]}
                onPress={()=> {
                    this.props.clickButtonHandle(buttonIndex);
                }}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >
                    <LKLoadingImage style={{width: imageWidth, height: imageHeight, marginTop: imageTopRightPadding, marginRight:imageTopRightPadding }}
                                    source={imageSource}
                                    defaultSource={this.props.defaultSource}
                                    showImageBorder={this.props.showImageBorder}
                                    buttonIndex={buttonIndex}
                                    onLoadComplete={this.props.onLoadComplete}
                                    uploadType={this.props.uploadType}
                                    uploadProgress={this.props.uploadProgress}
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