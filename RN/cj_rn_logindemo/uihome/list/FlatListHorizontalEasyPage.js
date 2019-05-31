//FlatListHorizontalNormalPagealPage.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, FlatList } from 'react-native';
import { GoodItem } from './component/GoodsHorizontalList'

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export default class FlatListHorizontalEasyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            special:[
                {title: '春宴 茶食礼盒 1.38千克', price: '168', describe:'定位高端,国际顶级品牌代工厂'},
                {title: '日本AKOYA天然海水珍珠18K金项链天然海水珍珠18K金项链', price: '999', describe:'定位高端,国际顶级品牌代工厂'},
                {title: '针织弹力女士短靴', price: '129', describe:'定位高端,国际顶级品牌代工厂'},
                {title: '怀抱休闲椅组合（皮款）', price: '1699', describe:'定位高端,国际顶级品牌代工厂'},
                {title: '针织弹力女士短靴', price: '168', describe:'定位高端,国际顶级品牌代工厂'},
                {title: '日本AKOYA天然海水珍珠18K金项链', price: '999', describe:'定位高端,国际顶级品牌代工厂'},
            ]
        };
    }

    // 猜你喜欢(一行两个)
    renderLike(){
        const numColumns = 4;
        const imageWidth = width/numColumns -15;
        const imageHeight = imageWidth;

        return (
            <View style={{ width: width, alignItems:'center', paddingBottom:10, marginBottom:10, backgroundColor: '#fff'}}>
                <Text style={{fontSize:16, color:'#666', padding:15}}>猜你喜欢1</Text>
                <FlatList
                    data={this.state.special}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <GoodItem
                                imageWidth={imageWidth}
                                imageHeight={imageHeight}
                                goodTitle={item.title}
                                goodPrice={item.price}
                                goodDescribe={item.describe}
                            />
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
