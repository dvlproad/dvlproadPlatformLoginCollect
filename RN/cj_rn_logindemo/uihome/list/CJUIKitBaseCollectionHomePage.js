// CJUIKitBaseCollectionHomePage.js
import React, { Component } from 'react';
import {  Alert, Dimensions } from 'react-native';
import CJUIKitBaseCollectionHomeComponent from './CJUIKitBaseCollectionHomeComponent';


export default class CJUIKitBaseCollectionHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleModels: [],
        };
    }

    componentDidMount() {
        let moduleModels = [
            {
                title: "模块1",
                imageSource: require('./img/1.jpg'),
                clickButtonHandle: (index, moduleModel)=> {
                    Alert.alert("点击浏览图片" + index + ":" + moduleModel.title);
                }
            },
            {
                title: "查询1",
                imageSource: require('./img/2.jpg'),
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


    render() {
        return (
            <CJUIKitBaseCollectionHomeComponent
                moduleModels={this.state.moduleModels}
            />
        );
    }
}
