// LKImagePickerUtil.js

/*
LKImagePickerUtil 图片选择 使用示例：

import {
    LKImagePickerUtil,
} from '../commonUtil/luckincommonutil';


                // 拍摄
                LKImagePickerUtil.takePhoto((imageAbsolutePath, imageRelativePath)=>{
                    this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                });

                // 从手机相册选择
                LKImagePickerUtil.choosePhoto((imageAbsolutePath, imageRelativePath)=>{
                    this.addImageHandle(index, imageAbsolutePath, imageRelativePath);
                });
 */

import Camera from "../bridge_modules_js/Camera";
import FileManager from "../bridge_modules_js/FileManager";
import LKToastUtil from "../commonUI/toast/LKToastUtil";
import {ActionSheet} from 'teaset'

export const PHOTO_PANEL_ITEM_LABEL = {
    TAKE_PHONE_BY_CAMERA: 'TAKE_PHONE_BY_CAMERA',
    TAKE_PHOTO_FROM_ALBUM: 'TAKE_PHOTO_FROM_ALBUM'
}

export default class LKImagePickerUtil {

    /**
     * 拍摄
     * @param pickImageFinishBlock
     */
    static takePhoto(pickImageFinishBlock) {
        Camera.open().then(rst=>{
            let fromPath = rst.path;

            let fileName = new Date().getTime() + '.jpg';
            let imageRelativePath = '/documents/' + fileName;
            FileManager.move({ from: fromPath, to: imageRelativePath });
            FileManager.fileUrlOf({ path: imageRelativePath }).then(imageAbsolutePath=>{
                pickImageFinishBlock && pickImageFinishBlock(imageAbsolutePath, imageRelativePath);
            });


        }).catch(error=>{
            let { code, message } = error;
            LKToastUtil.showMessage(message);
        });
    }


    /**
     * 从手机相册选择
     * @param pickImageFinishBlock
     */
    static choosePhoto(pickImageFinishBlock) {
        Camera.openPhotoAlbum().then(rst=>{
            let fromPath = rst.path;

            let fileName = new Date().getTime() + '.jpg';
            let imageRelativePath = '/documents/' + fileName;
            FileManager.move({ from: fromPath, to: imageRelativePath });
            FileManager.fileUrlOf({ path: imageRelativePath }).then(imageAbsolutePath=>{
                pickImageFinishBlock && pickImageFinishBlock(imageAbsolutePath, imageRelativePath);
            });


        }).catch(error=>{
            let { code, message } = error;
            LKToastUtil.showMessage(message);
        });
    }

    /**
     *
     * @param pickImageFinishBlock (imageAbsolutePath, imageRelativePath)
     * @param photosItemName {action: PHOTO_PANEL_ITEM_LABEL.*, name:nullable, pickImageFinishBlock:(imageAbsolutePath, imageRelativePath)=>{}
     */
    static showPhotoPickerPanel(pickImageFinishBlock, ...photosItemName) {

        if (photosItemName == null) {
            return;
        }

        let photoPanelItems = [];

        for (let index = 0; index < photosItemName.length; index++) {
            switch (photosItemName[index].action) {
                case PHOTO_PANEL_ITEM_LABEL.TAKE_PHONE_BY_CAMERA:
                    this.pushCameraPhotoItem(photoPanelItems, photosItemName[index], pickImageFinishBlock);
                    break;
                case PHOTO_PANEL_ITEM_LABEL.TAKE_PHOTO_FROM_ALBUM:
                    this.pushAlbumPhotoItem(photoPanelItems, photosItemName[index], pickImageFinishBlock);
                    break;
            }
        }

        let cancelItem = {title: "取消"};

        ActionSheet.show(photoPanelItems, cancelItem);

    }

    static pushCameraPhotoItem(photoPanelItems, photoPanelItem, pickImageFinishBlock) {
        photoPanelItems.push({
            title: photoPanelItem.name == null ? "拍照" : photoPanelItem.name, onPress: () => {
                LKImagePickerUtil.takePhoto(pickImageFinishBlock);
            }
        })
    }

    static pushAlbumPhotoItem(photoPanelItems, photoPanelItem, pickImageFinishBlock) {
        photoPanelItems.push({
            title: photoPanelItem.name == null ? "从手机相册选择" : photoPanelItem.name, onPress: () => {
                LKImagePickerUtil.choosePhoto(pickImageFinishBlock);
            }
        })
    }

}