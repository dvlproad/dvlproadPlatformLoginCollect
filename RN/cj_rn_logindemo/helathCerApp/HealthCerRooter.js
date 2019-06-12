// HealthCerRooter.js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HealthCerHomePage from "./HealthCerHomePage";

const HeathCerNavigator = createStackNavigator(
    {
        HealthCerHome: {
            screen: HealthCerHomePage,
            navigationOptions: () => ({
                title: `个人健康证`,
                headerStyle:{                                 //导航栏样式设置
                    backgroundColor:'#01adfe',
                },
            }),
        },
    },
    {
        initialRouteName: 'HealthCerHome'
    }
);

export default createAppContainer(HeathCerNavigator);