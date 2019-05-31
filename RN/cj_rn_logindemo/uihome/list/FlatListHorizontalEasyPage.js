//FlatListHorizontalPage.js

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
} from 'react-native';

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
        return (
            <View style={{ width: width, alignItems:'center', paddingBottom:10, marginBottom:10, backgroundColor: '#fff'}}>
                <Text style={{fontSize:16, color:'#666', padding:15}}>猜你喜欢</Text>
                <FlatList
                    data={this.state.special}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderLikeItem}
                    numColumns={2}
                />
            </View>
        )
    }
    renderLikeItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ width:width/2 -15, marginLeft:5, marginRight:5, marginBottom:15 }}>
                <Image style={{ width:width/2 -15,  height:width/2 -15, backgroundColor:'#f4f4f4'}}
                       source={require('./img/goods.png')}
                />

                <Text style={{ backgroundColor:'#F1ECE2', color:'#9F8A60', paddingTop:8, paddingBottom:8, paddingLeft:4, paddingRight:4}}
                      numberOfLines={1}
                >
                    {item.describe}
                </Text>

                <View style={{flex:1}}>
                    <Text style={{ fontSize:14, color:'#666', marginTop:8, marginBottom:4 }} numberOfLines={2} >
                        {item.title}
                    </Text>
                    <Text style={{ fontSize:14, color:'#b4282d' }}>
                        ￥{item.price}
                    </Text>
                </View>
            </TouchableOpacity>
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
const styles = StyleSheet.create({

});