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
import {FlatList, Text, View, ViewPropTypes} from "react-native";
import CJCollectionCell  from './CJCollectionCell';

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class CJCollectionView extends Component {
    static propTypes = {
        listWidth: PropTypes.number.isRequired,
        sectionInset: PropTypes.object,
        minimumInteritemSpacing: PropTypes.number,  // 水平方向上box之间的最少间隔
        minimumLineSpacing: PropTypes.number,       // 竖直方向上box之间的间隔

        // 以下值必须二选一设置（默认cellWidthFromFixedWidth设置后，另外一个自动失效）
        cellWidthFromFixedWidth: PropTypes.number,          // 通过cell的固定宽度来设置每个cell的宽度
        cellWidthFromPerRowMaxShowCount: PropTypes.number,  // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度

        widthHeightRatio: PropTypes.number,         // 宽高的比例（默认1:1，即1.0）

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

        cellWidthFromPerRowMaxShowCount: 2,
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

    // 获取当前box与下一个box之间的水平间隔
    getBoxHorizontalInterval = (index, perRowMaxShowCount, boxHorizontalInterval)=> {
        let isLastColumn = (index+1)%perRowMaxShowCount==0;

        if (isLastColumn==true) {
            return 0;
        }
        return boxHorizontalInterval;
    }

    // 获取当前box与下一个box之间的竖直间隔
    getBoxVerticalInterval = (index, lastRowStartIndex, boxHorizontalInterval)=> {
        if (index >= lastRowStartIndex) {
            return 0;
        }
        return boxHorizontalInterval;
    }

    render() {

        // 以下值必须二选一设置（默认cellWidthFromFixedWidth设置后，另外一个自动失效）
        let perRowMaxShowCount = 0;     // 每行最后最多显示多少个
        let boxWidth = 0;               // box的宽
        let boxHorizontalInterval = 0;  // 水平方向上box之间的间隔
        const sectionInset = this.props.sectionInset;
        const validWidth = this.props.listWidth - sectionInset.left - sectionInset.right;
        if (this.props.cellWidthFromFixedWidth > 0) { // 按固定宽时候：宽不变，列数变，间距跟着变
            boxWidth = this.props.cellWidthFromFixedWidth;

            const minimumInteritemSpacing = this.props.minimumInteritemSpacing;
            perRowMaxShowCount = (validWidth+minimumInteritemSpacing)/(boxWidth+minimumInteritemSpacing);

            const cellsWidth = boxWidth * perRowMaxShowCount;
            const totalInteritemSpacing = validWidth - cellsWidth;
            boxHorizontalInterval = totalInteritemSpacing/(perRowMaxShowCount-1);
        } else { // 按列数时候：列数不变，间距不变，固定为minimumInteritemSpacing；宽会变
            perRowMaxShowCount = this.props.cellWidthFromPerRowMaxShowCount;

            const minimumInteritemSpacing = this.props.minimumInteritemSpacing;
            const cellsWidth = validWidth-(perRowMaxShowCount-1)*minimumInteritemSpacing;
            boxWidth = Math.ceil(cellsWidth/perRowMaxShowCount);

            boxHorizontalInterval = minimumInteritemSpacing;
        }
        const boxHeight = boxWidth / this.props.widthHeightRatio;

        // let listHeaderComponent = null;
        // if (this.props.showHeader) {
        //     let headerText = 'listHeaderText:';
        //     listHeaderComponent = ()=>{
        //         return (
        //             <Text>{headerText}</Text>
        //         )
        //     }
        // }

        let sectionInsetStyle = {};
        if (this.props.sectionInset) {
            sectionInsetStyle = {
                paddingTop: this.props.sectionInset.top,
                paddingLeft: this.props.sectionInset.left,
                paddingBottom: this.props.sectionInset.bottom,
                paddingRight: this.props.sectionInset.right,
            }
        }

        let renderModuleModels = Array.from(this.props.moduleModels);


        let rowCount = 0;
        if (renderModuleModels.length > 0) {
            rowCount = Math.floor((renderModuleModels.length-1)/perRowMaxShowCount)+1;
        }
        let lastRowStartIndex = (rowCount-1)*perRowMaxShowCount; //最后一行的索引起点，index从0开始

        return (
            <FlatList
                style={[{backgroundColor: '#F4F4F4'}, this.props.style, sectionInsetStyle]}
                data={renderModuleModels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <CJCollectionCell
                            style={{
                                flex: 1,
                                width: boxWidth,
                                height: boxHeight,
                                marginRight: this.getBoxHorizontalInterval(index, perRowMaxShowCount, boxHorizontalInterval),
                                marginBottom: this.getBoxVerticalInterval(index, lastRowStartIndex, this.props.minimumLineSpacing),
                                backgroundColor: '#FFFFFF',
                                borderRadius: 6,
                                borderWidth: 0,
                            }}

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
                    )
                }}
                numColumns={perRowMaxShowCount}

                // ListHeaderComponent={listHeaderComponent}
            />
        )
    }
}