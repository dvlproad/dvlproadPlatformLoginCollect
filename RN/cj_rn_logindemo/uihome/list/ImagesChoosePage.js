//ImagesChoosePage.js

import React, { Component } from 'react';
import {View, Text, Dimensions, ScrollView, Alert} from 'react-native';

import LKImagesChooseList  from '../../commonUI/list/LKImagesChooseList'

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class ImagesChoosePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSources: [
                {imageSource: require('./img/1.jpg')},
                {imageSource: require('./img/2.jpg')},
                {imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}},
            ]
        };
    }

    browseImageHandle=(index) => {
        Alert.alert("浏览图片" + index);
    }

    addImageHandle=(index) => {
        Alert.alert("添加图片" + index);
        let healthCerImage = {imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}};

        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(index-1, 0, healthCerImage);
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    deleteImageHandle=(index) => {
        // Alert.alert("删除图片" + index);
        let healthCerImages = this.state.healthCerImages;
        healthCerImages.splice(index,1);
        this.setState({
                healthCerImages: healthCerImages
            }
        )
    }

    // 健康证图片选择(一行2个)
    renderHealthCerImages(){
        let listWidth = width;
        return (
            <View style={{backgroundColor: 'green'}}>
                <LKImagesChooseList style={{backgroundColor: 'green'}}
                                  listWidth={listWidth}
                                  numColumns={2}
                                  widthHeightRatio={164/108}
                                  boxHorizontalInterval={30}
                                  imageSources={this.state.imageSources}
                                  browseImageHandle={this.browseImageHandle}
                                  addImageHandle={this.addImageHandle}
                                  deleteImageHandle={this.deleteImageHandle}
                />
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: '#efefef'}}>
                    <Text style={{fontSize:16, color:'#666', backgroundColor: 'orange'}}>健康证图片选择 flex-start </Text>
                    {this.renderHealthCerImages()}
                </View>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#efefef'}}>
                    <Text style={{fontSize:16, color:'#666', backgroundColor: 'orange'}}>健康证图片选择 center</Text>
                    {this.renderHealthCerImages()}
                </View>
            </ScrollView>
        );
    }
}
