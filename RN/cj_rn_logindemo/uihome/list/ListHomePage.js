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
                    { title: "ListExamplePage", page: "ListExamplePage" },
                    { title: "SectionListEasyPage", page: "SectionListEasyPage" },
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


// list
import FlatListEasyPage from './FlatListEasyPage';
import ListExamplePage from './ListExamplePage';
import SectionListEasyPage from './SectionListEasyPage';


// ListPages
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
    ListExamplePage: {
        screen: ListExamplePage,
        navigationOptions: () => ({
            title: `列表的使用示例`,
        }),
    },
    SectionListEasyPage: {
        screen: SectionListEasyPage,
        navigationOptions: () => ({
            title: `分区列表的简单使用`,
        }),
    },
};