//ButtonHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";

export default class ButtonHomePage extends Component {

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
            { key: "Button",
                data: [
                    { title: "RNButtonPage", page: "RNButtonPage" },
                    { title: "EditSubmitButtonPage", page: "EditSubmitButtonPage" },
                    { title: "ButtonColorPage", page: "ButtonColorPage" },
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

//ButtonPages
import RNButtonPage from "./RNButtonPage";
import EditSubmitButtonPage from "./EditSubmitButtonPage";
import ButtonColorPage from "./ButtonColorPage";

export const ButtonPages = {
    ButtonHomePage: {
        screen: ButtonHomePage,
        navigationOptions: () => ({
            title: `ButtonHomePage`,
        }),
    },
    RNButtonPage: {
        screen: RNButtonPage,
        navigationOptions: () => ({
            title: `RNButtonPage`,
        }),
    },
    EditSubmitButtonPage: {
        screen: EditSubmitButtonPage,
        navigationOptions: () => ({
            title: `EditSubmitButtonPage`,
        }),
    },
    ButtonColorPage: {
        screen: ButtonColorPage,
        navigationOptions: () => ({
            title: `ButtonColorPage`,
        }),
    },
}
