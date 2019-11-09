// LKNavigationFactory.js

import React, {Component} from 'react';
import { CJNavigationFactory } from "../../CJBaseUIKit/CJBaseUIKit";

export default class LKNavigationFactory {
    /**
     * 创建会从包内返回到壳APP的导航栏
     *
     * @param title 导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backAppNavigationOptions = (title) => {
        return CJNavigationFactory.backAppNavigationOptions(title);
    };

    /**
     * 创建放回RN包内上一页的导航栏
     *
     * @param navigation    导航栏
     * @param title         导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backPageNavigationOptions = ({ navigation }, title) => {
        return CJNavigationFactory.backPageNavigationOptions({ navigation }, title);
    }
}