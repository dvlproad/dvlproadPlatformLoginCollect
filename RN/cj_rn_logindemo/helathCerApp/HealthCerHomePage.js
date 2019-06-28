//HealthCerHomePage.js
import React, { Component } from 'react';
import {View, ScrollView, Text, StyleSheet, Alert, Dimensions, ActivityIndicator} from 'react-native';
import { LKEditSubmitButton } from '../commonUI/button/LKEditSubmitButton';
import LKDateBeginEnd from '../commonUI/pickDate/LKDateBeginEnd';
import LKImagesChooseList from '../commonUI/list/LKImagesChooseList';
import {ImageUploadType} from '../commonUI/image/LKLoadingImage';
import ImagePicker from 'react-native-image-picker';
import LKToastUtil from '../commonUI/toast/LKToastUtil';
import LKEmptyNetwork from "../commonUI/empty/LKEmptyNetwork";

/// 健康证状态
var HealthCardStateCode = {
    Abnormal: 0,    /**< 异常 */
    Normal: 1,      /**< 正常 */
    Advance: 2,     /**< 临期 */
    Expired: 3,     /**< 过期 */
};

/// 健康证审核状态
var HealthCardApproveCode = {
    NotUpload: 0,     /**< 未上传--获取照片时候,没有任何健康证照片 */
    PendingReview: 1, /**< 待审核--获取照片时候,得到健康证正修改的照片 */
    InForce: 2,       /**< 已生效--获取照片时候,得到健康证已通过的照片 */
    NotPass: 3,       /**< 未通过--获取照片时候,得到健康证正修改的照片 */
};

/// API网络请求状态
var APILoadStatus = {
    Pending: 0,     /**< 正准备请求数据 */
    Success: 1,     /**< 成功请求到数据 */
    Failure: 2,     /**< 失败请求不到数据 */
};

