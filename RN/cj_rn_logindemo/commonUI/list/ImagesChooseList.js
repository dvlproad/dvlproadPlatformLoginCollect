//ImagesChooseList.js
// 图片系列选择视图
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Alert, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
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
        boxHorizontalInterval: PropTypes.number,      // 水平方向上box之间的间隔
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,

        images: PropTypes.array,
        // imageSourceType: PropTypes.number.isRequired,
        // imageUrl: PropTypes.string.isRequired,

        pickImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func
    };

    static defaultProps = {
        boxHorizontalInterval: 5,
        listWidth: 0,
        numColumns: 2,

        images:[],
        // imageSourceType: ImageSourceType.Default,
        // imageUrl: null,
        //
        pickImageHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
    };


    render() {
        const numColumns = this.props.numColumns;
        const boxHorizontalInterval = this.props.boxHorizontalInterval;
        const boxTotalWidth = this.props.listWidth-(numColumns-1)*boxHorizontalInterval;
        const boxWidth = boxTotalWidth/numColumns;
        const boxHeight = boxWidth * 108/164;


        return (
            <FlatList
                style={this.props.style}
                data={this.props.images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <ImageChooseButton
                            style={{marginRight:boxHorizontalInterval}}
                            imageWidth={boxWidth}
                            imageHeight={boxHeight}
                            imageSourceType={item.imageSourceType}
                            imageUrl={item.imageUrl}

                            buttonIndex={index}
                            pickImageHandle={this.props.pickImageHandle}
                            deleteImageHandle={this.props.deleteImageHandle}
                        />
                    )
                }}
                numColumns={numColumns}
            />
        )
    }
}