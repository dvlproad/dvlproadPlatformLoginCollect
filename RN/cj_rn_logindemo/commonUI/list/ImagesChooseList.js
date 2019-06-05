//ImagesChooseList.js
// 图片系列选择视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FlatList, Alert, Text } from "react-native";
import ImageChooseButton, {ImageUploadType} from '../button/ImageChooseButton'

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
        hasAddIconWhenEditing: PropTypes.bool,      //在编辑时候是否显示添加图片的按钮
        imageMaxCount: PropTypes.number,    //最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)

        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调
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
        imageMaxCount: 10000,

        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},
    };

    constructor(props) {
        super(props);
        this.state = {
            //renderImageSources: props.imageSources, //可能在使用过程中会加入addIcon元素
            addIconCurIndex: -1,   //添加按钮的当前索引的值①等于-1代表没有添加显示；②大于imageMaxCount则不显示

            imageLoadedCount: 0//完成加载的图片个数
        }
    }

    // shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
    //     return true;
    // }
    //
    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     lifeString = 'WillReceiveProps:' + this.props.imageSources.length + "_" + nextProps.imageSources.length;
    // }

    onLoadComplete=(buttonIndex)=>{
        this.state.imageLoadedCount++;
        let isImageAllLoaded = this.state.imageLoadedCount >= this.props.imageSources.length ? true : false;
        this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);
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
            this.props.addImageHandle(index);
        } else {
            this.props.browseImageHandle(index);
        }
    }

    render() {
        const numColumns = this.props.numColumns;
        const boxHorizontalInterval = this.props.boxHorizontalInterval;
        const boxTotalWidth = this.props.listWidth-(numColumns-1)*boxHorizontalInterval;
        const boxWidth = boxTotalWidth/numColumns;
        const boxHeight = boxWidth / this.props.widthHeightRatio;


        let renderImageSources = this.props.imageSources;

        const allowAddIconShowing = this.props.isEditing &&
            this.props.hasAddIconWhenEditing;
        if (allowAddIconShowing) {
            if (this.state.addIconCurIndex == -1) {
                let shouldAddAddIcon = this.props.imageSources.length < this.props.imageMaxCount;
                if (shouldAddAddIcon) {
                    let addImage = {
                                        imageSource: require('./images/pickImage_blue.png'),
                                        uploadType: ImageUploadType.NotNeed,
                                        uploadProgress: 0,
                                        imageIndex: renderImageSources.length,
                                    };
                    renderImageSources.splice(renderImageSources.length, 0, addImage);
                    this.state.addIconCurIndex = renderImageSources.length-1;
                }
            } else {
                this.state.addIconCurIndex = renderImageSources.length-1; //特别注意:如果addIcon已经显示，则外面会将包含addIcon的数组传进来传进来，所以需要重新获取
                let shouldDeleteAddIcon = this.props.imageSources.length > this.props.imageMaxCount;
                if (shouldDeleteAddIcon) {
                    renderImageSources.splice(this.state.addIconCurIndex, 1);
                    this.state.addIconCurIndex = -1;
                } else {
                    this.state.addIconCurIndex = renderImageSources.length-1;
                }
            }

            //Alert.alert('addIconCurIndex='+this.state.addIconCurIndex);
        }


        let headerText = 'addIconCurIndex:' + this.state.addIconCurIndex;

        return (
            <FlatList
                style={this.props.style}
                data={renderImageSources}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <ImageChooseButton
                            style={{marginRight:boxHorizontalInterval}}
                            imageWidth={boxWidth}
                            imageHeight={boxHeight}
                            imageSource={item.imageSource}

                            buttonIndex={index}
                            clickButtonHandle={this.clickButtonHandle}
                            deleteImageHandle={this.props.deleteImageHandle}

                            isEditing={this.props.isEditing}
                            isAddIcon={this.isAddIcon(index)}

                            onLoadComplete={this.onLoadComplete}

                            uploadType={item.uploadType}
                            uploadProgress={item.uploadProgress}
                        />
                    )
                }}
                ListHeaderComponent={()=>{
                    return (
                        <Text>{headerText}</Text>
                    )
                }}
                numColumns={numColumns}
            />
        )
    }
}