//FlatListHorizontalEasyPage.js

import React, { Component } from 'react';
import {View, Text, Dimensions, ScrollView, FlatList, Image, TouchableOpacity} from 'react-native';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export default class FlatListHorizontalEasyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            texts:[
                {title: '文本1'},
                {title: '文本2'},
                {title: '文本3'},
                {title: '文本4'},
                {title: '文本5'},
                {title: '文本6'},
                {title: '文本7'},
            ]
        };
    }

    // 猜你喜欢(一行两个)
    renderLike(){
        const numColumns = 4;
        const imageWidth = width/numColumns -15;
        const imageHeight = imageWidth;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff'}}>
                <Text style={{fontSize:16, color:'#666'}}>猜你喜欢1</Text>
                <FlatList
                    data={this.state.texts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ width:imageWidth, marginHorizontal:5, marginBottom:35, backgroundColor:'red' }}>
                                <Image style={{ width:imageWidth,  height:imageHeight, backgroundColor:'#f4f4f4'}}
                                       source={require('./img/goods.png')}
                                />
                                <Text style={{ fontSize:14, color:'#666' }} numberOfLines={2} >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>

                        )
                    }}
                    numColumns={numColumns}
                />
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#efefef'}}>
                    {this.renderLike()}
                </View>
            </ScrollView>
        );
    }
}
