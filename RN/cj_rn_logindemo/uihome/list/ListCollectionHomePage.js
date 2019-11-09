// ListCollectionHomePage.js
import React, { Component } from 'react';
import {  Alert } from 'react-native';
import {
    CJUIKitBaseCollectionHomeComponent
}  from '../../commonUI/luckincommonui'


export default class ListCollectionHomePage extends Component {
    render() {
        let moduleModels = [
            {
                title: "模块1",
                imageSource: require('./img/1.jpg'),
                clickButtonHandle: (index, moduleModel)=> {
                    Alert.alert("点击浏览图片" + index + ":" + moduleModel.title);
                }
            },
            {
                title: "模块2",
                imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                clickButtonHandle: (index, moduleModel)=> {
                    this.props.navigation.navigate("FlatListHorizontalEasyPage");
                }
            },
            {
                title: "查询1",
                imageSource: require('./img/2.jpg'),
                nextPageName: "FlatListNumColumnsPage"
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

        return (
            <CJUIKitBaseCollectionHomeComponent
                moduleModels={moduleModels}
            />
        );
    }
}


//list
import FlatListNumColumnsPage from './FlatListNumColumnsPage';
import FlatListHorizontalEasyPage from './FlatListHorizontalEasyPage';


//ListPages
export const ListRoutePage = 'ListHomePage';
export const ListPages = {
    FlatListNumColumnsPage: {
        screen: FlatListNumColumnsPage,
        navigationOptions: () => ({
            title: `列表的列数使用`,
        }),
    },
    FlatListHorizontalEasyPage: {
        screen: FlatListHorizontalEasyPage,
        navigationOptions: () => ({
            title: `水平列表的简单使用`,
        }),
    },
};
