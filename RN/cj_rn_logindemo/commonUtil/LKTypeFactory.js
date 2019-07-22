import Network from "../bridge_modules_js/Network";
import HUD from '../bridge_modules_js/HUD';

export const LabelItemType = {
    STORETYPE: "storeType",//门店类型
    LOCATIONTYPE: "locationType",//位置类型
    PROJECTTYPE: "projectType",//项目类型
    REVIEWSTATE: "reviewState",//审核状态
    PROJECTSTATE: "projectState",//项目状态

}
export default class LKTypeFactory {
    /**
     * POST请求
     * @param {URL string} url
     * @param {参数 json} params
     */
    static CODELIST(type = LabelItemType.LOCATIONTYPE, needLoading = true) {
        return new Promise((resolve, reject) => {
            if (needLoading) {
                HUD.loading({});
            }
            Network.request({
                method: "POST",
                path: "/resource/empapi/gmap/codelist",
                data: {codeName: type}
            }).then(rst => {
                if (needLoading) {
                    HUD.hide();
                }
                if (rst.content && rst.content.dataList) {
                    resolve(rst.content.dataList);
                } else {
                    resolve([]);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }


}




