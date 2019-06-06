//ActionImagePage.js
import React, { Component } from 'react';
import {Alert, ScrollView} from 'react-native';
import ActionLoadingImage  from '../../commonUI/image/ActionLoadingImage'
import {ImageUploadType} from "../../commonUI/image/LoadingImage";

export default class ActionImagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            addIconCurIndex: -1,   //添加按钮的当前索引的值①等于-1代表没有添加显示；②大于imageMaxCount则不显示
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
            }
        )
    }

    deleteImageHandle=(index) => {
        let addImage = require('../../commonUI/list/images/pickImage_blue.png');
        this.setState({
                addIconCurIndex: 0,
                imageSource: addImage,
            }
        )
    }

    render() {
        let buttonIndex = 0;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <ActionLoadingImage style={{width: 164, height: 108, backgroundColor:'red'}}
                                    imageWidth={164}
                                    imageHeight={108}
                                    imageSource={this.state.imageSource}
                                    buttonIndex={buttonIndex}

                                    clickButtonHandle={this.clickButtonHandle}
                                    deleteImageHandle={this.deleteImageHandle}

                                    isEditing={true}
                                    isAddIcon={this.isAddIcon(buttonIndex)}
                />
            </ScrollView>
        );
    }
}