// ImagesChooseListPage.js
import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Dimensions } from 'react-native';
import { LKEditSubmitButton } from '../../commonUI/button/LKEditSubmitButton';
import LKImagesChooseList from '../../commonUI/list/LKImagesChooseList';
import { ImageUploadType } from "../../commonUI/image/LKLoadingImage";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";

var currentUploadMessage = '';
var timerMessage = '';
var imageAddDeleteMessage = '';

export default class ImagesChooseListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            loaded: false,
            isUpdatingInfo: false,
            submitEditButtonEnable: true,

            healthCerImages:[],

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
            timerSecondsCount: 0,   // 模拟上传的定时器执行了多少次
        };
    }

    componentDidMount() {
        this.requestHealthCardInfo();
    }

    requestHealthCardInfo = () => {
        let healthCerImages = [
            {
                imageSource: require('./resources/healthCerImage1.png'),
            },
            {
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            },
        ];
        for (let i =0; i<healthCerImages.length; i++ ) {
            let healthCerImage = healthCerImages[i];

            healthCerImage.uploadType = ImageUploadType.NotNeed;
            healthCerImage.uploadProgress = 0;
            healthCerImage.imageIndex = i;

            healthCerImages.splice(i, 1, healthCerImage);
        }

        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    clickEditTitleHandle= () => {
        if (!this.state.isImageAllLoaded) {
            let message = '请等待所有图片加载完成\ncurrentImageCount=' + this.state.healthCerImages.length;
            LKToastUtil.showMessage(message);
            return;
        }
        this.setState({
            isUpdatingInfo: true
        });
    }

    clickSubmitTitleHandle= () => {
        this.setState({
            isUpdatingInfo: false
        });
    }


    addImageHandle=(index, imageSource) => {
        let addLogSting = 'addImageIndex=' + index;
        let healthCerImage = {
            imageSource: imageSource,
            uploadType: ImageUploadType.Waiting,
            uploadProgress: 0,
            imageIndex: index,
        };

        let healthCerImages = this.state.healthCerImages;
        addLogSting += '\n添加前的图片个数' + healthCerImages.length;
        healthCerImages.splice(index, 0, healthCerImage);
        addLogSting += '\n添加后的图片个数' + healthCerImages.length;
        //Alert.alert(addLogSting);

        this.updateImagesIndex(healthCerImages);


        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    updateImagesIndex=(healthCerImages)=>{
        // let message = '';
        //
        // let imageIndexsString = '当前imageIndexs:';
        // message += '未修改index前的图片个数' + healthCerImages.length;
        for(let i = 0; i < healthCerImages.length; i++) {
            let healthCerImage = healthCerImages[i];
            healthCerImage.imageIndex = i;
            healthCerImages.splice(i, 1, healthCerImage);
            // imageIndexsString += ' ' + i;
        }
        // message += '\n' + '修改index后的图片个数' + healthCerImages.length;
        // message += '\n' + imageIndexsString;
        // Alert.alert(message);
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }


    deleteImageHandle=(index) => {
        let deleteLogSting = 'deleteImageIndex=' + index;
        let healthCerImages = this.state.healthCerImages;
        healthCerImages[index].imageIndex = -1;

        deleteLogSting += '\n删除前的图片个数' + healthCerImages.length;
        healthCerImages.splice(index,1);
        deleteLogSting += '\n删除后的图片个数' + healthCerImages.length;
        //Alert.alert(deleteLogSting);

        this.updateImagesIndex(healthCerImages);

        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }



    render() {
        const paddingHorizontal = 15;
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth - 2*paddingHorizontal;

        let submitButtonStyle = this.state.isUpdatingInfo?{flex:1, marginHorizontal: 20}:{width:160, alignSelf:"center"}

        let imageSources = this.state.healthCerImages;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: paddingHorizontal}}>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{fontSize:15, color: "#333333"}}>上传健康证</Text>
                    <Text style={{fontSize:12, color: "#FF4500"}}>（至少要1张健康证照片）</Text>
                </View>

                <View style={{marginTop: 30, backgroundColor:'rgba(0,255,0,0.8)'}}>
                    <Text style={{fontSize:15, color: "#333333"}}>图片操作的调试信息</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.8)', color:'#993300'}}>{timerMessage}</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.8)', color:'#993300'}}>{imageAddDeleteMessage}</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.9)', color:'#339900'}}>{currentUploadMessage}</Text>
                </View>

                <LKImagesChooseList
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={30}
                    imageSources={imageSources}
                    browseImageHandle={(index)=>{
                        Alert.alert("点击浏览图片" + index);
                    }}
                    addImageHandle={(index)=>{
                        Alert.alert("点击添加图片" + index);
                        const imageSource = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};
                        this.addImageHandle(index, imageSource);
                    }}
                    deleteImageHandle={this.deleteImageHandle}
                    isEditing={this.state.isUpdatingInfo}
                    imageMaxCount={2}
                    imageLoadedCountChange={this.imageLoadedCountChange}
                    changeShowDebugMessage={this.state.debug}
                />

                <LKEditSubmitButton
                    style={[{flex:1, marginTop: 40, height:44, marginBottom: 34}, submitButtonStyle]}
                    fontSize={17}
                    isShowEditTitle={!this.state.isUpdatingInfo}
                    isDisabled={!this.state.submitEditButtonEnable}
                    clickEditTitleHandle={this.clickEditTitleHandle}
                    clickSubmitTitleHandle={this.clickSubmitTitleHandle}
                />

            </ScrollView>
        );
    }
}
