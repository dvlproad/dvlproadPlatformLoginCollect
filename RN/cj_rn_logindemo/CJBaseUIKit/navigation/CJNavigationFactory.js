/**
 * CJNavigationFactory.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [导航栏(含路由)]
 */
import React, {Component} from 'react';
import CJImageButton from '../button/CJImageButton';
import CJNavigationUtil from "./CJNavigationUtil";

export default class CJNavigationFactory {
    /**
     * 创建会从包内返回到壳APP的导航栏
     *
     * @param title 导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backAppNavigationOptions = (title) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                <CJBackAppButton />
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
}

// 包内->壳：从保内返回到壳App的图片按钮--每个RN app的首页都需要使用的组件
export class CJBackButtonFactory {
    /**
     * 包内->壳：从保内返回到壳App的图片按钮--每个RN app【的首页】都需要使用的组件
     *
     * @returns {*}
     */
    static backAppButton() {
        return (
            <CJImageButton source={require('./resources/nav_back.png')}
                           onPress={() => {
                               // MiniApp.exit();
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
}