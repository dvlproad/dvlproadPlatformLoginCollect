//UploadImagePage.js
import React, { Component } from 'react';
import {View, Text, Alert} from 'react-native';
import LKActionLoadingImage from "../../commonUI/image/LKActionLoadingImage";
import { ImageUploadType } from '../../commonUI/image/LKLoadingImage';

export default class UploadImagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            addIconCurIndex: -1,   //添加按钮的当前索引的值①等于-1代表没有添加显示；②大于imageMaxCount则不显示

            uploadType: ImageUploadType.Uploading,
            uploadProgress: 0,  //图片上传进度
        };
    }

    isAddIcon = (index)=> {
        if (index == this.state.addIconCurIndex) {
            return true;
        } else {
            return false;
        }
    }

    clickButtonHandle = (index)=> {
        if (index == this.state.addIconCurIndex) {
            this.addImageHandle(index);
        } else {
            this.browseImageHandle(index);
        }
    }

    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }


    addImageHandle=(index) => {
        let imageSource = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};

        this.setState({
                addIconCurIndex: -1,
                imageSource: imageSource,
                uploadProgress: 0,
                uploadType: ImageUploadType.Waiting,
            }
        )

        this.uploadImage(imageSource); //测试图片上传
    }

    uploadImage=(imageSource)=>{
        this.state.uploadProgress = 0;
        this.startUploadImage(imageSource);
    }

    getRandom1 = (start, end) => {
        let length = end - start;
        let num = parseInt(Math.random() * (length) + start);
        return num;
    }

    startUploadImage=(imageSource)=>{
        this._uploadTimer=setInterval(()=>{
            let uploadProgress = this.state.uploadProgress;

            let curUploadProgress = this.getRandom1(10, 20);
            uploadProgress += curUploadProgress;
            let uploadType = this.state.uploadType;
            if (uploadProgress >= 100) {
                uploadType = ImageUploadType.Success;
                uploadProgress = 100;
                this._uploadTimer && clearInterval(this._uploadTimer);
                alert("上传成功");
            }  else {
                uploadType = ImageUploadType.Uploading;
            }
            this.setState({
                uploadProgress: uploadProgress,
                uploadType: uploadType,
            });
        },1000);
    }
    stopTime=()=>{
        this._uploadTimer && clearInterval(this._uploadTimer);
    }

    deleteImageHandle=(index) => {
        this.stopTime();

        let addImage = require('../../commonUI/list/resources/pickImage_blue.png');
        this.setState({
                addIconCurIndex: 0,
                imageSource: addImage,
                uploadProgress: 0,
                uploadType: ImageUploadType.NotNeed,
            }
        )
    }

    getUploadStateString=()=>{
        let uploadType = this.state.uploadType;
        let uploadStateString = '';
        switch (uploadType) {
            case ImageUploadType.NotNeed: {
                uploadStateString += '\n' + '不需要上传';
                break;
            }
            case ImageUploadType.Waiting: {
                uploadStateString += '\n' + '等待上传';
                break;
            }
            case ImageUploadType.Uploading: {
                uploadStateString += '\n' + 'uploadProgress:' + this.state.uploadProgress;
                break;
            }
            case ImageUploadType.Success: {
                uploadStateString += '\n' + '上传成功';
                break;
            }
            case ImageUploadType.Failure: {
                uploadStateString += '\n' + '上传失败';
                break;
            }
            default: {
                uploadStateString += '\n' + '什么情况';
                break;
            }
        }
        return uploadStateString;
    }

    render() {
        let boxWidth = 164*1.2;
        let boxHeight = 108*1.2;
        let uploadStateString = this.getUploadStateString();
        let buttonIndex = 0;

        return (
            <View>
                <Text>{uploadStateString}</Text>
                <LKActionLoadingImage
                    imageWidth={boxWidth}
                    imageHeight={boxHeight}
                    imageSource={this.state.imageSource}
                    buttonIndex={buttonIndex}

                    uploadType={this.state.uploadType}
                    uploadProgress={this.state.uploadProgress}

                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}

                    isEditing={true}
                    isAddIcon={this.isAddIcon(buttonIndex)}
                />
            </View>
        )
    }
}