/**
 * CJNavigationFactory.js(不要引用此类，即请将此类复制一遍在具体APP中自己实现一遍)
 *
 * @Description: 导航栏(含路由)
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-09 10:31:29
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import CJImageButton from '../button/CJImageButton';
import CJNavigationUtil from "./CJNavigationUtil";
import {Button} from "react-native";
// import MiniApp from "../../bridge_modules_js/MiniApp";

export default class CJNavigationFactory {
    /**
     * 创建会从包内返回到壳APP的导航栏
     *
     * @param title         导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backAppNavigationOptions = (title) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                CJBackButtonFactory.backAppButton()
                // <CJBackAppButton />
            ),
        };
        return navigationOptions;
    };

    /**
     * 创建放回RN包内上一页的导航栏
     *
     * @param navigation    导航栏
     * @param title         导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backPageNavigationOptions = ({ navigation }, title) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                CJBackButtonFactory.backPageButton({ navigation })
                // <CJBackPageButton />
            ),
        };
        return navigationOptions;
    };


    /**
     * 创建放回RN包内上一页且有右键的导航栏
     *
     * @param navigation            导航栏
     * @param title                 导航栏标题
     * @param rightButtonText       导航栏右键的标题
     * @param rightButtonOnPress    导航栏右键的按钮事件
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backPageWithRightButtonNavigationOptions = ({ navigation }, title, rightButtonText, rightButtonOnPress) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                CJBackButtonFactory.backPageButton({ navigation })
                // <CJBackPageButton />
            ),
            headerRight: (
                <Button
                    title={rightButtonText}
                    onPress={rightButtonOnPress}
                />
            ),
        };
        return navigationOptions;
    };
}

/**
 * 各种导航栏上的返回按钮
 */
export class CJBackButtonFactory {
    /**
     * 包内->壳：从保内返回到壳App的图片按钮--每个RN app【的首页】都需要使用的组件
     *
     * @returns {*}
     */
    static backAppButton() {
        return (
            <CJImageButton source={require('./resources/nav_back.png')}
                           onPress={() => { // 返回原生APP的点击事件
                               this.__onPressBackApp();
                           }}
            />
        )
    }

    /**
     * 包内->包内：在包内返回到上一个的图片按钮--每个RN app 【除首页之外】都需要使用的组件
     *
     * @param navigation
     * @returns {*}
     */
    static backPageButton({ navigation }) {
        return (
            <CJImageButton source={require('./resources/nav_back.png')}
                           onPress={() => {
                               CJNavigationUtil.pop(navigation);
                           }}
            />
        )
    }


    /**
     * 返回原生APP的点击事件
     *
     * @private
     */
    static __onPressBackApp = () => {
        // MiniApp.exit();
    };
}