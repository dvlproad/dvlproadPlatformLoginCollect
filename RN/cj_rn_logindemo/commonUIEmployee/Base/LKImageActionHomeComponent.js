// LKImageLookHomeComponent.js
import React, {Component} from 'react';
import {  Alert, Dimensions } from 'react-native';
import {
    CJImageActionCollectionView
} from '../../CJBaseUIKit/CJBaseUIKit';


export default class LKImageActionHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageModels: [],
            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
        };
    }


    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }


    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }

    addImageHandle=(index) => {
        Alert.alert("添加图片" + index);
        let imageModel = {imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}};

        let imageModels = this.state.imageModels;
        imageModels.splice(index-1, 0, imageModel);
        this.setState({
            imageModels: imageModels
        })
    }

    deleteImageHandle=(index) => {
        // Alert.alert("删除图片" + index);
        let imageModels = this.state.imageModels;
        imageModels.splice(index,1);
        this.setState({
            imageModels: imageModels
        })
    }


    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJImageActionCollectionView
                // style={{paddingHorizontal: 40}}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:15, left:15, bottom:15, right:15}}
                cellWidthFromPerRowMaxShowCount={3} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={165/165}
                minimumInteritemSpacing={30}
                minimumLineSpacing={10}
                dataModels={this.state.imageModels}

                imageLoadedCountChange={this.imageLoadedCountChange}

                isEditing={this.state.isEditing}
                browseImageHandle={this.browseImageHandle}
                addImageHandle={this.addImageHandle}
                deleteImageHandle={this.deleteImageHandle}
            />
        );
    }
}
