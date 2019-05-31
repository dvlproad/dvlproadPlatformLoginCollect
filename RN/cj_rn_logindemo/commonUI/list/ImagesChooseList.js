//ImagesChooseList.js
// 图片系列选择视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import ImageChooseButton, {ImageSourceType} from '../button/ImageChooseButton'

export class ImageItem extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        goodTitle: PropTypes.string.isRequired,
        goodPrice: PropTypes.string.isRequired,
        goodDescribe: PropTypes.string.isRequired,
    };

    static defaultProps = {
        goodTitle: "商品标题",
        goodPrice: "168",
        goodDescribe: "商品描述",
    };

    render() {
        const imageWidth = this.props.imageWidth;
        const imageHeight = this.props.imageHeight;

        return (
            <TouchableOpacity style={{ width:imageWidth, marginLeft:5, marginRight:5, marginBottom:15 }}>
                <Image style={{ width:imageWidth,  height:imageHeight, backgroundColor:'#f4f4f4'}}
                       source={require('./goods.png')}
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

export default class ImagesChooseList extends Component {
    static propTypes = {
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,

        images: PropTypes.array,
        // imageSourceType: PropTypes.number.isRequired,
        // imageUrl: PropTypes.string.isRequired,
    };

    static defaultProps = {
        listWidth: 0,
        numColumns: 2,

        images:[],
        // imageSourceType: ImageSourceType.Default,
        // imageUrl: null,
    };


    render() {
        const numColumns = this.props.numColumns;
        const imageWidth = this.props.listWidth/numColumns-15;
        const imageHeight = imageWidth * 108/164;

        return (
            <FlatList
                data={this.props.images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <ImageChooseButton
                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                            imageSourceType={item.imageSourceType}
                            imageUrl={item.imageUrl}
                        />
                    )
                }}
                numColumns={numColumns}
            />
        )
    }
}