//LKHealthCerHomePage.js
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Text,
    ActivityIndicator
} from 'react-native';

import {
    LKToastUtil,
    LKProgressHUD,
    LKImagesChooseList,
    ImageUploadType,
    LKActionSheet,
    LKRNActionRangeDateText,
    LKRangeDateEditingType,
    LKEditSubmitButton,
    LKEmptyNetwork,
    LKAPILoadStatus,
} from 'cjrn-demo-base';


import {
    LKNetworkUtil,
} from '../service/luckinservice';


import {
    LKImagePickerUtil,
    LKDateUtil,
} from '../commonUtil/luckincommonutil';


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

export default class LKHealthCerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowEmpty: false,         // 是否显示空白页
            apiLoadStatus: LKAPILoadStatus.Pending,

            healthCerInfoResult: new Map(),
            //考虑以后增加"取消"操作的情况，这里我们增加以下操作变量

            healthCerImages: [],
            beginDateString: '',
            endDateString: '',
            isUpdatingInfo: false,

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态

            curUploadingImageCount: 0,  //当前正在上传的图片的个数
        };
    }

    componentDidMount() {
        this.getHealthCardInfoRequest();
    }

    // 健康证信息获取
    getHealthCardInfoRequest = () => {
        LKProgressHUD.show();
        LKNetworkUtil.GET(
            '/resource/empapi/audit/healthCardInfo',
            {},
            false
        ).then((responseJSON) => {
            LKProgressHUD.dismiss();
            this.getHealthCardInfoSuccess(responseJSON);
        }).catch((error) => {                    // error is an Object with key [code, msg]
            LKProgressHUD.dismiss();
            this.getHealthCardInfoFailure(error);
        });
    }


    // 处理服务器返回的失败信息
    getHealthCardInfoFailure = (error) => {
        let message = error.message;
        LKToastUtil.showMessage('失败' + message);

        this.setState({
            shouldShowEmpty: true,
            apiLoadStatus: LKAPILoadStatus.Failure,

            healthCerInfoResult: null,
            healthCerImages: [],
            beginDateString: null,
            endDateString: null,
        });
    }

    // 处理服务器返回的健康证信息
    getHealthCardInfoSuccess = (responseData) => {
        //statusCode
        let apiStatusCode = responseData.code;
        if (apiStatusCode != 1) {
            let message = responseData.msg;
            LKToastUtil.showMessage('业务错误' + message);

            this.setState({
                shouldShowEmpty: false,
                apiLoadStatus: LKAPILoadStatus.Success,

                healthCerInfoResult: null,
                healthCerImages: [],
                beginDateString: null,
                endDateString: null,
            });
            return;
        }

        //healthCerInfoResult
        let healthCerInfoResult = responseData.content;
        this.updateViewByHealthCardInfo(healthCerInfoResult);
    }

    // 通过健康证信息，更新健康证页面
    updateViewByHealthCardInfo = (healthCerInfoResult) => {
        //healthCerImages
        let healthCerImages = new Array();
        if (healthCerInfoResult.healthCard1Url.length > 0) {
            let healthCerImage = new Map();
            healthCerImage.imageSource = { uri: healthCerInfoResult.healthCard1Url };
            healthCerImages.push(healthCerImage);
        }

        if (healthCerInfoResult.healthCard2Url.length > 0) {
            let healthCerImage = new Map();
            healthCerImage.imageSource = { uri: healthCerInfoResult.healthCard2Url };
            healthCerImages.push(healthCerImage);
        }


        for (let i = 0; i < healthCerImages.length; i++) {
            let healthCerImage = healthCerImages[i];

            healthCerImage.uploadType = ImageUploadType.NotNeed;
            healthCerImage.uploadProgress = 0;
            healthCerImage.imageIndex = i;

            healthCerImages.splice(i, 1, healthCerImage);
        }
        healthCerInfoResult.healthCerImages = healthCerImages;

        //beginDateString
        let beginDateString = healthCerInfoResult.healthCardStartTime;
        let endDateString = healthCerInfoResult.healthCardEndTime;

        //isUpdatingInfo
        let isUpdatingInfo = healthCerInfoResult.healthCardApprovalCode == HealthCardApproveCode.NotUpload ? true : false;

        this.setState({
            apiLoadStatus: LKAPILoadStatus.Success,
            healthCerInfoResult: healthCerInfoResult,
            healthCerImages: healthCerImages,
            beginDateString: beginDateString,
            endDateString: endDateString,
            isUpdatingInfo: isUpdatingInfo,
        });
    }


    /**
     * '上传健康证信息'的请求
     */
    uploadHealthCardRequest = () => {
        let healthCardImgUrls = [];
        let healthCerImages = this.state.healthCerImages;
        for (let i = 0; i < healthCerImages.length; i++) {
            let healthCerImage = healthCerImages[i];
            let healthCardImgUrl = healthCerImage.imageSource.uri;
            healthCardImgUrls.splice(i, 0, healthCardImgUrl);
        }

        LKProgressHUD.showMessage('提交中');
        LKNetworkUtil.POST(
            '/resource/empapi/audit/uploadHealthCard',
            {
                imageList: healthCardImgUrls,
                healthCardStartTime: this.state.beginDateString,
                healthCardEndTime: this.state.endDateString,
            },
            false
        ).then((responseJSON) => {
            LKProgressHUD.dismiss();
            this.uploadHealthCardSuccess(responseJSON);
        }).catch((error) => {                    // error is an Object with key [code, msg]
            LKProgressHUD.dismiss();
            this.uploadHealthCardFailure(error);
        });
    }

    // 处理服务器返回的失败信息
    uploadHealthCardFailure = (error) => {
        let message = error.message;
        if (message.length == 0) {
            message = '上传健康证信息失败';
        }
        LKToastUtil.showMessage(message);

        this.setState({
            apiLoadStatus: LKAPILoadStatus.Failure,
        });
    }

    // 处理服务器返回的健康证信息
    uploadHealthCardSuccess = (responseData) => {
        //statusCode
        let apiStatusCode = responseData.code;
        if (apiStatusCode != 1) {
            let message = responseData.msg;
            if (message.length == 0) {
                message = '上传业务处理出现错误';
            }
            LKToastUtil.showMessage(message);

            this.setState({
                apiLoadStatus: LKAPILoadStatus.Success,

                healthCerInfoResult: null,
                healthCerImages: [],
                beginDateString: null,
                endDateString: null,
            });
            return;
        }

        //healthCerInfoResult
        let healthCerInfoResult = responseData.content;
        this.updateViewByHealthCardInfo(healthCerInfoResult);
    }


    /**
     * 点击'编辑'按钮执行的方法
     */
    clickEditTitleHandle = () => {
        if (!this.state.isImageAllLoaded) {
            let message = '请等待所有图片加载完成';
            LKToastUtil.showMessage(message);

            return;
        }
        this.setState({
            isUpdatingInfo: true
        });
    }

    /**
     * 点击'提交'按钮执行的方法
     */
    clickSubmitTitleHandle = () => {
        if (this.state.curUploadingImageCount > 0) {
            LKToastUtil.showMessage("当前还有" + this.state.curUploadingImageCount + "张图片在上传中，请等待所有图片上传完成")
        } else {
            this.uploadHealthCardRequest();
        }
    }


    browseImageHandle = (index) => {
        //Alert.alert("浏览图片" + index);
    }

    /**
     * 删除指定位置的图片
     *
     * @param index
     */
    deleteImageHandle = (index) => {
        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(index, 1);

        this.updateImagesIndexAndViews(healthCerImages);
    }

    /**
     * 点击添加图片
     * @param index                 在指定位置添加图片
     * @param imageAbsolutePath     图片的绝对路径
     * @param imageRelativePath     图片的相对路径
     */
    addImageHandle = (index, imageAbsolutePath, imageRelativePath) => {
        const imageSource = { uri: imageAbsolutePath.url };

        let healthCerImage = {
            imageSource: imageSource,
            uploadType: ImageUploadType.Waiting,
            uploadProgress: 0,
            imageIndex: index,
        };

        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(index, 0, healthCerImage);

        this.updateImagesIndexAndViews(healthCerImages);


        // 图片上传
        this.realUploadImage(index, healthCerImage, imageRelativePath);
    }


    updateImagesIndexAndViews = (healthCerImages) => {
        for (let i = 0; i < healthCerImages.length; i++) {
            let healthCerImage = healthCerImages[i];
            healthCerImage.imageIndex = i;
            healthCerImages.splice(i, 1, healthCerImage);
        }
        this.setState({
            healthCerImages: healthCerImages
        },()=>{
            console.log("恭喜：图片列表更新完毕");
        })
    }


    /**
     * 真正的图片上传方法
     */
    realUploadImage = (index, healthCerImage, imageRelativePath) => {
        this.state.curUploadingImageCount++;
        LKNetworkUtil.UploadImage(
            imageRelativePath,
            progress => {
                this.imageUploading(healthCerImage, progress);
            }
        ).then(responseJSON => {
            this.state.curUploadingImageCount--;
            let imageUrl = responseJSON['content']['url'];
            this.imageUploadSuccess(healthCerImage, imageUrl);

        }).catch(error => {
            this.state.curUploadingImageCount--;
            this.imageUploadFailure(healthCerImage, error);
        });
    }

    /**
     * 图片正在上传的执行方法
     * @param healthCerImage
     * @param progress
     */
    imageUploading = (healthCerImage, progress) => {
        let uploadProgress = progress * 100;
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

        healthCerImage.uploadProgress = uploadProgress;
        if (healthCerImage.uploadProgress >= 100) {
            healthCerImage.uploadType = ImageUploadType.Success;
            healthCerImage.uploadProgress = 100;
        } else {
            healthCerImage.uploadType = ImageUploadType.Uploading;
        }

        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(imageIndex, 1, healthCerImage);


        this.setState({
            healthCerImages: healthCerImages,
        });
    }


    /**
     * 图片上传成功执行的方法
     * @param healthCerImage
     * @param imageUrl
     */
    imageUploadSuccess = (healthCerImage, imageUrl) => {
        healthCerImage.imageSource = { uri: imageUrl };
        healthCerImage.needLoadingAnimation = false;

        let healthCerImages = this.state.healthCerImages;
        let imageIndex = healthCerImage.imageIndex;
        healthCerImages.splice(imageIndex, 1, healthCerImage);

        this.setState({
            healthCerImages: healthCerImages,
        });
    }

    /**
     * 图片上传失败执行的方法
     * @param healthCerImage    上传的是哪张图片
     * @param error             上传的失败信息
     */
    imageUploadFailure = (healthCerImage, error) => {
        LKToastUtil.showMessage('图片上传失败');
        healthCerImage.uploadType = ImageUploadType.Failure;

        let healthCerImages = this.state.healthCerImages;
        let imageIndex = healthCerImage.imageIndex;
        healthCerImages.splice(imageIndex, 1, healthCerImage);

        this.setState({
            healthCerImages: healthCerImages,
        });
    }


    imageLoadedCountChange = (imageLoadedCount, isImageAllLoaded) => {
        console.log("健康证所有图片加载完成:" + isImageAllLoaded);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }


    /**
     * 显示图片选择器
     *
     * @param index 当前的图片选择器是给什么位置的
     */
    showPhotoCameraSheet = (index) => {
        this.photoCameraSheet.showDefaultPhotoCameraSheet(
            () => {
                // '拍摄'
                LKImagePickerUtil.takePhoto((imageAbsolutePath, imageRelativePath)=>{
                    this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                });

            },
            () => {
                // '从手机相册选择'
                LKImagePickerUtil.choosePhoto((imageAbsolutePath, imageRelativePath)=>{
                    this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                });
            });
    }


    /**
     * 健康证视图
     *
     * @returns {*}
     */
    healthCerComponents = () => {
        //是否显示编辑样式
        let showEditComponents = false;
        if (this.state.isUpdatingInfo) {
            showEditComponents = true;
        } else {
            if (this.state.healthCerInfoResult && this.state.healthCerInfoResult.healthCardApprovalCode) {
                showEditComponents = this.state.healthCerInfoResult.healthCardApprovalCode == HealthCardApproveCode.NotUpload ? true : false
            } else {
                showEditComponents = true;
            }
        }

        const paddingHorizontal = 15;
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth - 2 * paddingHorizontal;

        let submitButtonStyle = showEditComponents ? { flex: 1, marginHorizontal: 0 } : { width: 160, alignSelf: "center" }

        let approvalTips = this.state.healthCerInfoResult ? this.state.healthCerInfoResult.approvalTips : null;
        let approveResultCell = !showEditComponents ?
            <HealthCerApproveResultCell style={{ marginTop: 40 }} approvalTips={approvalTips} />
            : null;
        let beginDateString = this.state.beginDateString;
        let endDateString = this.state.endDateString;

        let imageSources = this.state.healthCerImages;

        let dateRangeEditingType = showEditComponents ? LKRangeDateEditingType.Begin : LKRangeDateEditingType.None;

        let submitEditButtonEnable = true;
        if (this.state.beginDateString == null || this.state.beginDateString.length == 0 || this.state.healthCerImages.length == 0) {
            submitEditButtonEnable = false;
        }
        if (showEditComponents == false) {
            submitEditButtonEnable = true;
        }

        let beginMaxDateString = LKDateUtil.yyyyMMddString(new Date());

        // let beginMinDate = LKDateUtil.addYears(new Date(), -1);
        // let beginMinDateString = LKDateUtil.yyyyMMddString(beginMinDate);

        let endMinDateString = beginDateString;

        return (
            <ScrollView style={{ backgroundColor: "#ffffff", paddingHorizontal: paddingHorizontal }}>
                <LKActionSheet ref={ref => this.photoCameraSheet = ref} />

                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.apiLoadStatus == LKAPILoadStatus.Requesting} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Text style={{ fontSize: 15, color: "#333333" }}>上传健康证</Text>
                    <Text style={{ fontSize: 12, color: "#FF4500" }}>（至少要1张健康证照片）</Text>
                </View>

                <LKImagesChooseList
                    style={{ paddingTop: 8 }}
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164 / 108}
                    boxHorizontalInterval={12}
                    imageSources={imageSources}
                    imageDefaultSource={require('./resource/healthCerDefault.jpg')}
                    imageBorderStyle={{
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "#E5E5E5",
                    }}
                    browseImageHandle={this.browseImageHandle}
                    addImageHandle={this.showPhotoCameraSheet}
                    deleteImageHandle={this.deleteImageHandle}
                    isEditing={showEditComponents}
                    imageMaxCount={2}
                    imageLoadedCountChange={this.imageLoadedCountChange}
                />

                <Text style={{ marginTop: 40, fontSize: 15, color: "#333333" }}>健康证有效期</Text>
                <LKRNActionRangeDateText
                    style={{ marginTop: 15 }}
                    keepAlwaysWaveLine={true}
                    dateRangeEditingType={dateRangeEditingType}
                    beginDateString={beginDateString}
                    // beginMinDateString={beginMinDateString}
                    beginMaxDateString={beginMaxDateString}
                    endMinDateString={endMinDateString}
                    endDateString={endDateString}
                    onBeginDatePickChange={(beginDateString, endDateString) => {
                        this.setState({
                            beginDateString: beginDateString,
                            endDateString: endDateString,
                        })
                    }}
                />

                {approveResultCell}

                <LKEditSubmitButton
                    style={[{ flex: 1, marginTop: 40, height: 44, marginBottom: 34 }, submitButtonStyle]}
                    fontSize={15}
                    isShowEditTitle={!showEditComponents}
                    isDisabled={!submitEditButtonEnable}
                    clickEditTitleHandle={this.clickEditTitleHandle}
                    clickSubmitTitleHandle={this.clickSubmitTitleHandle}
                />

            </ScrollView>
        );
    }


    render() {
        if (!this.state.shouldShowEmpty) {
            return this.healthCerComponents();
        } else {
            return (
                <LKEmptyNetwork
                    refreshHandle={() => {
                        this.getHealthCardInfoRequest();
                    }}
                />
            )
        }
    }
}


