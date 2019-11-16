/**
 * CJImageLookCollectionView.jsw.js
 *
 * @Description: 图片列表【不仅显示，且可增删】的集合视图（使用 CJActionLoadingImage）
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-13 10:43:11
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

/*
import { CJImageLookCollectionView } from '../../CJBaseUIKit/CJBaseUIKit';

                <CJImageLookCollectionView
                    // style={{paddingHorizontal: 40}}   //谨记：这边设置无效
                    listWidth={Dimensions.get('window').width}
                    sectionInset={{top:15, left:15, bottom:15, right:15}}
                    cellWidthFromPerRowMaxShowCount={2} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                    // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                    widthHeightRatio={164/108}
                    minimumInteritemSpacing={10}
                    minimumLineSpacing={10}
                    dataModels={this.state.moduleModels}
                    clickButtonHandle={(index)=>{
                        LKToastUtil.showMessage("点击浏览图片" + index);
                    }}
                    imageLoadedCountChange={(imageLoadedCount, isImageAllLoaded)=>{
                        let message = '';
                        if (isImageAllLoaded) {
                            message = "所有图片加载完成，总张数为:" + imageLoadedCount;
                        } else {
                            message = "图片总进度加载中，当前完成张数:" + imageLoadedCount;
                        }
                        console.log(message);
                    }}
            />
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, ViewPropTypes} from "react-native";
import CJActionLoadingImage  from '../image/CJActionLoadingImage';
import {CJImageUploadType} from "../image/CJLoadingImage";
import CJBaseCollectionView from './CJBaseCollectionView';

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class CJImageActionCollectionView extends CJBaseCollectionView {
    static propTypes = {
        dataModels: PropTypes.array,
        imageDefaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        imageBorderStyle: stylePropTypes,       // 非添加按钮的图片的边框样式(添加按钮的边框默认无)

        clickButtonHandle: PropTypes.func,
        deleteButtonWidth: PropTypes.number,    // 删除按钮的大小
        imageTopRightForDeleteButtonCenterOffset: PropTypes.number, // 图片右上角坐标与删除按钮中心坐标的偏移(平时默认两个点是重合的，即此值为0；若此需要图片右上角坐标往删除按钮中心的右上角靠，此时图片区域会变大，请填正数；反之，填负数)

        imageLoadedCountChange: PropTypes.func, // 完成加载的图片个数发生变化的回调


        browseImageHandle: PropTypes.func,
        addImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,

        isEditing: PropTypes.bool,
        hasAddIconWhenEditing: PropTypes.bool,  // 在编辑时候是否显示添加图片的按钮
        imageMaxCount: PropTypes.number,        // 最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)
        addImageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),       // 添加图片的数据源
    };

    static defaultProps = {
        dataModels: [],
        listWidth: 0,
        sectionInset: { top: 0, left: 0, bottom: 0, right: 0 },
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,

        cellWidthFromPerRowMaxShowCount: 4,
        widthHeightRatio: 1.0,  //宽高的比例

        //imageDefaultSource: '',
        imageBorderStyle: {
            borderRadius: 6,
            borderWidth: 0,
            borderColor: "#E5E5E5",
        },

        clickButtonHandle: (buttonIndex)=>{},
        deleteButtonWidth: 24,
        imageTopRightForDeleteButtonCenterOffset: 2,

        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},


        browseImageHandle: (buttonIndex)=>{},
        addImageHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},

        isEditing: false,
        hasAddIconWhenEditing: true,
        imageMaxCount: 10000,
        addImageSource: require('./resources/addImage_common.png'),
    };

    constructor(props) {
        super(props);
        this.state = {
            imageLoadedCount: 0//完成加载的图片个数
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.dataModels !== nextProps.dataModels){

        }
    }

    componentDidMount(): void {
        let isImageAllLoaded = this.props.dataModels.length == 0;
        if (isImageAllLoaded) {
            this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);
        }
    }

    onLoadComplete=(buttonIndex)=>{
        this.state.imageLoadedCount = this.state.imageLoadedCount+1;
        let isImageAllLoaded = this.state.imageLoadedCount >= this.props.dataModels.length ? true : false;
        this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);

        let message = '';
        if (isImageAllLoaded) {
            message = "所有图片加载完成，总张数为:" + this.state.imageLoadedCount;
        } else {
            message = "图片总进度加载中，当前完成张数:" + this.state.imageLoadedCount;
        }
        console.log(message);
    }

    // clickButtonHandle = (index)=> {
    //     this.props.clickButtonHandle(index);
    // }

    isAddIcon = (index)=> {
        if (index == this.state.addIconCurIndex) {
            return true;
        } else {
            return false;
        }
    }

    clickButtonHandle = (index)=> {
        if (index == this.state.addIconCurIndex) {
            this.props.addImageHandle(index);
        } else {
            this.props.browseImageHandle(index);
        }
    }

    deleteImageHandle=(index) => {
        this.props.deleteImageHandle(index);
    }

    // 获取指定位置的图片的边框(添加按钮的边框默认无)
    getImageBorderStyle=(index)=>{
        let imageBorderStyle = this.props.imageBorderStyle;
        if (this.isAddIcon(index)) {
            imageBorderStyle = {
                borderRadius: 6,
                borderWidth: 0,
                borderColor: "#E5E5E5",
            }
        }
        return imageBorderStyle;
    }

    getRenderDataModels(dataModels): * {
        // return super.getRenderDataModels(dataModels);

        let renderImageCount = dataModels.length;
        let renderImageSources = Array.from(dataModels);
        const allowAddIconShowing = this.props.isEditing &&
            this.props.hasAddIconWhenEditing;
        if (allowAddIconShowing) {
            let shouldAddAddIcon = renderImageCount < this.props.imageMaxCount;
            if (shouldAddAddIcon) {
                this.state.addIconCurIndex = renderImageCount;

                let addImage = {
                    imageSource: this.props.addImageSource,
                    uploadType: CJImageUploadType.NotNeed,
                    uploadProgress: 0,
                    imageIndex: renderImageCount,
                };
                renderImageSources.splice(renderImageCount, 0, addImage);

            } else {
                this.state.addIconCurIndex = -1;
            }
        } else {
            this.state.addIconCurIndex = -1;
        }
        return renderImageSources;
    }

    renderCollectionCell(item, index, defaultCollectCellStyle) {
        let richCollectCellStyle = {
            backgroundColor: 'transparent',
            borderRadius: 4,
            borderWidth: 0,
        };
        // let collectCellStyle = [defaultCollectCellStyle, richCollectCellStyle];  // TODO: 请确认并修正使用此方式时候，CJLoadingImage的布局
        Object.assign(defaultCollectCellStyle, richCollectCellStyle);
        let collectCellStyle = defaultCollectCellStyle;

        return (
            <CJActionLoadingImage
                style={collectCellStyle}

                source={item.imageSource}
                defaultSource={this.props.imageDefaultSource}
                imageBorderStyle={this.getImageBorderStyle(index)}

                buttonIndex={index}
                // onLoadComplete={this.props.onLoadComplete}
                onLoadComplete={(buttonIndex)=>{
                    this.onLoadComplete(buttonIndex)
                }}

                clickButtonHandle={this.clickButtonHandle}

                uploadType={item.uploadType}
                uploadProgress={item.uploadProgress}
                needLoadingAnimation={item.needLoadingAnimation}
                changeShowDebugMessage={this.props.changeShowDebugMessage}

                isEditing={this.props.isEditing}
                isAddIcon={this.isAddIcon(index)}
                deleteImageHandle={this.deleteImageHandle}
                deleteButtonWidth={this.props.deleteButtonWidth}
                imageTopRightForDeleteButtonCenterOffset={this.props.imageTopRightForDeleteButtonCenterOffset}
            />


        );
    }
}
