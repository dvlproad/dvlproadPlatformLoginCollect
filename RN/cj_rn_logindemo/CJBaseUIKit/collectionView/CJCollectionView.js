// CJCollectionViewnView:图片列表组件(可进行选择、删除等操作)

/*
import CJCollectionView from '../commonUI/list/LKImagesChooseList';

                <CJCollectionView
                    style={{paddingHorizontal: 15}}
                    listWidth={Dimensions.get('window').width-2*15}
                    numColumns={3}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={10}
                    imageSources={[
                        {
                            imageSource: require('./resources/healthCerImage1.png'),
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
                    browseImageHandle={(index)=>{
                        LKToastUtil.showMessage("点击浏览图片" + index);
                    }}
                    addImageHandle={(index)=>{
                        LKToastUtil.showMessage("点击添加图片" + index);
                    }}
                    deleteImageHandle={(index)=>{
                        LKToastUtil.showMessage("点击删除图片" + index);
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

        moduleModels: PropTypes.array,
        imageDefaultSource: PropTypes.number,
        imageBorderStyle: stylePropTypes,       //非添加按钮的图片的边框样式(添加按钮的边框默认无)

        clickButtonHandle: PropTypes.func,

        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调
    };

    static defaultProps = {
        listWidth: 0,
        sectionInset: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,

        cellWidthFromPerRowMaxShowCount: 4,
        widthHeightRatio: 1.0,  //宽高的比例

        moduleModels: [],
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
        if (this.props.moduleModels !== nextProps.moduleModels){

        }
    }

    componentDidMount(): void {
        let isImageAllLoaded = this.props.moduleModels.length == 0;
        if (isImageAllLoaded) {
            this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);
        }
    }

    onLoadComplete=(buttonIndex)=>{
        this.state.imageLoadedCount = this.state.imageLoadedCount+1;
        let isImageAllLoaded = this.state.imageLoadedCount >= this.props.moduleModels.length ? true : false;
        this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);

        let message = '';
        if (isImageAllLoaded) {
            message = "所有图片加载完成，总张数为:" + this.state.imageLoadedCount;
        } else {
            message = "图片总进度加载中，当前完成张数:" + this.state.imageLoadedCount;
        }
        console.log(message);
    }

    clickButtonHandle = (index)=> {
        this.props.clickButtonHandle(index);
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
                clickButtonHandle={this.clickButtonHandle}

                onLoadComplete={(buttonIndex)=>{
                    this.onLoadComplete(buttonIndex)
                }}

                needLoadingAnimation={item.needLoadingAnimation}
            />
        );
    }
}