//cjdemoPickerImageCell.js

import React, { Component } from 'react';
import {View, Alert} from 'react-native';
import ImageChooseButton from '../../commonUI/button/ImageChooseButton';
import PropTypes from "prop-types";


export default class CJDemoPickerImageFlatList extends Component {
    static propTypes = {
        boxHorizontalInterval: PropTypes.number,      // 水平方向上box之间的间隔
        listWidth: PropTypes.number.isRequired,
        numColumns: PropTypes.number,
        widthHeightRatio: PropTypes.number,         // 宽高的比例（默认1:1，即1.0）

        images: PropTypes.array,

        pickImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,

        isEditing: PropTypes.bool,
    };

    static defaultProps = {
        boxHorizontalInterval: 5,
        listWidth: 0,
        numColumns: 2,
        widthHeightRatio: 1.0,  //宽高的比例

        images:[],

        pickImageHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},

        isEditing: false,
    };

    render() {
        const { style } = this.props;

        const numColumns = this.props.numColumns;
        const boxHorizontalInterval = this.props.boxHorizontalInterval;
        const boxTotalWidth = this.props.listWidth-(numColumns-1)*boxHorizontalInterval;
        const boxWidth = boxTotalWidth/numColumns;
        const boxHeight = boxWidth / this.props.widthHeightRatio;

        let networkImage = {uri:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"};

        return (
            <View style={[{flexDirection: 'row', justifyContent: "space-between"}, style]}>
                <ImageChooseButton style={{ width: boxWidth, height: boxHeight, backgroundColor:'red'}}
                                   imageWidth={boxWidth}
                                   imageHeight={boxHeight}
                                   imageSource={networkImage}
                                   pickImageHandle={() => {
                                       Alert.alert("点击选择图片1");
                                   }}
                                   deleteImageHandle={() => {
                                       Alert.alert("点击删除图片1");
                                   }}
                />
                <ImageChooseButton style={{ width: boxWidth, height: boxHeight, backgroundColor:'purple'}}
                                   imageWidth={boxWidth}
                                   imageHeight={boxHeight}
                                   imageSource={networkImage}
                                   pickImageHandle={() => {
                                       Alert.alert("点击选择图片2");
                                   }}
                                   deleteImageHandle={() => {
                                       Alert.alert("点击删除图片2");
                                   }}
                />
            </View>
        );
    }
}
