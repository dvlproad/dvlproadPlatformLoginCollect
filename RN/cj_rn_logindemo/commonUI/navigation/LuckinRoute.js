import {
    CJNavigationUtil
} from "../../CJBaseUIKit/CJBaseUIKit";

export default class LuckinRoute {
    /**
     * 进入到指定的界面
     *
     * @param navigation    导航栏
     * @param routeName     要进入的页面
     * @param params        参数
     */
    static push(navigation, routeName = '', params = {}) {
        CJNavigationUtil.push(navigation, routeName, params);
    }

    /**
     * 返回到上一个页面
     *
     * @param navigation    导航栏
     */
    static pop(navigation) {
        CJNavigationUtil.pop(navigation);
    }

    /**
     * 返回到根页面
     *
     * @param navigation    导航栏
     */
    static popToRootPage(navigation) {
        CJNavigationUtil.popToRootPage(navigation);
    }

}



