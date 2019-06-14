// UIRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//UIHome
import UIHomePage from "./UIHomePage"


//layout
import LayoutHomePage from "./layout/LayoutHomePage"

//navigation
import NavigationHomePage, { NavigationPages } from "./navigation/NavigationHomePage";

//button
import ButtonHomePage from "./button/ButtonHomePage"

//image
import ImageHomePage, { ImagePages } from "./image/ImageHomePage";

//text
import TextHomePage from "./text/TextHomePage"

//hud
import HUDHomePage from './loading/HUDHomePage'

//pickDate
import PickDatePage from './pickDate/PickDatePage'
//pickImage
import PickImagesPage from './pickImage/PickImagesPage'

//list
import FlatListEasyPage from './list/FlatListEasyPage'
import FlatListNumColumnsPage from './list/FlatListNumColumnsPage'
import FlatListHorizontalEasyPage from './list/FlatListHorizontalEasyPage'
import GoodsChoosePage from './list/GoodsChoosePage'
import ListExamplePage from './list/ListExamplePage'
import ImagesChoosePage from './list/ImagesChoosePage'
import SectionListEasyPage from './list/SectionListEasyPage'

//loading
import ActivityIndicatorPage from './loading/ActivityIndicatorPage'



//UIHomeNavigation
const UIHomeNavigation = createStackNavigator(
    {
        UIHome: {
            screen: UIHomePage,
            navigationOptions: () => ({
                title: `UI首页`,
            }),
        },
        LayoutHome: {
            screen: LayoutHomePage,
            navigationOptions: () => ({
                title: `Layout首页`,
            }),
        },
        NavigationHome: {
            screen: createStackNavigator(NavigationPages), //会多一个导航栏
            // screen: NavigationHomePage, //TODO:怎么传递导航栏
            navigationOptions: () => ({
                title: `Navigation首页`,
                // header: null,
            }),
        },
        ButtonHome: {
            screen: ButtonHomePage,
            navigationOptions: () => ({
                title: `Button首页`,
            }),
        },
        TextHome: {
            screen: TextHomePage,
            navigationOptions: () => ({
                title: `Text首页`,
            }),
        },

        Image: {
            screen: createStackNavigator(ImagePages), //会多一个导航栏
            navigationOptions: () => ({
                title: `Navigation首页`,
                // header: null,
            }),
        },

        HUDHomePage: {
            screen: HUDHomePage,
            navigationOptions: () => ({
                title: `HUD首页`,
            }),
        },


        PickDatePage: {
            screen: PickDatePage,
            navigationOptions: () => ({
                title: `日期选择`,
            }),
        },
        PickImagesPage: {
            screen: PickImagesPage,
            navigationOptions: () => ({
                title: `多个图片选择`,
            }),
        },



        // 以下为列表相关
        FlatListEasyPage: {
            screen: FlatListEasyPage,
            navigationOptions: () => ({
                title: `列表的简单使用`,
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
        ListExamplePage: {
            screen: ListExamplePage,
            navigationOptions: () => ({
                title: `列表的使用示例`,
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
        SectionListEasyPage: {
            screen: SectionListEasyPage,
            navigationOptions: () => ({
                title: `分区列表的简单使用`,
            }),
        },

        ActivityIndicatorPage: {
            screen: ActivityIndicatorPage,
            navigationOptions: () => ({
                title: `ActivityIndicatorPage(一个圆形的 loading 提示符号)`,
            }),
        },
    },
    {
        initialRouteName: 'UIHome'
    }
);


export default createAppContainer(UIHomeNavigation);




