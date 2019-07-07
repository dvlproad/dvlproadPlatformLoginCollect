//LifecycleHomePage.js
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import HomeSectionList from "../commonUI/list/HomeSectionList";


export default class LifecycleHomePage extends Component {

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
            { key: "State",
                data: [
                    { title: "StateEasy：最基本的使用",   page: "StateEasyPage" },
                    { title: "StateNormal：正常使用", page: "StateNormalPage" },
                ]
            },
            { key: "Props",
                data: [
                    { title: "PropsEasyPage：没使用默认值",   page: "PropsEasyPage" },
                    { title: "PropsNormalPage：使用默认值，但没进行类型检查", page: "PropsNormalPage" },
                    { title: "PropsPerfectPage：使用默认值，且进行类型检查)", page: "PropsPerfectPage" },
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


//LifeCyclePages
import StateEasyPage from "./state/StateEasyPage";
import StateNormalPage from "./state/StateNormalPage";
import PropsEasyPage from "./props/PropsEasyPage";
import PropsNormalPage from "./props/PropsNormalPage";
import PropsPerfectPage from "./props/PropsPerfectPage";

export const LifeCycleRoutePage = 'LifecycleHomePage';
export const LifeCyclePages = {
    LifecycleHomePage: {
        screen: LifecycleHomePage,
            navigationOptions: () => ({
            title: `Lifecycle首页`,
        }),
    },
    StateEasyPage: {
        screen: StateEasyPage,
            navigationOptions: () => ({
            title: `State(最简单的使用)`,
        }),
    },
    StateNormalPage: {
        screen: StateNormalPage,
            navigationOptions: () => ({
            title: `State(正常使用)`,
        }),
    },
    PropsEasyPage: {
        screen: PropsEasyPage,
            navigationOptions: () => ({
            title: `Props(最简单的使用)`,
        }),
    },
    PropsNormalPage: {
        screen: PropsNormalPage,
            navigationOptions: () => ({
            title: `Props(基本的使用)`,
        }),
    },
    PropsPerfectPage: {
        screen: PropsPerfectPage,
            navigationOptions: () => ({
            title: `Props(完整的使用)`,
        }),
    },
}