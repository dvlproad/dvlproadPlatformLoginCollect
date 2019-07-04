//UtilHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../../commonUI/list/HomeSectionList";


export default class PickHomePage extends Component {

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
            { key: "Weight",
                data: [
                    { title: "PickWeightPage", page: "PickWeightPage" },
                ]
            },
            { key: "Date",
                data: [
                    { title: "PickOwnSingleDatePage", page: "PickOwnSingleDatePage" },
                    { title: "PickComSingleDatePage", page: "PickComSingleDatePage" },
                    { title: "PickRangeDatePage", page: "PickRangeDatePage" },
                ]
            },
            { key: "Image",
                data: [
                    { title: "PickImagesPage", page: "PickImagesPage" },
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