export default class HealthCerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoadStatus: APILoadStatus.Pending,

            healthCerInfoResult: new Map(),
            //考虑以后增加"取消"操作的情况，这里我们增加以下操作变量

            healthCerImages:[],
            beginDateString: '',
            isUpdatingInfo: false,
            submitEditButtonEnable: true,

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态

            photoCameraSheetShow: false,    //图片选择器是否显示
            choosePhotoForIndex: -1,        //当前图片选择器是给谁选择的
        };
    }

    componentWillUnmount() {
        this.stopSimulateUpload();
    }

    componentDidMount() {
         this.fetchData();
    }

    fetchData = () => {
        let healthCardDetailUrl = 'http://localhost/simulateApi/healthCerApiJSON/healthCardDetail_notupload';

        fetch(healthCardDetailUrl)
            .then(response => response.json())
            .then(responseData => {
                //statusCode
                let apiStatusCode = responseData.code;
                if (apiStatusCode != 1) {
                    let message = responseData.msg;
                    LKToastUtil.showMessage(message);

                    this.setState({
                        apiLoadStatus: APILoadStatus.Success,

                        healthCerInfoResult: null,
                        healthCerImages:[],
                        beginDateString: null,
                        isUpdatingInfo: false,
                    });
                    return;
                }

                //healthCerInfoResult
                let healthCerInfoResult = responseData.content;

                //healthCerImages
                let healthCerImages = new Array();
                if (healthCerInfoResult.healthCard1Url.length > 0) {
                    let healthCerImage = new Map();
                    healthCerImage.imageSource = {uri: healthCerInfoResult.healthCard1Url};
                    healthCerImages.push(healthCerImage);
                }

                if (healthCerInfoResult.healthCard2Url.length > 0) {
                    let healthCerImage = new Map();
                    healthCerImage.imageSource = {uri: healthCerInfoResult.healthCard2Url};
                    healthCerImages.push(healthCerImage);
                }


                for (let i =0; i<healthCerImages.length; i++ ) {
                    let healthCerImage = healthCerImages[i];

                    healthCerImage.uploadType = ImageUploadType.NotNeed;
                    healthCerImage.uploadProgress = 0;
                    healthCerImage.imageIndex = i;

                    healthCerImages.splice(i, 1, healthCerImage);
                }
                healthCerInfoResult.healthCerImages = healthCerImages;

                //beginDateString
                let beginDateString = healthCerInfoResult.healthCardStartTime;

                //isUpdatingInfo
                let isUpdatingInfo = healthCerInfoResult.healthCardApprovalCode == HealthCardApproveCode.NotUpload ? true: false;

                this.setState({
                    apiLoadStatus: APILoadStatus.Success,
                    healthCerInfoResult: healthCerInfoResult,
                    healthCerImages: healthCerImages,
                    beginDateString: beginDateString,
                    isUpdatingInfo: isUpdatingInfo,
                });
            }).catch(
                (error) => {
                    let message = "错误：" + error;
                    LKToastUtil.showMessage(message);

                    this.setState({
                        apiLoadStatus: APILoadStatus.Failure,

                        healthCerInfoResult: null,
                        healthCerImages:[],
                        beginDateString: null,
                        isUpdatingInfo: false,
                    });
            }
        );
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


    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }

    chooseImageSource=(index)=>{
        this.setState({
            photoCameraSheetShow: true,
            choosePhotoForIndex: index,
        })

        const options = {
            title: '选择图片', //如果要不显示title，应该设为null，而非注释掉此行
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍摄',
            chooseFromLibraryButtonTitle: '从手机相册选择',
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const imageSource = { uri: response.uri };
                // You can also display the image using data:
                // const imageSource = { uri: 'data:image/jpeg;base64,' + response.data };
                this.addImageHandle(index, imageSource);
            }
        });
    }

    addImageHandle=(index, imageSource) => {
        let healthCerImage = {
                                imageSource: imageSource,
                                uploadType: ImageUploadType.Waiting,
                                uploadProgress: 0,
                                imageIndex: index,
                            };

        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(index, 0, healthCerImage);

        this.updateImagesIndex(healthCerImages);


        this.setState({
                healthCerImages: healthCerImages
            }
        )

        // 测试图片上传
        // this.uploadImage(index, healthCerImage);
        this.startSimulateUpload();
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

    /**
     * 模拟图片上传方法1
     */
    startSimulateUpload = () => {
        if (this._uploadTimer != null) {
            return;
        }

        let healthCerImages = this.state.healthCerImages;
        this._uploadTimer=setInterval(()=>{
            for(let i = 0; i < healthCerImages.length; i++) {
                let healthCerImage = healthCerImages[i];
                if (healthCerImage.uploadType == ImageUploadType.NotNeed) {
                    continue;
                }
                if (healthCerImage.uploadProgress >= 100) {
                    continue;
                }

                let curUploadProgress = this.getRandom1(10, 20);
                healthCerImage.uploadProgress += curUploadProgress;
                if (healthCerImage.uploadProgress >= 100) {
                    healthCerImage.uploadType = ImageUploadType.Success;
                    healthCerImage.uploadProgress = 100;
                }  else {
                    healthCerImage.uploadType = ImageUploadType.Uploading;
                }

                healthCerImages.splice(i, 1, healthCerImage);
            }

            this.setState({
                healthCerImages: healthCerImages,
            });

        },1000);
    }

    stopSimulateUpload = () => {
        this._uploadTimer && clearInterval(this._uploadTimer);
    }

    /**
     * 模拟图片上传方法2
     */
    uploadImage=(index, healthCerImage)=>{
        setInterval(()=>{

            let imageIndex = healthCerImage.imageIndex;
            if (imageIndex == -1) {
                return;
            }

            if (healthCerImage.uploadType == ImageUploadType.NotNeed) {
                return;
            }
            if (healthCerImage.uploadProgress >= 100) {
                return;
            }

            let curUploadProgress = this.getRandom1(10, 20);
            healthCerImage.uploadProgress += curUploadProgress;
            if (healthCerImage.uploadProgress >= 100) {
                healthCerImage.uploadType = ImageUploadType.Success;
                healthCerImage.uploadProgress = 100;
            }  else {
                healthCerImage.uploadType = ImageUploadType.Uploading;
            }

            let healthCerImages = this.state.healthCerImages;
            healthCerImages.splice(imageIndex, 1, healthCerImage);


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



    deleteImageHandle=(index) => {
        let healthCerImages = this.state.healthCerImages;

        healthCerImages[index].imageIndex = -1;
        healthCerImages.splice(index,1);

        this.updateImagesIndex(healthCerImages);

        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        this.state.isImageAllLoaded = isImageAllLoaded;
    }

    // 刷新
    refreshHandle=()=>{
        this.fetchData();
    }

    // 网络错误时候的空白页
    healthCerBankComponents=()=>{
        return (
            <LKEmptyNetwork refreshHandle={this.refreshHandle} />
        )
    }

    // 网路正常时候的页面
    healthCerNormalComponents=()=>{
        const paddingHorizontal = 15;
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth - 2*paddingHorizontal;

        let submitButtonStyle = this.state.isUpdatingInfo?{flex:1, marginHorizontal: 20}:{width:160, alignSelf:"center"}

        let approvalTips = this.state.healthCerInfoResult ? this.state.healthCerInfoResult.approvalTips : null;
        let approveResultCell = !this.state.isUpdatingInfo?
            <HealthCerApproveResultCell style={{marginTop: 40}} approvalTips={approvalTips} />
            : null;
        let beginDateString = this.state.beginDateString;

        let imageSources = this.state.healthCerImages;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: paddingHorizontal}}>
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.apiLoadStatus == APILoadStatus.Requesting} />
                </View>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{fontSize:15, color: "#333333"}}>上传健康证</Text>
                    <Text style={{fontSize:12, color: "#FF4500"}}>（至少要1张健康证照片）</Text>
                </View>

                <LKImagesChooseList
                    style={{paddingTop: 12}}
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
                />

                <Text style={{marginTop: 40, fontSize:15, color: "#333333"}}>健康证有效期</Text>
                <LKDateBeginEnd style={{marginTop: 22}}
                                isEditing={this.state.isUpdatingInfo}
                                beginDateString={beginDateString}
                                onBeginDateChange={ (date)=> {
                                    this.setState({
                                        beginDateString: date
                                    })
                                }}
                />

                {approveResultCell}

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


    render() {
        if (this.state.apiLoadStatus == APILoadStatus.Success) {
            return this.healthCerNormalComponents();
        } else {
            return this.healthCerBankComponents();
        }
    }
}



class HealthCerApproveResultCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalTips:"第一行@第二行！",
        };
    }

    render() {
        let approvalTips = this.props.approvalTips;

        let text1 = "";
        let text2 = "";
        if (approvalTips != null && approvalTips.length > 0) {
            let tips = approvalTips.split("@");
            if (tips.length >= 2) {
                text1 = tips[0];
                text2 = tips[1];
            } else if (tips.count >= 1) {
                text1 = tips[0];
            }
        }


        const { style } = this.props;
        return (
            <View style={[{flex:1, flexDirection: "column", justifyContent: "center"}, style]}>
                <LineSeparator style={{marginHorizontal: 20}}/>
                <Text style={styles.approvalTitle}>{text1}</Text>
                <Text style={styles.approvalMessage}>{text2}</Text>
            </View>
        )
    }
}

class LineSeparator extends Component{
    render(){
        const { style } = this.props;
        return (
            <View style={[{backgroundColor: "#E5E5E5", height: 1}, style]} />
        );
    }
}





const styles = StyleSheet.create({
    loadingView: {
        position:'absolute',
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        justifyContent: 'center',
        marginTop: -50,
    },
    list: {
        flex: 1,
        justifyContent: "space-between",
        padding: 15,
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginBottom: 1
    },
    approvalTitle: {
        color: "#000000",
        fontSize: 17,
        textAlign: "center",
        height: 24,
        lineHeight: 24,
        marginTop: 39,
        marginHorizontal: 20
    },
    approvalMessage: {
        color: "#666666",
        fontSize: 13,
        textAlign: "center",
        marginTop: 10,
        marginHorizontal: 20
    },
});

