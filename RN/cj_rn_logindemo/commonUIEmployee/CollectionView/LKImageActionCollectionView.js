/**
 * LKImageActionCollectionView.js
 *
 * @Description: 图片上传列表
 *
 * @author      chaoqian.li
 * @email       chaoqian.li@luckincoffee.com
 * @date        2019-11-14 15:07:19
 *
 * Copyright (c) luckinteam. All rights reserved.
 */
/*  使用示例：
                <LKImageActionCollectionView
                    imageModels={[
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.NotNeed,
                            uploadProgress: 0,
                            imageIndex: 0,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Uploading,
                            uploadProgress: 20,
                            imageIndex: 1,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Uploading,
                            uploadProgress: 60,
                            imageIndex: 2,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Success,
                            uploadProgress: 100,
                            imageIndex: 3,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Failure,
                            uploadProgress: 77,
                            imageIndex: 4,
                        },
                    ]}
                    imageMaxCount={5}

                    imageLoadedCountChange={(imageLoadedCount, isImageAllLoaded)=>{
                        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
                        this.state.isImageAllLoaded = isImageAllLoaded;
                    }}

                    isEditing={this.state.isEditing}
                    browseImageHandle={(index) => {
                        Alert.alert("浏览图片" + index);
                    }}
                    addImageHandle={(index) => {
                        Alert.alert("添加图片" + index);
                    }}
                    deleteImageCompleteBlock={(imageModels)=>{
                        this.setState({
                            imageModels: imageModels
                        })
                    }}
                />
 */
import React, {Component} from 'react';
import {  Alert, Dimensions } from 'react-native';
import {
    CJImageActionCollectionView
} from '../../CJBaseUIKit/CJBaseUIKit';
import PropTypes from "prop-types";


export default class LKImageActionCollectionView extends Component {
    static propTypes = {
        imageModels: PropTypes.array,
        imageMaxCount: PropTypes.number,        //最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)
        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调

        isEditing: PropTypes.bool,

        browseImageHandle: PropTypes.func,
        addImageCompleteBlock: PropTypes.func,
        deleteImageCompleteBlock: PropTypes.func,
    };

    static defaultProps = {
        imageModels: [],
        imageMaxCount: 8,
        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},

        isEditing: false,

        browseImageHandle: (buttonIndex)=>{},
        addImageCompleteBlock: (imageModels)=>{},
        deleteImageCompleteBlock: (imageModels)=>{},
    };


    constructor(props) {
        super(props);
        this.state = {

        };
    }


    /*
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

        let imageModels = this.props.imageModels;
        imageModels.splice(index-1, 0, imageModel);

        if (this.props.addImageCompleteBlock) {
            this.props.addImageCompleteBlock(imageModels);
        } else {
            // TODO: 为什么props的imageModels值改变后，这边调用this.setState会触发视图的更新，并请问这个更新我能放在这个类里处理吗，还是要抛出去
            // this.setState({
            //
            // })
        }
    }
    */

    deleteImageHandle=(index) => {
        // Alert.alert("删除图片" + index);
        let imageModels = this.props.imageModels;
        imageModels.splice(index,1);

        if (this.props.deleteImageCompleteBlock) {
            this.props.deleteImageCompleteBlock(imageModels);
        } else {
            // TODO: 为什么props的imageModels值改变后，这边调用this.setState会触发视图的更新，并请问这个更新我能放在这个类里处理吗，还是要抛出去
            // this.setState({
            //
            // })
        }
    }


    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJImageActionCollectionView
                style={[{backgroundColor:'#FFFFFF'}, this.props.style]}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:5, left:15, bottom:15, right:15}}
                // cellWidthFromPerRowMaxShowCount={4} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                cellWidthFromFixedWidth={80}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={70/70}
                minimumInteritemSpacing={0}
                minimumLineSpacing={0}
                forceBoxHorizontalIntervalEqualMinimumInteritemSpacing={true}
                dataModels={this.props.imageModels}
                imageMaxCount={this.props.imageMaxCount}

                imageLoadedCountChange={this.props.imageLoadedCountChange}
                addImageSource={require('./resources/addImage_common.png')}

                isEditing={this.props.isEditing}
                browseImageHandle={this.props.browseImageHandle}
                addImageHandle={this.props.addImageHandle}
                deleteImageHandle={this.deleteImageHandle}
                deleteButtonWidth={24}
                imageTopRightForDeleteButtonCenterOffset={2}
            />
        );
    }
}
