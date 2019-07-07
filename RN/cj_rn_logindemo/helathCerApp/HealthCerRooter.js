// HealthCerRooter.js
import React from 'react';

import HealthCerHomePage from "./HealthCerHomePage";

export const HealthCerRoutePage = 'HealthCerHomePage';
export const HealthCerPages = {
    HealthCerHomePage: {
        screen: HealthCerHomePage,
        navigationOptions: () => ({
            title: `个人健康证`,
            headerStyle:{                                 //导航栏样式设置
                backgroundColor:'#01adfe',
            },
        }),
    },
}