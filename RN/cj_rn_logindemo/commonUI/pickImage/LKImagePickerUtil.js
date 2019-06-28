//LKImagePickerUtil.js
import React from 'react';
import ImagePicker from "react-native-image-picker";

class LKImagePickerUtil {
    static showPhotoCameraActionSheet(imageHandle){
        const options = {
            title: '选择图片', //如果要不显示title，应该设为null，而非注释掉此行
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍摄',
            chooseFromLibraryButtonTitle: '从手机相册选择',
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const imageSource = { uri: response.uri };
                // You can also display the image using data:
                // const imageSource = { uri: 'data:image/jpeg;base64,' + response.data };
                imageHandle(response.uri);
            }
        });
    }
}

export default LKImagePickerUtil;