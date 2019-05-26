// HeathCerRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HealthCerHomePage from "./HealthCerHomePage";

const HeathCerNavigator = createStackNavigator(
    {
        HelathCerHome: {
            screen: HealthCerHomePage,
            navigationOptions: () => ({
                title: `个人健康证`,
                headerStyle:{                                 //导航栏样式设置
                    backgroundColor:'#8bc9ff',
                },
            }),
        },
    },
    {
        initialRouteName: 'HelathCerHome'
    }
);

export default createAppContainer(HeathCerNavigator);