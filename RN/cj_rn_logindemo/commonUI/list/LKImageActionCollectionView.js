// LKImageActionCollectionView.js
import React, {Component} from 'react';
import {  Alert, Dimensions } from 'react-native';
import {
    CJActionImageCollectionView
} from '../../CJBaseUIKit/CJBaseUIKit';
import PropTypes from "prop-types";

import {View, ViewPropTypes} from "react-native";
const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;


export default class LKImageActionCollectionView extends Component {
    static propTypes = {
        imageModels: PropTypes.array,

        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调


        browseImageHandle: PropTypes.func,
        addImageCompleteBlock: PropTypes.func,
        deleteImageCompleteBlock: PropTypes.func,

        isEditing: PropTypes.bool,
        hasAddIconWhenEditing: PropTypes.bool,      //在编辑时候是否显示添加图片的按钮
        imageMaxCount: PropTypes.number,    //最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)
    };

    static defaultProps = {
        imageModels: [],

        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},

        browseImageHandle: (buttonIndex)=>{},
        addImageCompleteBlock: (imageModels)=>{},
        deleteImageCompleteBlock: (imageModels)=>{},

        isEditing: false,
        hasAddIconWhenEditing: true,
        imageMaxCount: 10000,
    };


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
            <CJActionImageCollectionView
                style={[{backgroundColor:'red'}, this.props.style]}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:5, left:15, bottom:15, right:15}}
                // cellWidthFromPerRowMaxShowCount={4} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                cellWidthFromFixedWidth={80}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={70/70}
                minimumInteritemSpacing={0}
                minimumLineSpacing={0}
                forceBoxHorizontalIntervalEqualMinimumInteritemSpacing={true}
                dataModels={this.props.imageModels}

                imageLoadedCountChange={this.imageLoadedCountChange}

                isEditing={this.props.isEditing}
                browseImageHandle={this.browseImageHandle}
                addImageHandle={this.addImageHandle}
                deleteImageHandle={this.deleteImageHandle}
                deleteButtonWidth={24}
                imageTopRightForDeleteButtonCenterOffset={2}
            />
        );
    }
}
