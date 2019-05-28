//HealthCerHomePage.js
import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, StyleSheet, Alert, FlatList} from 'react-native';
import CJDemoDateBeginEnd from '../commonUI/pickDate/cjdemoDateBeginEnd'
import { SubmitButton } from '../commonUI/cjdemobuttonfactory'


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
            isUpdatingInfo: false,
            submitEditButtonEnable: true,
            healthCerInfoResult: {approvalTips:"第11@第22"},
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



    render() {
        let submitButtonStyle = this.state.isUpdatingInfo?{flex:1, marginHorizontal: 20}:{width:160, alignSelf:"center"}

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{fontSize:15, color: "#333333"}}>上传健康证</Text>
                    <Text style={{fontSize:12, color: "#FF4500"}}>（至少要1张健康证照片）</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between", paddingTop: 12}}>
                    <Image style={{ width: 164, height: 108}} source={{uri: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"}} />
                    <Image style={{ width: 164, height: 108}} source={require('../commonUI/pickImage/resources/imageLook.png')} />
                </View>

                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Text style={{fontSize:15, color: "#333333"}}>健康证有效期</Text>
                </View>

                <View style={{marginTop: 22}}>
                    <CJDemoDateBeginEnd/>
                </View>

                <HealthCerApproveResultCell style={{marginTop: 40}} approvalTips={this.state.healthCerInfoResult.approvalTips} />

                <HealthSubmitButton
                    style={[{marginTop: 40, height:44}, submitButtonStyle]}
                    isShowEditTitle={!this.state.isUpdatingInfo}
                    isDisabled={!this.state.submitEditButtonEnable}
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
        const { style } = this.props
        return (
            <View style={[{backgroundColor: "#E5E5E5", height: 1}, style]} />
        );
    }
}


class HealthSubmitButton extends SubmitButton {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...this.state
    //     };
    // }

    render() {
        const { style } = this.props

        return <SubmitButton style={[{flex:1}, style]}
                             fontSize={17}
                             isShowEditTitle={this.props.isShowEditTitle}
                             isDisabled={this.props.isDisabled}
                             clickEditTitleHandle={() => {
                                 Alert.alert("你点击了编辑按钮！");
                             }}
                             clickSubmitTitleHandle={() => {
                                 Alert.alert("你点击了提交按钮！");
                             }}
        />
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

