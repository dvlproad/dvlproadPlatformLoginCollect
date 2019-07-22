//LKNetworkUtil.js

import Network from '../../bridge_modules_js/Network';

import {
    LKProgressHUD,
} from '../../commonUI/luckincommonui';


/**
 * 图片上传状态
 *
 * @type {{Uploading: number, NotNeed: number, Success: number, Failure: number, Waiting: number}}
 */
export var LKFileUploadState = {
    NotNeed: 0,     /**< 不需要上传 */
    Waiting: 1,     /**< 等待上传 */
    Uploading: 2,   /**< 正在上传 */
    Success: 3,     /**< 上传成功 */
    Failure: 4,     /**< 上传失败 */
};

export default class LKNetworkUtil {
    /*
    使用示例：
        LKNetworkUtil.GET(
            '/resource/empapi/audit/healthCardInfo',
            {},
            false
        ).then((responseJSON) => {                       // msg is an Object
            this.getHealthCardInfoSuccess(responseJSON);
        }).catch((error) => {                    // error is an Object with key [code, msg]
            this.getHealthCardInfoFailure(error);
        });
    */
    /**
     * GET请求
     * @param path                  请求的path（推荐以“/”开头）,形如'/resource/empapi/audit/healthCardInfo'
     * @param params                参数请求，以集合的方式传递
     * @param isNeedLoading         是否需要弹出
     * @returns {Promise<any> | Promise<*>}
     * @constructor
     */
    static GET(path, params, isNeedLoading) {
        return new Promise((resolve, reject) => {
            if (isNeedLoading) {
                LKProgressHUD.show();
            }
            Network.request({
                method: 'GET',
                path: path,
                data: params
            }).then(responseJSON => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                resolve(responseJSON);
            }).catch(error => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                reject(error);
            });
        });
    }

    /*
    使用示例：
        LKNetworkUtil.GET(
            '/resource/empapi/audit/healthCardInfo',
            {},
            false
        ).then((responseJSON) => {                       // msg is an Object
            this.getHealthCardInfoSuccess(responseJSON);
        }).catch((error) => {                    // error is an Object with key [code, msg]
            this.getHealthCardInfoFailure(error);
        });
    */
    /**
     * POST请求
     * @param path                  请求的path（推荐以“/”开头）,形如'/resource/empapi/audit/healthCardInfo'
     * @param params                参数请求，以集合的方式传递
     * @param isNeedLoading         是否需要弹出
     * @returns {Promise<any> | Promise<*>}
     * @constructor
     */
    static POST(path, params, isNeedLoading) {
        return new Promise((resolve, reject) => {
            if (isNeedLoading) {
                LKProgressHUD.show();
            }
            Network.request({
                method: 'POST',
                path: path,
                data: params
            }).then(responseJSON => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                resolve(responseJSON);
            }).catch(error => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                reject(error);
            });
        });
    }

    /*
    使用示例：
        LKNetworkUtil.UploadFile(
            {},
            {
                "file": {
                    filePath: imageRelativePath,    //  本地文件路径
                    fileName: fileName,             //  fileName 字段的值，可空
                    mimeType: "image/png",          //  mimeType 字段的值，可空
                }
            },
            false,
            progress => {
                this.imageUploading(healthCerImage, progress);
            }
        ).then(responseJSON => {
            let imageUrl = responseJSON['content']['url'];
            this.imageUploadSuccess(healthCerImage, imageUrl);

        }).catch(error => {
            this.imageUploadFailure(healthCerImage);
        });
    */
    /**
     * 文件上传请求
     * @param {参数 json} params 
     * @param {文件上传参数*} files
     * @param {是否需要loading} isNeedLoading 
     * @param {进度回调*} handleProgress
     * @returns
     * @memberof LKNetworkUtil
     */
    static UploadFile(params, files, isNeedLoading, handleProgress) {
        return new Promise((resolve, reject) => {
            if (isNeedLoading) {
                LKProgressHUD.show();
            }
            Network.upload({
                method: 'POST',
                path: '/resource/empapi/file/upload',
                data: {},
                files: files,
                handleProgress: handleProgress,
            }).then(responseJSON => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                resolve(responseJSON);
            }).catch(error => {
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }
                reject(error);
            });
        });
    }


    /* 上传图片的使用示例
        LKNetworkUtil.UploadImage(
            imageRelativePath,
            progress => {
                this.imageUploading(healthCerImage, progress);
            }
        ).then(responseJSON => {
            let imageUrl = responseJSON['content']['url'];
            this.imageUploadSuccess(healthCerImage, imageUrl);

        }).catch(error => {
            this.imageUploadFailure(healthCerImage);
        });
     */
    /**
     * 上传图片的方法
     * @param imageRelativePath     图片的相对路径
     * @param handleProgress        图片进度
     * @returns {Promise<any> | Promise<*>}
     * @constructor
     */
    static UploadImage(imageRelativePath, handleProgress) {
        return new Promise((resolve, reject) => {
            let pathComponents = imageRelativePath.split('/');
            let fileName = pathComponents[pathComponents.length-1];

            Network.upload({
                method: 'POST',
                path: '/resource/empapi/file/upload',
                data: {},
                files: {
                    "file": {
                        filePath: imageRelativePath,    //  本地文件路径
                        fileName: fileName,             //  fileName 字段的值，可空
                        mimeType: "image/png",          //  mimeType 字段的值，可空
                    }
                },
                handleProgress: handleProgress,
            }).then(responseJSON => {
                resolve(responseJSON);
            }).catch(error => {
                reject(error);
            });
        });
    }



    /**
     * 上传图片的方法
     * @param imageRelativePath     图片的相对路径
     * @param handleProgress        图片进度
     * @returns {Promise<any> | Promise<*>}
     * @constructor
     */
    static UploadImageWithPath(apiPath, imageRelativePath, handleProgress) {
        return new Promise((resolve, reject) => {
            let pathComponents = imageRelativePath.split('/');
            let fileName = pathComponents[pathComponents.length-1];

            Network.upload({
                method: 'POST',
                path: apiPath,
                data: {},
                files: {
                    "file": {
                        filePath: imageRelativePath,    //  本地文件路径
                        fileName: fileName,             //  fileName 字段的值，可空
                        mimeType: "image/png",          //  mimeType 字段的值，可空
                    }
                },
                handleProgress: handleProgress,
            }).then(responseJSON => {
                resolve(responseJSON);
            }).catch(error => {
                reject(error);
            });
        });
    }
}




