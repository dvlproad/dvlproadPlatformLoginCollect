//GoodsChooseList//商品水平展示视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";


export class GoodItem extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        goodTitle: PropTypes.string.isRequired,
        goodPrice: PropTypes.string.isRequired,
        goodDescribe: PropTypes.string.isRequired,
        //goodImage: PropTypes.object.isRequired,
    };

    static defaultProps = {
        goodTitle: "商品标题",
        goodPrice: "168",
        goodDescribe: "商品描述",
        goodImage: null,
    };

    render() {
        const imageWidth = this.props.imageWidth;
        const imageHeight = this.props.imageHeight;
        const goodImage = this.props.goodImage;

        return (
            <TouchableOpacity style={{ width:imageWidth, marginLeft:5, marginRight:5, marginBottom:15 }}>
                <Image style={{ width:imageWidth,  height:imageHeight, backgroundColor:'#f4f4f4'}}
                       source={goodImage}
                />

                <Text style={{ backgroundColor:'#F1ECE2', color:'#9F8A60', paddingTop:8, paddingBottom:8, paddingLeft:4, paddingRight:4}}
                      numberOfLines={1}
                >
                    {this.props.goodDescribe}
                </Text>

                <View style={{flex:1}}>
                    <Text style={{ fontSize:14, color:'#666', marginTop:8, marginBottom:4 }} numberOfLines={2} >
                        {this.props.goodTitle}
                    </Text>
                    <Text style={{ fontSize:14, color:'#b4282d' }}>
                        ￥{this.props.goodPrice}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default class GoodsChooseList extends Component {
    static propTypes = {
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,
        goods: PropTypes.array,
    };

    static defaultProps = {
        listWidth: 0,
        numColumns: 2,
        goods: [],
    };

    render() {
        const numColumns = this.props.numColumns;
        const imageWidth = this.props.listWidth/numColumns -15;
        const imageHeight = imageWidth;

        return (
            <FlatList
                data={this.props.goods}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <GoodItem
                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                            goodTitle={item.title}
                            goodPrice={item.price}
                            goodDescribe={item.describe}
                            goodImage={item.image}
                        />
                    )
                }}
                numColumns={numColumns}
            />
        )
    }
}