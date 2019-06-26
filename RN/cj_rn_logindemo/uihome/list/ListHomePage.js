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
