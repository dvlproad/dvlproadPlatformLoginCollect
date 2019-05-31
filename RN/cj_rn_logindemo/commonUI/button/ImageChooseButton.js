//ImageChooseButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";

/// 图片来源
export var ImageSourceType = {
    Default: 0,     /**< 无, 使用默认图片 */
    Local: 1,       /**< 本地 */
    Network: 2      /**< 网络 */
}


export default class ImageChooseButton extends Component {
    static propTypes = {
        imageWidth: PropTypes.number.isRequired,
        imageHeight: PropTypes.number.isRequired,
        imageSourceType: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        isEditing: PropTypes.bool,
        pickImageHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func
    };

    static defaultProps = {
        imageSourceType: ImageSourceType.Default,
        imageUrl: null,
        isEditing: false,
        pickImageHandle: null,
        deleteImageHandle: null
    };



    render() {
        const { style } = this.props;

        const boxWidth = this.props.imageWidth;
        const boxHeight = this.props.imageHeight;

        let imageSource = null;
        if ( this.props.imageSourceType == ImageSourceType.Local) {
            imageSource = require('./resources/healthCerImage1.png');

        } else if (this.props.imageSourceType == ImageSourceType.Network) {
            imageSource = {uri:this.props.imageUrl};
        } else {
            imageSource = require('./resources/imageLook.png');
        }

        imageSource = require('./resources/healthCerImage1.png');

        const deleteButtonWidth = 22;
        const imageWidth = boxWidth-deleteButtonWidth/2;
        const imageHeight = boxHeight-deleteButtonWidth/2;
        const imageTopRightPadding = deleteButtonWidth/2;

        return (
            <TouchableOpacity
                style={[{width:boxWidth, backgroundColor:'red'}, style]}
                onPress={this.props.pickImageHandle}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >

                    <Image style={{ width: imageWidth, height: imageHeight, marginTop: imageTopRightPadding, marginRight:imageTopRightPadding }}
                           source={imageSource}
                           defaultSource={require('./resources/imageLook.png')}
                    />

                    <DeleteImageButton
                        style={{ position:'absolute', width: deleteButtonWidth, height: deleteButtonWidth}}
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