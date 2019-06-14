//UIHomePage.js
import React, { Component } from 'react';
import {View, Text, Alert} from 'react-native';
import HomeSectionList from "../commonUI/list/HomeSectionList";


export default class UIHomePage extends Component {

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
            { key: "Base",
                data: [
                    { title: "Layout", page: "LayoutHome" },
                    { title: "Button", page: "ButtonHome" },
                    { title: "Navigation", page: "NavigationHome" },
                    { title: "Text", page: "TextHome" },
                    ]
            },
            { key: "image",
                data: [
                    { title: "ImageHomePage", page: "ImageHomePage" },
                ]
            },
            { key: "Loading",
                data: [
                    { title: "ActivityIndicatorPage", page: "ActivityIndicatorPage" },
                    { title: "HUDHomePage", page: "HUDHomePage" },
                ]
            },
            { key: "Pick",
                data: [
                    { title: "PickDatePage", page: "PickDatePage" },
                    { title: "PickImagesPage", page: "PickImagesPage" },
                    ]
            },
            { key: "List",
                data: [
                    { title: "FlatListEasyPage", page: "FlatListEasyPage" },
                    { title: "FlatListNumColumnsPage", page: "FlatListNumColumnsPage" },
                    { title: "FlatListHorizontalEasyPage", page: "FlatListHorizontalEasyPage" },
                    { title: "GoodsChoosePage", page: "GoodsChoosePage" },
                    { title: "ImagesChoosePage", page: "ImagesChoosePage" },
                    { title: "ListExamplePage", page: "ListExamplePage" },
                    ]
            },
            { key: "W",
                data: [
                    { title: "王磊" },
                    { title: "王者荣耀" },
                    { title: "往事不能回味" },
                    { title: "王小磊" },
                    { title: "王中磊" },
                    { title: "王大磊" }
                    ]
            },
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
