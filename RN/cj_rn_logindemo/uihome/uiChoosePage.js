// uiChoosePage.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import UIHomePage from "./uiHomePage"
import ButtonHome from "../uihome/buttonHome"

export default createAppContainer(createStackNavigator(
    {
        UI: {
            screen: UIHomePage,
            navigationOptions: () => ({
                title: `UI首页`,
            }),
        },
        Buttons: {
            screen: ButtonHome,
            navigationOptions: () => ({
                title: `按钮首页`,
            }),
        }
    },
    {
        initialRouteName: 'UI'
    }
    )
);




