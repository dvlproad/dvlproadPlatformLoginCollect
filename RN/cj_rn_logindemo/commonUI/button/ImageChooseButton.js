//ImageChooseButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, Image, Text, TouchableOpacity} from "react-native";

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
        // imageSource: PropTypes.object.isRequired,

        clickButtonHandle: PropTypes.func,
        deleteImageHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        isEditing: PropTypes.bool,
        isAddIcon: PropTypes.bool,   //是否是添加按钮，编辑状态时候，添加按钮，不显示右上角的删除
    };

    static defaultProps = {
        imageWidth: 0,
        imageHeight: 0,
        imageSource: require('./resources/healthCerImage1.png'),

        clickButtonHandle: (buttonIndex)=>{},
        deleteImageHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        isEditing: false,
        isAddIcon: false,
    };



    render() {
        const { style } = this.props;

        const boxWidth = this.props.imageWidth;
        const boxHeight = this.props.imageHeight;

        let imageSource = this.props.imageSource;

        const deleteButtonWidth = 22;
        const imageWidth = boxWidth-deleteButtonWidth/2;
        const imageHeight = boxHeight-deleteButtonWidth/2;
        const imageTopRightPadding = deleteButtonWidth/2;

        let buttonIndex = this.props.buttonIndex;

        let deleteImageButton = this.props.isEditing && !this.props.isAddIcon ? <DeleteImageButton
            style={{ position:'absolute', width: deleteButtonWidth, height: deleteButtonWidth}}
            deleteImageHandle={()=> {
                this.props.deleteImageHandle(buttonIndex);
            }}
        /> : null;

        let imageText = 'ButtonIndex:' + buttonIndex;

        return (
            <TouchableOpacity
                style={[{width:boxWidth, backgroundColor:'red'}, style]}
                onPress={()=> {
                    this.props.clickButtonHandle(buttonIndex);
                }}
            >
                <View style={{flex:1, flexDirection:"row-reverse"}} >

                    <Image style={{width: imageWidth, height: imageHeight, marginTop: imageTopRightPadding, marginRight:imageTopRightPadding }}
                           source={imageSource}
                           defaultSource={require('./resources/imageLook.png')}
                    />

                    <Text style={{
                        backgroundColor: 'rgba(0,0,255,0.3)',
                        position:'absolute',
                        width:boxWidth,
                        height:boxHeight,
                        lineHeight: boxHeight,
                        textAlign: 'center',
                        fontSize: 26,
                        color: '#99ff22'
                    }}
                    >
                        {imageText}
                    </Text>

                    {deleteImageButton}
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