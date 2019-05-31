//ImagesChooseList.js
// 图片系列选择视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import ImageChooseButton from '../button/ImageChooseButton'

export default class ImagesChooseList extends Component {
    static propTypes = {
        boxHorizontalInterval: PropTypes.number,      // 水平方向上box之间的间隔
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,
        widthHeightRatio: PropTypes.number,         // 宽高的比例（默认1:1，即1.0）

        imageSources: PropTypes.array,

        browseImageHandle: PropTypes.func,
        addImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,

        isEditing: PropTypes.bool,
        hasAddIconWhenEditing: PropTypes.bool,  //在编辑时候是否显示添加图片的按钮
    };

    static defaultProps = {
        boxHorizontalInterval: 5,
        listWidth: 0,
        numColumns: 2,
        widthHeightRatio: 1.0,  //宽高的比例

        imageSources: [],

        browseImageHandle: (buttonIndex)=>{},
        addImageHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},

        isEditing: false,
        hasAddIconWhenEditing: true,
    };



    render() {
        const numColumns = this.props.numColumns;
        const boxHorizontalInterval = this.props.boxHorizontalInterval;
        const boxTotalWidth = this.props.listWidth-(numColumns-1)*boxHorizontalInterval;
        const boxWidth = boxTotalWidth/numColumns;
        const boxHeight = boxWidth / this.props.widthHeightRatio;

        const isAddIconShow = this.props.isEditing && this.props.hasAddIconWhenEditing;

        let imageSources = this.props.imageSources;
        if (isAddIconShow) {
            // if (this.previousState.isEditing != this.state.isEditing) { //TODO:怎么判断旧状态
                let imageSource = {imageSource: require('./images/pickImage_blue.png')};
                imageSources.splice(imageSources.length, 0, imageSource);
            // }
        }

        let isAddIcon = (index)=> {
            let imageCount = 0;
            if (isAddIconShow) {
                imageCount = imageSources.length;

                if (index==imageCount-1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        let clickButtonHandle = (index)=> {
            let imageCount = 0;
            if (isAddIconShow) {
                imageCount = imageSources.length;

                if (index==imageCount-1) {
                    this.props.addImageHandle(index);
                } else {
                    this.props.browseImageHandle(index);
                }
            } else {
                this.props.browseImageHandle(index);
            }
        }


        return (
            <FlatList
                style={this.props.style}
                data={imageSources}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <ImageChooseButton
                            style={{marginRight:boxHorizontalInterval}}
                            imageWidth={boxWidth}
                            imageHeight={boxHeight}
                            imageSource={item.imageSource}

                            buttonIndex={index}
                            clickButtonHandle={clickButtonHandle}
                            deleteImageHandle={this.props.deleteImageHandle}

                            isEditing={this.props.isEditing}
                            isAddIcon={isAddIcon(index)}
                        />
                    )
                }}
                numColumns={numColumns}
            />
        )
    }
}