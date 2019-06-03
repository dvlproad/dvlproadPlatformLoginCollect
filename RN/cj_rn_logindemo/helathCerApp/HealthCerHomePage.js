//HealthCerHomePage.js
import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, StyleSheet, Alert, FlatList, Dimensions} from 'react-native';
import { SubmitButton } from '../commonUI/button/cjdemobuttonfactory';
import CJDemoDateBeginEnd from '../commonUI/pickDate/cjdemoDateBeginEnd';
import CJDemoPickerImageFlatList from '../commonUI/pickImage/cjdemoPickerImageCell';
import ImagesChooseList from '../commonUI/list/ImagesChooseList';


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


export default class HealthCerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isUpdatingInfo: false,
            submitEditButtonEnable: true,
            healthCerInfoResult: {approvalTips:"第11@第22", healthCardStartTime:"2088-08-18"},
            //TODO:如果要增加"取消"操作是不是还得增加对应的如beginDateString的变量

            healthCerImages:[
                {
                    imageSource: require('./resource/healthCerImage1.png'),
                    loaded:false
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    loaded:false
                },
            ],

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态

        };
    }

    componentDidMount() {
         this.fetchData();
    }

    fetchData = () => {
        fetch("http://localhost/simulateApi/healthCerApiJSON/healthCardDetail")
            .then(response => response.json())
            .then(responseData => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    healthCerInfoResult: responseData.content,
                    loaded: true,
                    isUpdatingInfo: responseData.content.healthCardApprovalCode == HealthCardApproveCode.NotUpload ? true: false
                });
            }).catch(
            (error) => {
                console.log("错误：" + error);
            }
        );
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

    addImageHandle=(index) => {
        let addLogSting = 'addImageIndex=' + index;
        let healthCerImage = {imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}};

        let healthCerImages = this.state.healthCerImages;
        addLogSting += '\n添加前的图片个数' + healthCerImages.length;
        healthCerImages.splice(index, 0, healthCerImage);
        addLogSting += '\n添加后的图片个数' + healthCerImages.length;
        Alert.alert(addLogSting);
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    deleteImageHandle=(index) => {
        let deleteLogSting = 'deleteImageIndex=' + index;
        let healthCerImages = this.state.healthCerImages;
        deleteLogSting += '\n删除前的图片个数' + healthCerImages.length;
        healthCerImages.splice(index,1);
        deleteLogSting += '\n删除后的图片个数' + healthCerImages.length;
        Alert.alert(deleteLogSting);
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
        let approveResultCell = !this.state.isUpdatingInfo?
            <HealthCerApproveResultCell style={{marginTop: 40}} approvalTips={this.state.healthCerInfoResult.approvalTips} />
            : null;
        let beginDateString = this.state.healthCerInfoResult.healthCardStartTime;
        //let beginDateString = this.state.beginDateString;

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
                <ImagesChooseList
                    style={{paddingTop: 12, backgroundColor: 'green'}}
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={30}
                    imageSources={imageSources}
                    browseImageHandle={this.browseImageHandle}
                    addImageHandle={this.addImageHandle}
                    deleteImageHandle={this.deleteImageHandle}
                    isEditing={this.state.isUpdatingInfo}
                    imageMaxCount={2}
                    imageLoadedCountChange={this.imageLoadedCountChange}
                />

                <Text style={{marginTop: 40, fontSize:15, color: "#333333"}}>健康证有效期</Text>
                <CJDemoDateBeginEnd style={{marginTop: 22}}
                                    isEditing={this.state.isUpdatingInfo}
                                    beginDateString={beginDateString}
                                    onBeginDateChange={ (date)=> {
                                        let healthCerInfoResult = this.state.healthCerInfoResult
                                        healthCerInfoResult.healthCardStartTime = date;
                                        this.setState({
                                            healthCerInfoResult: healthCerInfoResult
                                        })
                                    }}
                />

                {approveResultCell}

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



class HealthCerApproveResultCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalTips:"第一行@第二行！",
        };
    }

    render() {
        let approvalTips = this.props.approvalTips;
        let tips = approvalTips.split("@");

        let text1 = "";
        let text2 = "";
        if (tips.length >= 2) {
            text1 = tips[0];
            text2 = tips[1];
        } else if (tips.count >= 1) {
            text1 = tips[0];
        }

        const { style } = this.props
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

