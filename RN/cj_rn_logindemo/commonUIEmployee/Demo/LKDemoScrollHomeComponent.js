/**
 * LKDemoScrollHomeComponent.js
 *
 * @Description: 用于测试各种功能的滚动视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-07-05 10:48:37
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import {ScrollView} from 'react-native';

export default class LKDemoScrollHomeComponent extends Component {
    renderContentView() {

    }

    render() {
        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
                {this.renderContentView()}
            </ScrollView>

        );
    }
}
