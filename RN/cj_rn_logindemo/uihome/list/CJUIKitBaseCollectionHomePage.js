// CJUIKitBaseCollectionHomePage.js
import React, { Component } from 'react';
import { View, ScrollView, Alert, Dimensions } from 'react-native';
import CJUIKitBaseCollectionHomeComponent from '../../commonUI/list/CJUIKitBaseCollectionHomeComponent';
import LKToastUtil from "../../commonUI/toast/LKToastUtil";
import PropTypes from "prop-types";


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
                imageSource: require('./img/1.jpg'),
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
            <CJUIKitBaseCollectionHomeComponent
                // style={{paddingHorizontal: paddingHorizontal}}   //进击：这边设置
                listWidth={listWidth}
                sectionInset={{top:0, left:15, bottom:0, right:15}}
                cellWidthFromPerRowMaxShowCount={2} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={165/165}
                minimumInteritemSpacing={15}
                minimumLineSpacing={10}
                moduleModels={this.state.moduleModels}
                clickButtonHandle={(index)=>{
                    Alert.alert("点击浏览图片" + index);
                }}
                deleteImageHandle={this.deleteImageHandle}
                isEditing={this.state.isUpdatingInfo}
                imageMaxCount={2}
                imageLoadedCountChange={this.imageLoadedCountChange}
                changeShowDebugMessage={this.state.debug}
            />
        );
    }
}
