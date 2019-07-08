// ImagesChooseListExamplePage.js
import React, { Component } from 'react';
import {Alert, Dimensions, ScrollView} from 'react-native';
import LKImagesChooseList from '../../commonUI/list/LKImagesChooseList';
import { ImageUploadType } from "../../commonUI/image/LKLoadingImage";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import LKUDIDUtil from "../../commonUtil/LKUDIDUtil";

export default class ImagesChooseListExamplePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthCerImages:[
                {
                    imageSource: require('./resources/healthCerImage1.png'),
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                }
            ],
        };
    }


    componentDidMount(): void {
        this.fetchData();
    }


    fetchData = () => {
        let healthCerImages = this.state.healthCerImages;
        for (let i =0; i<healthCerImages.length; i++ ) {
            let healthCerImage = healthCerImages[i];

            healthCerImage.uploadType = ImageUploadType.NotNeed;
            healthCerImage.uploadProgress = 0;
            healthCerImage.imageIndex = i;

            healthCerImages.splice(i, 1, healthCerImage);
        }

        // Alert.alert('2.当前图片个数' + healthCerImages.length);
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }


    addImageHandle=(index, imageSource) => {
        let healthCerImage = {
            imageSource: imageSource,
            uploadType: ImageUploadType.Uploading,
            uploadProgress: LKUDIDUtil.getRandomNumber(10, 100),
            imageIndex: index,
        };

        let healthCerImages = Array.from(this.state.healthCerImages);
        healthCerImages.splice(index, 0, healthCerImage);

        this.updateImagesIndex(healthCerImages);
    }


    deleteImageHandle=(index) => {
        let healthCerImages = this.state.healthCerImages;
        // LKToastUtil.showMessage(index + '：' + healthCerImages[index].imageIndex);
        healthCerImages[index].imageIndex = -1;
        healthCerImages.splice(index,1);

        this.updateImagesIndex(healthCerImages);
    }


    updateImagesIndex=(healthCerImages)=>{
        for(let i = 0; i < healthCerImages.length; i++) {
            let healthCerImage = healthCerImages[i];
            healthCerImage.imageIndex = i;
            healthCerImages.splice(i, 1, healthCerImage);
        }
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }


    render() {
        const paddingHorizontal = 15;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5"}}>
                <LKImagesChooseList
                    style={{paddingHorizontal: paddingHorizontal}}
                    listWidth={Dimensions.get('window').width-2*paddingHorizontal}
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

                <LKImagesChooseList
                    style={{paddingHorizontal: paddingHorizontal}}
                    listWidth={Dimensions.get('window').width-2*paddingHorizontal}
                    numColumns={3}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={10}
                    imageSources={this.state.healthCerImages}
                    browseImageHandle={(index)=>{
                        Alert.alert("点击浏览图片" + index);
                    }}
                    addImageHandle={(index)=>{
                        //Alert.alert("点击添加图片" + index);
                        const imageSource = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};
                        this.addImageHandle(index, imageSource);
                    }}
                    deleteImageHandle={this.deleteImageHandle}
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
            </ScrollView>
        );
    }
}
