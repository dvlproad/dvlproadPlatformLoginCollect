// LKImagesChooseList.js
/*
LKImagesChooseList:图片列表组件(可进行选择、删除等操作)

import LKImagesChooseList from '../commonUI/list/LKImagesChooseList';

                <LKImagesChooseList
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
                    isEditing={true}
                    imageMaxCount={9}
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
import {FlatList, Text, View, ViewPropTypes} from "react-native";
import LKActionLoadingImage  from '../image/LKActionLoadingImage';
import { ImageUploadType } from '../image/LKLoadingImage';

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class LKImagesChooseList extends Component {
    static propTypes = {
        boxHorizontalInterval: PropTypes.number,      // 水平方向上box之间的间隔
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,
        widthHeightRatio: PropTypes.number,         // 宽高的比例（默认1:1，即1.0）

        imageSources: PropTypes.array,
        imageDefaultSource: PropTypes.number,
        imageBorderStyle: stylePropTypes,       //非添加按钮的图片的边框样式(添加按钮的边框默认无)

        browseImageHandle: PropTypes.func,
        addImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,

        isEditing: PropTypes.bool,
        hasAddIconWhenEditing: PropTypes.bool,      //在编辑时候是否显示添加图片的按钮
        imageMaxCount: PropTypes.number,    //最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)

        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调

        changeShowDebugMessage: PropTypes.bool,    //将提示信息改为显示调试的信息，此选项默认false
    };

    static defaultProps = {
        boxHorizontalInterval: 5,
        listWidth: 0,
        numColumns: 2,
        widthHeightRatio: 1.0,  //宽高的比例

        imageSources: [],
        //imageDefaultSource: '',
        imageBorderStyle: {
            borderRadius: 6,
            borderWidth: 0,
            borderColor: "#E5E5E5",
        },

        browseImageHandle: (buttonIndex)=>{},
        addImageHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},

        isEditing: false,
        hasAddIconWhenEditing: true,
        imageMaxCount: 10000,

        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},

        changeShowDebugMessage: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            //renderImageSources: props.imageSources, //可能在使用过程中会加入addIcon元素
            addIconCurIndex: -1,   //添加按钮的当前索引的值①等于-1代表没有添加显示；②大于imageMaxCount则不显示

            imageLoadedCount: 0//完成加载的图片个数
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.imageSources !== nextProps.imageSources){

        }
    }

    componentDidMount(): void {
        let isImageAllLoaded = this.props.imageSources.length == 0;
        if (isImageAllLoaded) {
            this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);
        }
    }

    onLoadComplete=(buttonIndex)=>{
        let isAddIcon = this.isAddIcon(buttonIndex);
        if (isAddIcon == false) {
            this.state.imageLoadedCount = this.state.imageLoadedCount+1;
            let isImageAllLoaded = this.state.imageLoadedCount >= this.props.imageSources.length ? true : false;
            this.props.imageLoadedCountChange(this.state.imageLoadedCount, isImageAllLoaded);


            let message = '';
            if (isImageAllLoaded) {
                message = "所有图片加载完成，总张数为:" + this.state.imageLoadedCount;
            } else {
                message = "图片总进度加载中，当前完成张数:" + this.state.imageLoadedCount;
            }
            console.log(message);
        }
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

    render() {
        const numColumns = this.props.numColumns;
        const boxHorizontalInterval = this.props.boxHorizontalInterval;
        const boxTotalWidth = this.props.listWidth-(numColumns-1)*boxHorizontalInterval;
        const boxWidth = boxTotalWidth/numColumns;
        const boxHeight = boxWidth / this.props.widthHeightRatio;

        let listHeaderComponent = null;
        if (this.props.changeShowDebugMessage) {
            let headerText = 'addIconCurIndex:' + this.state.addIconCurIndex;
            listHeaderComponent = ()=>{
                return (
                    <Text>{headerText}</Text>
                )
            }
        }

        let testListStyle = this.props.changeShowDebugMessage ? {backgroundColor: 'green'} : null;


        let renderImageSources = Array.from(this.props.imageSources);
        const allowAddIconShowing = this.props.isEditing &&
            this.props.hasAddIconWhenEditing;
        if (allowAddIconShowing) {
            let shouldAddAddIcon = this.props.imageSources.length < this.props.imageMaxCount;
            if (shouldAddAddIcon) {
                this.state.addIconCurIndex = this.props.imageSources.length;

                let addImage = {
                    imageSource: require('./resources/pickImage_blue.png'),
                    uploadType: ImageUploadType.NotNeed,
                    uploadProgress: 0,
                    imageIndex: renderImageSources.length,
                };
                renderImageSources.splice(renderImageSources.length, 0, addImage);

            } else {
                this.state.addIconCurIndex = -1;
            }
        } else {
            this.state.addIconCurIndex = -1;
        }



        return (
            <FlatList
                style={[this.props.style, testListStyle]}
                data={renderImageSources}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <LKActionLoadingImage
                            style={{
                                width: boxWidth,
                                height: boxHeight,
                                marginRight: boxHorizontalInterval,
                            }}
                            source={item.imageSource}
                            defaultSource={this.props.imageDefaultSource}
                            imageBorderStyle={this.getImageBorderStyle(index)}

                            buttonIndex={index}
                            clickButtonHandle={this.clickButtonHandle}
                            deleteImageHandle={this.deleteImageHandle}

                            isEditing={this.props.isEditing}
                            isAddIcon={this.isAddIcon(index)}

                            onLoadComplete={(buttonIndex)=>{
                                this.onLoadComplete(buttonIndex)
                            }}

                            uploadType={item.uploadType}
                            uploadProgress={item.uploadProgress}
                            needLoadingAnimation={item.needLoadingAnimation}

                            changeShowDebugMessage={this.props.changeShowDebugMessage}
                        />
                    )
                }}
                numColumns={numColumns}

                // ListHeaderComponent={listHeaderComponent}
            />
        )
    }
}