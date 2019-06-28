// ImageRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Button, Alert } from "react-native";

//UIHome
import UIHomePage from "./UIHomePage"


//layout
import LayoutHomePage from "./layout/LayoutHomePage"

//navigation
import NavigationHomePage from "./navigation/NavigationHomePage";
import Page1 from './navigation/page1';
import Page2 from './navigation/page2';
import Page3 from './navigation/page3';

//button
import ButtonHomePage from "./button/ButtonHomePage"

//image
import LoadingImagePage from "./image/LoadingImagePage";
import ActionImagePage from './image/ActionImagePage';
import UploadImagePage from "./image/UploadImagePage";
import UploadImagesPage from "./image/UploadImagesPage";

//text
import TextHomePage from "./text/TextHomePage"

//pickDate
import PickDatePage from './pickDate/PickDateRangePage'
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



//NavigationNavigation
const NavigationNavigation = createStackNavigator({
    NavigationHome: {
        screen: NavigationHomePage,
        navigationOptions: () => ({
            title: `NavigationHome`,
        }),
    },
    A: {
        screen: Page1,
        navigationOptions: () => ({
            title: `A(react-native)`,
        }),
    },
    B: {
        screen: Page2,
        navigationOptions: () => ({
            title: `B(@ant-design/react-native)`,
        }),
    },
    C : {
        screen: Page3,
        navigationOptions: (props) => {//在这里定义每个页面的导航属性，动态配置
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;

            return {
                title: params.title ? params.title : '右上角测试专用页',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '编辑'}
                        onPress={() =>
                            setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
                    />
                ),
            }
        },
    },
});


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
            //screen: NavigationNavigation, //会多一个导航栏
            screen: NavigationHomePage, //TODO:怎么传递导航栏
            navigationOptions: () => ({
                title: `Navigation首页`,
                header: null,
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


        LoadingImagePage: {
            screen: LoadingImagePage,
            navigationOptions: () => ({
                title: `Image加载首页`,
            }),
        },
        ActionImagePage: {
            screen: ActionImagePage,
            navigationOptions: () => ({
                title: `单个图片选择`,
            }),
        },
        UploadImagePage: {
            screen: UploadImagePage,
            navigationOptions: () => ({
                title: `Image上传首页`,
            }),
        },
        UploadImagesPage: {
            screen: UploadImagesPage,
            navigationOptions: () => ({
                title: `Image数组的上传首页`,
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




