//ImagesChoosePage.js

import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

import ImagesChooseList  from '../../commonUI/list/ImagesChooseList'

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class ImagesChoosePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            healthCerImages:[
                {imageSourceType: 1, imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                {imageSourceType: 2, imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                {imageSourceType: 2, imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
            ]
        };
    }

    // 健康证图片选择(一行2个)
    renderHealthCerImages(){
        let listWidth = width;
        return (
            <View style={{backgroundColor: 'green'}}>
                <ImagesChooseList style={{backgroundColor: 'green'}}
                                  listWidth={listWidth}
                                  boxHorizontalInterval={30}
                                  images={this.state.healthCerImages}
                                  numColumns={2} />
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
