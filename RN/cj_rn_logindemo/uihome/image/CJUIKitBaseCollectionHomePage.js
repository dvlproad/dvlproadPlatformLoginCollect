// CJUIKitBaseCollectionHomePage.js
import React, { Component } from 'react';
import { View, ScrollView, Alert, Dimensions } from 'react-native';
import CJUIKitBaseCollectionHomeComponent from '../../commonUI/list/CJUIKitBaseCollectionHomeComponent';
import LKToastUtil from "../../commonUI/toast/LKToastUtil";


export default class CJUIKitBaseCollectionHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true,
            loaded: false,
            isUpdatingInfo: false,

            moduleModels: [],

            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
        };
    }

    componentDidMount() {
        let moduleModels = [
            {
                title: "模块1",
                imageSource: require('./resources/healthCerImage1.png'),
            },
            {
                title: "模块1",
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            },
            {
                title: "模块1",
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            },
            {
                title: "模块1",
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            },
            {
                title: "模块1",
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            },
        ];

        this.setState({
            moduleModels: moduleModels
        })
    }



    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }



    render() {
        const paddingHorizontal = 15;
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth - 2*paddingHorizontal;

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: paddingHorizontal}}>
                <CJUIKitBaseCollectionHomeComponent
                    listWidth={listWidth}
                    numColumns={2}
                    widthHeightRatio={164/108}
                    boxHorizontalInterval={30}
                    moduleModels={this.state.moduleModels}
                    browseImageHandle={(index)=>{
                        Alert.alert("点击浏览图片" + index);
                    }}
                    addImageHandle={(index)=>{
                        Alert.alert("点击添加图片" + index);
                    }}
                    deleteImageHandle={this.deleteImageHandle}
                    isEditing={this.state.isUpdatingInfo}
                    imageMaxCount={2}
                    imageLoadedCountChange={this.imageLoadedCountChange}
                    changeShowDebugMessage={this.state.debug}
                />

            </ScrollView>
        );
    }
}
