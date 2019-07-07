//HelloHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../commonUI/list/HomeSectionList";

export default class HelloHomePage extends Component {

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
            { key: "Hello",
                data: [
                    { title: "HelloWorldPage", page: "HelloWorldPage" },
                    { title: "MovieHomePage", page: "MovieHomePage" },
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


//HelloPages
import HelloWorldPage from "./HelloWorldPage";
import MovieHomePage from "./movieApp/MovieHomePage";

export const HelloRoutePage = 'HelloHomePage';
export const HelloPages = {
    HelloHomePage: {
        screen: HelloHomePage,
        navigationOptions: () => ({
            title: `Hello首页`,
        }),
    },
    HelloWorldPage: {
        screen: HelloWorldPage,
        navigationOptions: () => ({
            title: `HelloWorldPage`,
        }),
    },
    MovieHomePage: {
        screen: MovieHomePage,
        navigationOptions: () => ({
            title: `MovieHomePage`,
        }),
    },
};