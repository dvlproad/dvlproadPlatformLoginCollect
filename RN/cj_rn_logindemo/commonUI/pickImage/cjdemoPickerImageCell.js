//cjdemoPickerImageCell.js

import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions, Alert, Text, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import type {PressEvent} from "react-native/Libraries/Types/CoreEventTypes";

/// 图片位置
var ImageSourceType = {
    Default: 0,     /**< 无, 使用默认图片 */
    Local: 1,       /**< 本地 */
    Network: 2      /**< 网络 */
}

export default class CJDemoPickerImageFlatList extends Component {
    render() {
        const { style } = this.props;
        return (
            <View style={[{flexDirection: 'row', justifyContent: "space-between", paddingTop: 12}, style]}>
                <ImageButton style={{ width: 164, height: 108, backgroundColor:'red'}}
                             imageSourceType={ImageSourceType.Network}
                             imageUrl='/resources/healthCerImage1.png'
                             pickImageHandle={() => {
                                 Alert.alert("点击选择图片1");
                             }}
                             deleteImageHandle={() => {
                                 Alert.alert("点击删除图片1");
                             }}
                />
                <ImageButton style={{ width: 164, height: 108, backgroundColor:'green'}}
                             imageSourceType={ImageSourceType.Local}
                             imageUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg"
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





export class ImageButton extends Component {
    static propTypes = {
        isEditing: PropTypes.bool,
        imageSourceType: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        pickImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func
    };

    static defaultProps = {
        isEditing: false,
        imageSourceType: ImageSourceType.Default,
        imageUrl: null,
        pickImageHandle: null,
        deleteImageHandle: null
    };



    render() {
        const { style } = this.props;

        let imageSource = null;
        if ( this.props.imageSourceType == ImageSourceType.Local) {
            imageSource = require('./resources/healthCerImage1.png');

        } else if (this.props.imageSourceType == ImageSourceType.Network) {
            imageSource = {uri:this.props.imageUrl};
        } else {
            imageSource = require('./resources/imageLook.png');
        }

        imageSource = require('./resources/healthCerImage1.png');

        return (
            <TouchableOpacity onPress={this.props.pickImageHandle} >
                <View style={[{flex:1, flexDirection:"row-reverse"}, style]} >

                        <Image style={{ flex:1, width: 164-10, height: 108-10, marginTop: 10, marginRight:10 }} source={imageSource} defaultSource={require('./resources/imageLook.png')} />

                        <DeleteImageButton
                            style={{ position:'absolute', width: 22, height: 22}}
                            deleteImageHandle={this.props.deleteImageHandle}
                        />
                </View>
            </TouchableOpacity>
        );
    }
}

export class DeleteImageButton extends Component {
    static propTypes = {
        deleteImageHandle: PropTypes.func
    };

    static defaultProps = {
        deleteImageHandle: null,
    };


    render() {
        return (
            <View style={this.props.style} >
                <TouchableOpacity onPress={this.props.deleteImageHandle} >
                    <Image source={require('./resources/healthCer_delete_blue.png') } />
                </TouchableOpacity>
            </View>
        )
    }
}