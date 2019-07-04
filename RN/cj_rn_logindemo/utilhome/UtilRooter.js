// UtilRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//UtilHome
import UtilHomePage from "./UtilHomePage";

//string
import StringPage from "./string/StringPage";

//timer
import CountTimerPage from './timer/CountTimerPage';



//UtilHomeNavigation
const UtilHomeNavigation = createStackNavigator(
    {
        UtilHome: {
            screen: UtilHomePage,
            navigationOptions: () => ({
                title: `Util首页`,
            }),
        },
        StringPage: {
            screen: StringPage,
            navigationOptions: () => ({
                title: `String首页`,
            }),
        },
        CountTimerPage: {
            screen: CountTimerPage,
            navigationOptions: () => ({
                title: `Timer首页`,
            }),
        },
    },
    {
        initialRouteName: 'UtilHome'
    }
);


export default createAppContainer(UtilHomeNavigation);




