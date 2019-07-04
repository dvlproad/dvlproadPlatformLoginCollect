// FoundationRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//FoundationHomePage
import FoundationHomePage from "./FoundationHomePage";

import {FoundationDatePages} from "./date/DateHomePage";


//FoundationHomeNavigation
const FoundationHomeNavigation = createStackNavigator(
    {
        FoundationHomePage: {
            screen: FoundationHomePage,
            navigationOptions: () => ({
                title: `Foundation首页`,
            }),
        },

        ...FoundationDatePages,
    },
    {
        initialRouteName: 'DateElementPage'
    }
);


export default createAppContainer(FoundationHomeNavigation);




