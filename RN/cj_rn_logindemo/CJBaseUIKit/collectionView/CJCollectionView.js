/**
 * CJCollectionView.js
 *
 * @Description: 默认的集合视图（使用 CJCollectionCell,即含图片和文字竖直居中的Cell）
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-13 10:43:11
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

/*
import { CJCollectionView } from '../../CJBaseUIKit/CJBaseUIKit';

                <CJCollectionView
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
import CJCollectionCell  from './CJCollectionCell';
import CJBaseCollectionView from './CJBaseCollectionView';

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class CJCollectionView extends CJBaseCollectionView {
    static propTypes = {
        dataModels: PropTypes.array,
        imageDefaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        imageBorderStyle: stylePropTypes,       //非添加按钮的图片的边框样式(添加按钮的边框默认无)

        clickButtonHandle: PropTypes.func,

        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调
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

        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},
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


    renderCollectionCell(item, index, defaultCollectCellStyle) {
        let richCollectCellStyle = {
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            borderWidth: 0,
        };
        let collectCellStyle = [defaultCollectCellStyle, richCollectCellStyle];

        return (
            <CJCollectionCell
                style={collectCellStyle}

                moduleModel={item}
                defaultSource={this.props.imageDefaultSource}
                imageBorderStyle={this.props.imageBorderStyle}

                buttonIndex={index}
                clickButtonHandle={this.props.clickButtonHandle}

                onLoadComplete={(buttonIndex)=>{
                    this.onLoadComplete(buttonIndex)
                }}

                needLoadingAnimation={item.needLoadingAnimation}
            />
        );
    }
}
