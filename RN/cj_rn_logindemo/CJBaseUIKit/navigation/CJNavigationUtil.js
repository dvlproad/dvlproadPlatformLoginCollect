/**
 * CJNavigationUtil.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [路由]
 */
export default class CJNavigationUtil {
    /**
     * 进入到指定的界面
     *
     * @param navigation    导航栏
     * @param routeName     要进入的页面
     * @param params        参数
     */
    static push(navigation, routeName = '', params = {}) {
        if (!navigation) {
            return;
        }
        const { navigate } = navigation;
        navigate(routeName, params);
    }

    /**
     * 返回到上一个页面
     *
     * @param navigation    导航栏
     */
    static pop(navigation) {
        if (!navigation) {
            return;
        }
        const { goBack } = navigation;
        goBack();
    }

    /**
     * 返回到根页面
     *
     * @param navigation    导航栏
     */
    static popToRootPage(navigation) {
        if (!navigation) {
            return;
        }
        const { popToTop } = navigation;
        popToTop();
    }

}



