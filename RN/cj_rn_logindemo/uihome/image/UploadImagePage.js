//UploadImagePage.js

import React, { Component } from 'react'
import ImageChooseButton from "../../commonUI/button/ImageChooseButton";

export default class UploadImagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},

            uploadProgress: 0,  //图片上传进度

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态

            isAddIcon: false,

        };
    }

    addImageHandle=(index) => {
        let imageSource = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};

        this.setState({
            isAddIcon: false,
            imageSource: imageSource,
            }
        )

        this.uploadImage(imageSource); //测试图片上传
    }

    uploadImage(imageSource){
        this.state.uploadProgress = 0;
        this.startUploadImage(imageSource);
    }

    getRandom1 = (start, end) => {
        let length = end - start;
        let num = parseInt(Math.random() * (length) + start);
        return num;
    }

    startUploadImage(imageSource){
        let uploadProgress = this.state.uploadProgress;
        if(uploadProgress > 100){
            this._uploadTimer && clearInterval(this._uploadTimer);
            alert("本文件已上传结束");
            return;
        }
        this._uploadTimer=setInterval(()=>{
            if(uploadProgress > 100){
                this._uploadTimer && clearInterval(this._uploadTimer);
                alert("上传成功");
                return;
            }

            let curUploadProgress = this.getRandom1(10, 20);
            uploadProgress += curUploadProgress;
            uploadProgress = uploadProgress > 100 ? 100 : uploadProgress;
            this.setState({
                uploadProgress: uploadProgress,
            });
        },1000);
    }
    stopTime(){
        this._uploadTimer && clearInterval(this._uploadTimer);
    }

    deleteImageHandle=(index) => {
        let addImage = require('../../commonUI/list/images/pickImage_blue.png');
        this.setState({
            isAddIcon: true,
            imageSource: addImage
        }
        )
    }

    render() {
        let boxWidth = 164*1.2;
        let boxHeight = 108*1.2;

        return (
            <ImageChooseButton
                imageWidth={boxWidth}
                imageHeight={boxHeight}
                imageSource={this.state.imageSource}
                uploadProgress={this.state.uploadProgress}

                clickButtonHandle={this.addImageHandle}
                deleteImageHandle={this.deleteImageHandle}

                isEditing={true}
                isAddIcon={this.state.isAddIcon}
            />
        )
    }
}