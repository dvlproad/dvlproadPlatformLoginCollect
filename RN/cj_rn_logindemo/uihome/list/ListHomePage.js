//ListHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export default class ListHomePage extends Component {

    constructor(props) {
        super(props);
    }

    _onPressButton = (nextPageName) => {
        console.log(nextPageName);

        if (nextPageName) {
            this.props.navigation.navigate(nextPageName)
        } else  {
            //nextPageName = "Button";
            Alert.alert(nextPageName)
        }
    }

    render() {
        let sections = [
            { key: "List",
                data: [
                    { title: "FlatListEasyPage", page: "FlatListEasyPage" },
                    { title: "FlatListNumColumnsPage", page: "FlatListNumColumnsPage" },
                    { title: "FlatListHorizontalEasyPage", page: "FlatListHorizontalEasyPage" },
                    { title: "GoodsChoosePage", page: "GoodsChoosePage" },
                    { title: "ImagesChoosePage", page: "ImagesChoosePage" },
                    { title: "ListExamplePage", page: "ListExamplePage" },
                ]
            }
        ];

        return (
            <View style={{ flex: 1 }}>
                <HomeSectionList
                    sections={sections}
                    onPress={this._onPressButton}
                />
            </View>
        );
    }
}


//list
import FlatListEasyPage from './FlatListEasyPage';
import FlatListNumColumnsPage from './FlatListNumColumnsPage';
import FlatListHorizontalEasyPage from './FlatListHorizontalEasyPage';
import GoodsChoosePage from './GoodsChoosePage';
import ListExamplePage from './ListExamplePage';
import ImagesChoosePage from './ImagesChoosePage';
import SectionListEasyPage from './SectionListEasyPage';


//ListPages
export const ListRoutePage = 'ListHomePage';
export const ListPages = {
    ListHomePage: {
        screen: ListHomePage,
        navigationOptions: () => ({
            title: `ListHomePage`,
        }),
    },

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
};