/**
 * 健康证审核状态视图
 */
class HealthCerApproveResultCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalTips: "第一行@第二行！",
        };
    }

    render() {
        let approvalTips = this.props.approvalTips;

        let text1 = "";
        let text2 = "";
        if (approvalTips != null && approvalTips.length > 0) {
            let tips = approvalTips.split("@");
            if (tips.length >= 1) {
                text1 = tips[0];
                if (tips.length >= 2) {
                    text2 = tips[1];
                }
            } else {
                text1 = tips;
            }
        }


        const { style } = this.props;
        return (
            <View style={[{ flex: 1, flexDirection: "column", justifyContent: "center" }, style]}>
                <LineSeparator style={{ marginHorizontal: 0 }} />
                <Text style={styles.approvalTitle}>{text1}</Text>
                <Text style={styles.approvalMessage}>{text2}</Text>
            </View>
        )
    }
}

class LineSeparator extends Component {
    render() {
        const { style } = this.props;
        return (
            <View style={[{ backgroundColor: "#E5E5E5", height: 1 }, style]} />
        );
    }
}





const styles = StyleSheet.create({
    loadingView: {
        position: 'absolute',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
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
        fontSize: 16,
        textAlign: "center",
        height: 24,
        lineHeight: 24,
        marginTop: 39,
        marginHorizontal: 20
    },
    approvalMessage: {
        color: "#999999",
        fontSize: 13,
        textAlign: "center",
        marginTop: 10,
        marginHorizontal: 20
    },
});

