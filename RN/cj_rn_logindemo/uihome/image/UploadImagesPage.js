//HealthCerHomePage.js
import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Dimensions } from 'react-native';
import { SubmitButton } from '../../commonUI/button/cjdemobuttonfactory';
import CJDemoPickerImageFlatList from '../../commonUI/pickImage/cjdemoPickerImageCell';
import ImagesChooseList from '../../commonUI/list/ImagesChooseList';
import { ImageUploadType } from "../../commonUI/image/LoadingImage";
import ImagePicker from 'react-native-image-picker';

var currentUploadMessage = '';
var timerMessage = '';
var imageAddDeleteMessage = '';

export default class UploadImagesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            loaded: false,
            isUpdatingInfo: false,
            submitEditButtonEnable: true,

            healthCerImages:[
                {
                    imageSource: require('./resource/healthCerImage1.png'),
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                },
            ],

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
            timerSecondsCount: 0,   // 模拟上传的定时器执行了多少次
        };
    }

    componentWillUnmount() {
        this.stopSimulateUpload();
    }

    componentDidMount() {
        //this.startSimulateUpload();
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

        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    clickEditTitleHandle= () => {
        if (!this.state.isImageAllLoaded) {
            Alert.alert('请等待所有图片加载完成\ncurrentImageCount=' + this.state.healthCerImages.length);
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


    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }

    chooseImageSource=(index)=>{
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const imageSource = { uri: response.uri };
                //Alert.alert(response.uri);
                //const imageSource = {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.addImageHandle(index, imageSource);
            }
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


        this.uploadImage(healthCerImage, index); //测试图片上传
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


    /**
     * 模拟图片上传
     */
    uploadImage=(healthCerImage, index)=>{
        setInterval(()=>{
            let timerSecondsCount = this.state.timerSecondsCount + 1;
            this.setState({
                timerSecondsCount: timerSecondsCount,
            })

            timerMessage = '定时器执行次数:' + timerSecondsCount;


            imageAddDeleteMessage = '图片增删操作信息如下：';
            imageAddDeleteMessage += '\n' + '当前上传图片原本位置为imageIndex:' + index;
            let currentImageIndex1 = this.state.healthCerImages.indexOf(healthCerImage);
            imageAddDeleteMessage += '\n' + '检测方法①:当前上传图片现在位置为imageIndex:' + currentImageIndex1;
            if (currentImageIndex1 == -1) {
                imageAddDeleteMessage += '\n' + '在数组中检查发现已不存在该元素，所以推理出该元素现在是已被删除了的状态';
            }
            let currentImageIndex2 = healthCerImage.imageIndex;
            imageAddDeleteMessage += '\n' + '检测方法②:当前上传图片现在位置为imageIndex:' + currentImageIndex2;
            if (currentImageIndex2 == -1) {
                imageAddDeleteMessage += '\n' + '删除的时候，我们其属性imageIndex设为-1,表示该元素现在是已被删除了的状态';
            }

            let currentImageIndex = currentImageIndex1;
            if (currentImageIndex == -1) {
                return;
            }

            let indexUploadMessage = '上传信息如下:';
            indexUploadMessage += '\n正在上传的imageIndex:' + currentImageIndex;
            indexUploadMessage += '\n已执行了' + timerSecondsCount + '秒';
            indexUploadMessage += '\n当前上传进度:'
            if (healthCerImage.uploadType == ImageUploadType.NotNeed) {
                indexUploadMessage += 'NotNeed';
                return;
            }
            if (healthCerImage.uploadProgress >= 100) {
                indexUploadMessage += '已上传成功';
                return;
            }

            let curUploadProgress = this.getRandom1(10, 20);
            if (this.state.debug) {
                curUploadProgress = 1;
            }
            healthCerImage.uploadProgress += curUploadProgress;
            if (healthCerImage.uploadProgress >= 100) {
                healthCerImage.uploadType = ImageUploadType.Success;
                healthCerImage.uploadProgress = 100;
                //alert("上传成功");
                indexUploadMessage += '上传成功';
            }  else {
                healthCerImage.uploadType = ImageUploadType.Uploading;
                indexUploadMessage += healthCerImage.uploadProgress + '%';
            }

            let healthCerImages = this.state.healthCerImages;
            healthCerImages.splice(currentImageIndex, 1, healthCerImage);

            currentUploadMessage = '当前图片个数' + this.state.healthCerImages.length;
            currentUploadMessage += '\n' + indexUploadMessage;

            this.setState({
                healthCerImages: healthCerImages,
            });

        }, 1000);
    }

    getRandom1 = (start, end) => {
        let length = end - start;
        let num = parseInt(Math.random() * (length) + start);
        return num;
    }

    stopSimulateUpload = () => {
        //Alert.alert('stopSimulateUpload');
        this._uploadTimer && clearInterval(this._uploadTimer);
    }

    startSimulateUpload = () => {
        let healthCerImages = this.state.healthCerImages;

        this._uploadTimer=setInterval(()=>{
            currentUploadMessage = '';

            currentUploadMessage += '当前图片个数' + healthCerImages.length;

            for(let i = 0; i < healthCerImages.length; i++) {
                let healthCerImage = healthCerImages[i];

                currentUploadMessage += '\nindex:' + i + '上传信息:';

                if (healthCerImage.uploadType == ImageUploadType.NotNeed) {
                    currentUploadMessage += ' NotNeed';
                    continue;
                }
                if (healthCerImage.uploadProgress >= 100) {
                    currentUploadMessage += ' 已上传成功';
                    continue;
                }

                let curUploadProgress = this.getRandom1(10, 20);
                healthCerImage.uploadProgress += curUploadProgress;
                if (healthCerImage.uploadProgress >= 100) {
                    healthCerImage.uploadType = ImageUploadType.Success;
                    healthCerImage.uploadProgress = 100;
                    //alert("上传成功");
                    currentUploadMessage += '上传成功';
                }  else {
                    healthCerImage.uploadType = ImageUploadType.Uploading;
                    currentUploadMessage += healthCerImage.uploadProgress;
                }

                healthCerImages.splice(i, 1, healthCerImage);
            }

            this.setState({
                healthCerImages: healthCerImages,
            });

        },1000);
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

                <CJDemoPickerImageFlatList
                    style={{paddingTop: 12, backgroundColor: 'cyan'}}
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={30}
                />

                <View style={{marginTop: 30, backgroundColor:'rgba(0,255,0,0.8)'}}>
                    <Text style={{fontSize:15, color: "#333333"}}>图片操作的调试信息</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.8)', color:'#993300'}}>{timerMessage}</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.8)', color:'#993300'}}>{imageAddDeleteMessage}</Text>
                    <Text style={{marginTop:10, backgroundColor:'rgba(0,255,0,0.9)', color:'#339900'}}>{currentUploadMessage}</Text>
                </View>

                <ImagesChooseList
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={30}
                    imageSources={imageSources}
                    browseImageHandle={this.browseImageHandle}
                    addImageHandle={this.chooseImageSource}
                    deleteImageHandle={this.deleteImageHandle}
                    isEditing={this.state.isUpdatingInfo}
                    imageMaxCount={2}
                    imageLoadedCountChange={this.imageLoadedCountChange}
                    changeShowDebugMessage={this.state.debug}
                />

                <SubmitButton
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
