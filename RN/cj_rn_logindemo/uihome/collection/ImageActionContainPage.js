// ImageActionContainPage.js
import React, {Component} from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import {
    LKNavigationFactory,
    LKImageActionCollectionView,
    ImageUploadType
} from '../../commonUI/luckincommonui';
import {
    CJCenterText
} from '../../CJBaseUIKit/CJBaseUIKit';

export default class ImageActionContainPage extends Component {
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
            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
            isEditing: false,
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



    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }


    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }

    addImageHandle=(index) => {
        Alert.alert("添加图片" + index);
        let imageModel = {imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}};

        let imageModels = this.state.imageModels;
        imageModels.splice(index-1, 0, imageModel);
        this.setState({
            imageModels: imageModels
        })
    }

    // deleteImageHandle=(index) => {
    //     // Alert.alert("删除图片" + index);
    //     let imageModels = this.state.imageModels;
    //     imageModels.splice(index,1);
    //     this.setState({
    //         imageModels: imageModels
    //     })
    // }


    render() {
        return (
            <View
                style={{
                    backgroundColor:"green",
                }}
            >
                <LKImageActionCollectionView
                    imageModels={this.state.imageModels}

                    imageLoadedCountChange={this.imageLoadedCountChange}

                    isEditing={this.state.isEditing}
                    browseImageHandle={this.browseImageHandle}
                    addImageHandle={this.addImageHandle}
                    deleteImageCompleteBlock={(imageModels)=>{
                        this.setState({
                            imageModels: imageModels
                        })
                    }}
                />
                <CJCenterText
                    text={'我是用来测试的'}
                />
            </View>

        );
    }
}
