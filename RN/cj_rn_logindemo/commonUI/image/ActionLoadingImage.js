//ActionLoadingImage.js
//已解耦的图片选择视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View, Image, TouchableOpacity} from "react-native";
import LoadingImage, { ImageUploadType } from './LoadingImage';

export default class ActionLoadingImage extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        // imageSource: PropTypes.object.isRequired,    //图片

        clickButtonHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        uploadType: PropTypes.number,       //图片上传类型
        uploadProgress: PropTypes.number,   //图片上传进度

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        imageSource: require('./resources/imageDefault.png'),

        clickButtonHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,

        onLoadComplete: (buttonIndex)=>{},

        uploadType: ImageUploadType.NotNeed,
        uploadProgress: 0,

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


        let testBoxStyle = this.props.changeShowDebugMessage ? {backgroundColor: 'red'} : null;

        return (
            <TouchableOpacity
                style={[{width:boxWidth}, style, testBoxStyle]}
                onPress={()=> {
                    this.props.clickButtonHandle(buttonIndex);
                }}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >
                    <LoadingImage style={{width: imageWidth, height: imageHeight, marginTop: imageTopRightPadding, marginRight:imageTopRightPadding }}
                                  imageWidth={imageWidth}
                                  imageHeight={imageHeight}
                                  imageSource={imageSource}
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

var styles = StyleSheet.create({
    button: {

    }
})