//LKNetworkSimulateUtil.js

import LKDataUtil from "../../commonUtil/LKDataUtil";

import {
    LKProgressHUD,
} from 'cjrn-demo-base';

export default class LKNetworkSimulateUtil {
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
    static local_GET(apiSuffix, params, isNeedLoading) {
        apiSuffix = 0;
        if (apiSuffix.indexOf("/") == 0) {
            apiSuffix.replace("/",'');
        }
        let jsonName = this.stringByReplacingOccurrencesOfString(apiSuffix, "/", ":");

        return new Promise((resolve, reject) => {
            if (isNeedLoading) {
                LKProgressHUD.show();
            }

            setTimeout(()=>{
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }

                let responseJSON = {};
                resolve(responseJSON);
            }, 500);
        });
    }

    /**
     * 将字符串中的字符替换成另一个字符
     *
     * @param beChangeOccurrences
     * @param toOccurrences
     */
    static stringByReplacingOccurrencesOfString(string, beChangeOccurrences, toOccurrences) {
        while(string.indexOf(beChangeOccurrences) >= 0) { // 判断a字符串中是否包含'c'，如果包含就替换掉，然后继续判断是否包含C，包含就替换继续判断，不包含就结束循环
            string = string.replace(beChangeOccurrences, toOccurrences);
        }
        return string;
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
            setTimeout(()=>{
                if (isNeedLoading) {
                    LKProgressHUD.dismiss();
                }

                let responseJSON = {};
                resolve(responseJSON);
            }, 500);
        });
    }

    /* 模拟图片上传的使用示例
        LKNetworkSimulateUtil.simulateUploadImage(
            imageModel,
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
     * 模拟图片上传的方法
     *
     * @param imageRelativePath         图片的相对路径
     * @param uploadingProgressBlock    图片进度变化的回调
     * @returns {Promise<any> | Promise<*>}
     */
    static simulateUploadImage(imageRelativePath, uploadingProgressBlock) {
        return new Promise((resolve, reject) => {
            this.addSimulateUploadImage(
                imageRelativePath,
                (newUploadProgress)=>{
                    uploadingProgressBlock && uploadingProgressBlock(newUploadProgress);
                },
                (responseJSON)=>{
                    resolve(responseJSON);
                }
            );
        });
    }

    /**
     * 添加模拟图片上传的方法
     *
     * @param imageRelativePath         图片的相对路径
     * @param uploadingProgressBlock    图片上传过程中进度变化的回调
     * @param uploadSuccessBlock        图片上传成功的回调
     * @returns {Promise<any> | Promise<*>}
     */
    static addSimulateUploadImage(imageRelativePath, uploadingProgressBlock, uploadSuccessBlock) {
        let pathComponents = imageRelativePath.split('/');
        let fileName = pathComponents[pathComponents.length - 1];

        let imageModel = new Map();
        imageModel.uuid = LKDataUtil.getUUID(); // 只在模拟上传时候，增加此属性，用来判断回调是给哪个
        imageModel.uploadProgress = 0;
        imageModel.uploadingProgressBlock = uploadingProgressBlock; // 保存放到上传中数组里，后面要用于回调
        imageModel.uploadSuccessBlock = uploadSuccessBlock;         // 保存放到上传中数组里，后面要用于回调
        if (this.uploadImageModels == null) {
            this.uploadImageModels = [];
        }
        this.uploadImageModels.push(imageModel);

        if (this._uploadTimer != null) {
            console.log("模拟上传的定时器已经创建并在使用中，不用重复创建");
            return;
        }

        this._uploadTimer = setInterval(() => {
            let uploadImageCount = 0;
            if (this.uploadImageModels) {
                uploadImageCount = this.uploadImageModels.length;
            }
            for (let i = 0; i < uploadImageCount; i++) {
                let uploadModel = this.uploadImageModels[i];
                let lastUploadProgress = uploadModel.uploadProgress;

                if (lastUploadProgress >= 100) {
                    let responseJSON = {
                        content: {
                            url: 'https://www.dvlproad.com/' + fileName,
                        }
                    };
                    //进度，待会还需要获取上次进度，所以这里记得要保存起来
                    uploadModel.uploadProgress = 100;
                    uploadModel.uploadSuccessBlock && uploadModel.uploadSuccessBlock(responseJSON);

                    this.uploadImageModels.splice(i, 1);    //或者 delete this.uploadImageModels[i];
                    if (this.uploadImageModels.length == 0) {
                        console.log('当前所有任务上传完成，删除模拟上传的定时器');
                        clearInterval(this._uploadTimer);
                        this._uploadTimer = null;
                    }

                } else {
                    let currentAddUploadProgress = LKDataUtil.getRandomNumber(10, 20);
                    let newUploadProgress = lastUploadProgress + currentAddUploadProgress;
                    if (newUploadProgress >= 100) {
                        newUploadProgress = 100;
                    }
                    //进度，待会还需要获取上次进度，所以这里记得要保存起来
                    uploadModel.uploadProgress = newUploadProgress;
                    uploadModel.uploadingProgressBlock && uploadModel.uploadingProgressBlock(newUploadProgress / 100);
                }
            }


        }, 1000);
    }
}




