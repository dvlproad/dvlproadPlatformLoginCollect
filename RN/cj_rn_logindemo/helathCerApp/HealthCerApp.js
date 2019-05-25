import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, StyleSheet, Alert, FlatList} from 'react-native';
import PropTypes from 'prop-types'
import CJDemoDateBeginEnd from './cjdemoDateBeginEnd'
import { SubmitButton } from './cjdemobuttonfactory'

var healthCardDetail = {
    "status": 1,
    "message": "成功",
    "result": {
        "healthCardStateCode": 2,
        "healthCardStateMessage": "健康证审核未通过",
        "healthCardApprovalCode": 1,
        "healthCardApprovalMessage": "健康证已提交，待审核中",
        "healthCard1Url": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg",
        "healthCard2Url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554202630803&di=84fad580a2f1e780fc28b447b4906520&imgtype=0&src=http%3A%2F%2Fmedia.putibaby.com%2Fmedia%2Fimage-8bfbfc5c9c91179b45b8c6c5163b8f06.jpg",
        "healthCardStartTime": "2019-03-03",
        "healthCardEndTime": "2020-03-03",
        "approvalTips": "未通过原因：证件模糊，不够清晰！\n请重新上传！"
    }
}

var healthCardDetail_notupload = {
    "status": 1,
    "message": "成功",
    "result": {
        "healthCardStateCode": 2,
        "healthCardStateMessage": "健康证未提交",
        "healthCardApprovalCode": 0,
        "healthCardApprovalMessage": "未提交",
        "healthCard1Url": "",
        "healthCard2Url": "",
        "healthCardStartTime": "",
        "healthCardEndTime": "",
        "approvalTips": "未通过原因：证件模糊，不够清晰！\n请重新上传！"
    }
}


export default class HealthCerApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:"2016-05-15",
            isShowingText: true
        };

        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState(previousState => {
                return { isShowingText: !previousState.isShowingText };
            });
        }, 1000);
    }

    renderSeparator(){
        return <LineSeparator />;
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:"#62ffaa", paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{fontSize:15, color: "#333333"}}>上传健康证</Text>
                    <Text style={{fontSize:12, color: "#FF4500"}}>（至少要1张健康证照片）</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between", paddingTop: 12}}>
                    <Image style={{ width: 164, height: 108}} source={{uri: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"}} />
                    <Image style={{ width: 164, height: 108}} source={require('./resources/imageLook.png')} />
                </View>

                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Text style={{fontSize:15, color: "#333333"}}>健康证有效期</Text>
                </View>

                <View style={{marginTop: 22}}>
                    <CJDemoDateBeginEnd/>
                </View>


                <View style={{marginTop: 40}}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={[
                            {isShowEditTitle: true, isDisabled: false},
                            {isShowEditTitle: true, isDisabled: true},
                            {isShowEditTitle: false, isDisabled: false},
                            {isShowEditTitle: false, isDisabled: true},
                        ]}
                        renderItem={({item}) => <HealthSubmitButton isShowEditTitle={item.isShowEditTitle} isDisabled={item.isDisabled} /> }
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>

            </ScrollView>
        );
    }
}


class LineSeparator extends Component{
    render(){
        const { style } = this.props
        return (
            <View style={{backgroundColor: "#E5E5E5", height: 10}} />
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
        return <SubmitButton isShowEditTitle={this.props.isShowEditTitle} isDisabled={this.props.isDisabled}
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
});

