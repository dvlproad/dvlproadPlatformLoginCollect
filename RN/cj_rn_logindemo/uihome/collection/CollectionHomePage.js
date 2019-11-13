/**
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [集合视图主页]
 */
import React, { Component } from 'react';
import {  Alert } from 'react-native';
import { LKNavigationFactory, LKEntryHomeComponent } from '../../commonUI/luckincommonui';

export default class CollectionHomePage extends LKEntryHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `集合视图`)
    };

    constructor(props) {
        super(props);

        this.state = {
            moduleModels: [
                {
                    title: "模块1",
                    imageSource: require('./img/1.jpg'),
                    clickButtonHandle: (index, moduleModel)=> {
                        Alert.alert("点击浏览图片" + index + ":" + moduleModel.title);
                    }
                },
                {
                    title: "水平列表的简单使用",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    clickButtonHandle: (index, moduleModel)=> {
                        this.props.navigation.navigate("FlatListHorizontalEasyPage");
                    }
                },
                {
                    title: "列表的列数使用",
                    imageSource: require('./img/2.jpg'),
                    nextPageName: "FlatListNumColumnsPage",
                },
                {
                    title: "一系列图片的选择",
                    imageSource: require('./img/3.jpg'),
                    nextPageName: "ImagesChoosePage",
                },
                {
                    title: "模块5",
                    imageSource: require('./img/4.jpg'),
                },

                {
                    title: "图片组合(显示)",
                    imageSource: require('./img/4.jpg'),
                    nextPageName: "ImageLookCollectionPage",
                },
                {
                    title: "图片组合(操作)",
                    imageSource: require('./img/4.jpg'),
                    nextPageName: "ImageActionCollectionPage",
                },
            ],
        }
    }
}

// collection
import FlatListNumColumnsPage from './FlatListNumColumnsPage';
import FlatListHorizontalEasyPage from './FlatListHorizontalEasyPage';
import GoodsChoosePage from './GoodsChoosePage';
import ImagesChoosePage from './ImagesChoosePage';
import ImageLookCollectionPage from './ImageLookCollectionPage';
import ImageActionCollectionPage from './ImageActionCollectionPage';


// CollectionPages
export const CollectionRoutePage = 'CollectionHomePage';
export const CollectionPages = {
    CollectionHomePage: {
        screen: CollectionHomePage,
        navigationOptions: () => ({
            title: `CollectionHomePage`,
        }),
    },

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
    GoodsChoosePage: {
        screen: GoodsChoosePage,
        navigationOptions: () => ({
            title: `一系列商品的选择`,
        }),
    },
    ImagesChoosePage: {
        screen: ImagesChoosePage,
        navigationOptions: () => ({
            title: `一系列图片的选择`,
        }),
    },
    ImageLookCollectionPage: {
        screen: ImageLookCollectionPage,
        navigationOptions: () => ({
            title: `图片显示的组合视图`,
        }),
    },
    ImageActionCollectionPage: {
        screen: ImageActionCollectionPage,
        navigationOptions: () => ({
            title: `图片操作的组合视图`,
        }),
    },
};