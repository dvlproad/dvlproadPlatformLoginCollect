/**
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [集合视图主页]
 */
import React, { Component } from 'react';
import {
    LKNavigationFactory,
    LKImageActionHomeComponent,
    ImageUploadType
} from '../../commonUI/luckincommonui';

export default class ImageActionCollectionPage extends LKImageActionHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageWithRightButtonNavigationOptions({ navigation }, `图片操作的集合视图`, '测试状态切换', ()=>{
            // navigation.navigate('ImageActionCollectionPage', {});
            navigation.state.params.changeEditState();
        })
    };

    componentWillMount(){
        this.props.navigation.setParams({
            changeEditState:this.changeEditState,
        })
    }

    changeEditState= ()=>{
        let isEditing = !this.state.isEditing;
        this.setState({
            isEditing: isEditing,
        })
    }


    constructor(props) {
        super(props);

        this.state = {
            imageModels: [
                {
                    imageSource: require('./img/1.jpg'),
                    uploadType: ImageUploadType.NotNeed,
                    uploadProgress: 0,
                    imageIndex: 0,
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    uploadType: ImageUploadType.Uploading,
                    uploadProgress: 20,
                    imageIndex: 1,
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    uploadType: ImageUploadType.Uploading,
                    uploadProgress: 60,
                    imageIndex: 2,
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    uploadType: ImageUploadType.Success,
                    uploadProgress: 100,
                    imageIndex: 3,
                },
                {
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    uploadType: ImageUploadType.Failure,
                    uploadProgress: 77,
                    imageIndex: 4,
                },
            ],
        }
    }
}