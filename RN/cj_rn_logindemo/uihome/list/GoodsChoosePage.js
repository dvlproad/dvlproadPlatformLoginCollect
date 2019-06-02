//GoodsChoosePage.js
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';

import GoodsChooseList from '../../commonUI/list/GoodsChooseList'

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class GoodsChoosePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            special:[
                {
                    title: '春宴 茶食礼盒 1.38千克',
                    price: '168',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),

                },
                {
                    title: '日本AKOYA天然海水珍珠18K金项链天然海水珍珠18K金项链',
                    price: '999',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),
                },
                {
                    title: '针织弹力女士短靴',
                    price: '129',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),
                },
                {
                    title: '怀抱休闲椅组合（皮款）',
                    price: '1699',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),
                },
                {
                    title: '针织弹力女士短靴',
                    price: '168',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),
                },
                {
                    title: '日本AKOYA天然海水珍珠18K金项链',
                    price: '999',
                    describe:'定位高端,国际顶级品牌代工厂',
                    image: require('./img/goods.png'),
                },
            ]
        };
    }

    // 私人订制(一行三个)
    renderSpecial(){
        return (
            <View style={styles.moduleBox}>
                <Text style={{fontSize:16, color:'#666', padding:15}}>私人订制</Text>
                <GoodsChooseList listWidth={width} goods={this.state.special} numColumns={3} />
            </View>
        )
    }

    // 猜你喜欢(一行两个)
    renderLike(){
        return (
            <View style={styles.moduleBox}>
                <Text style={{fontSize:16, color:'#666', padding:15}}>猜你喜欢</Text>
                <GoodsChooseList listWidth={width} goods={this.state.special} numColumns={2} />
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#efefef'}}>
                    {this.renderSpecial()}
                    {this.renderLike()}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    moduleBox: {
        width: width,
        alignItems:'center',
        backgroundColor: '#fff',
        paddingBottom:10,
        marginBottom:10,
    },
});