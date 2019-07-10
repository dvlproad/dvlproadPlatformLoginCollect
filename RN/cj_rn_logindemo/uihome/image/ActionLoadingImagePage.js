//ActionLoadingImagePage.js
import React, { Component } from 'react';
import {Alert, ScrollView} from 'react-native';
import LKActionLoadingImage  from '../../commonUI/image/LKActionLoadingImage';
import {ImageUploadType} from "../../commonUI/image/LKLoadingImage";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";

export default class ActionLoadingImagePage extends Component {
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
        let addImage = require('../../commonUI/list/resources/pickImage_blue.png');
        this.setState({
                addIconCurIndex: 0,
                imageSource: addImage,
            }
        )
    }

    render() {
        return (
            <ScrollView
                style={{
                    flexDirection:'row',
                    backgroundColor:"white",
                    paddingHorizontal: 15
                }}
            >
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

                <LKActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'green',
                        marginTop: 20,
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

                <LKActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'blue',
                        marginTop: 20,
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


                <LKActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'red',
                        marginTop: 20,
                    }}
                    source={this.state.imageSource}

                    isEditing={true}
                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}
                />


                <LKActionLoadingImage
                    style={{
                        width: 164, height: 108,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 4,
                        borderWidth: 0,
                        borderColor: "#E5E5E5",
                    }}
                    source={require('./resources/pickImage_blue.png')}

                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}

                    isEditing={false}
                    isAddIcon={this.isAddIcon(0)}
                />

                <LKActionLoadingImage
                    style={{
                        width: 100, height: 100, borderRadius:4,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 4,
                        borderWidth: 0,
                        borderColor: "#E5E5E5",
                    }}
                    source={require('./resources/pickImage_blue.png')}

                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}

                    isEditing={false}
                    isAddIcon={this.isAddIcon(1)}
                />
            </ScrollView>
        );
    }
}