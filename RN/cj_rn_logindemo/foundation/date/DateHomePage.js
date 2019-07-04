//ImageHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export default class DateHomePage extends Component {

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
            { key: "date",
                data: [
                    { title: "DateMomentPage", page: "DateMomentPage" },
                    { title: "DateFormatterPage", page: "DateFormatterPage" },
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

//ImagePages

import DateMomentPage from "./DateMomentPage";
import DateFormatterPage from "./DateFormatterPage";
import DateElementPage from "./DateElementPage";

export const FoundationDatePages = {
    DateHomePage: {
        screen: DateHomePage,
        navigationOptions: () => ({
            title: `DateHomePage`,
        }),
    },
    DateMomentPage: {
        screen: DateMomentPage,
        navigationOptions: () => ({
            title: `Moment的使用`,
        }),
    },
    DateFormatterPage: {
        screen: DateFormatterPage,
        navigationOptions: () => ({
            title: `DateFormatter`,
        }),
    },
    DateElementPage: {
        screen: DateElementPage,
        navigationOptions: () => ({
            title: `DateElementPage`,
        }),
    },
}
