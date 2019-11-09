import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const viewPropTypes = ViewPropTypes || View.propTypes;

export default class CJTextImageButton extends Component {
    constructor(props) {
        super(props);
        if (!props.selectColor) {
            props.selectColor = props.textColor;
        }
    }
    static propTypes = {
        title: PropTypes.string,
        textColor: PropTypes.string,
        selectColor: PropTypes.string,
        fontSize: PropTypes.number,
        imageType: PropTypes.number,/**0：本地图片名称， 1：网络图片url, 默认：本地图片名称 */
        /*mode===1:默认图片在左边，文字在右边*/
        /*2:默认图片在右边，文字在左边*/
        /*3:默认图片在上边，文字在下边*/
        /*4:默认图片在下边，文字在上边*/
        mode: PropTypes.number,
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        tag: PropTypes.number,
        style: viewPropTypes.style
    }
    static defaultPros = {
        title: '',
        textColor: '#999999',
        selectColor: null,
        fontSize: 15,
        imageType: 0,/**0：本地图片名称， 1：网络图片url, 默认：本地图片名称 */
        imageName: null,
        selectImageName: null,
        /*mode===1:默认图片在左边，文字在右边*/
        /*2:默认图片在右边，文字在左边*/
        /*3:默认图片在上边，文字在下边*/
        /*4:默认图片在下边，文字在上边*/
        mode: 1,
        onClick: null,
        selected: false,
        tag: 0
    };

    render() {
        return (<View style={styles.box}>
            <TouchableOpacity
                style={this.props.style}
                activeOpacity={0.4}
                onPress={() => {
                    if (this.props.onClick) {
                        this.props.onClick(this.props.tag);
                    }
                }}
            >
                {
                    this.props.mode === 1 || this.props.mode === 3 ? <View style={[styles.box, this.props.mode < 3 ? styles.modeHorizontal : styles.modeVertical]}>
                        {
                            this.renderImage()
                        }
                        {
                            this.renderText()
                        }

                    </View> : <View style={[styles.box, this.props.mode < 3 ? styles.modeHorizontal : styles.modeVertical]}>
                            {
                                this.renderText()
                            }
                            {
                                this.renderImage()
                            }

                        </View>
                }
            </TouchableOpacity>
        </View>);
    }

    renderImage() {
        return this.props.imageName ? (
            this.props.imageType ? <Image style={styles.imageBox} source={{ uri: this.props.selected ? this.props.imageName : this.props.selectImageName }} /> :
                <Image style={styles.imageBox} source={this.props.selected ? this.props.selectImageName : this.props.imageName} />) : null
    }
    renderText() {
        return this.props.title && this.props.title.length > 0 ? <Text style={[styles.textStyle, { fontSize: this.props.fontSize, color: this.props.selected ? this.props.selectColor : this.props.textColor }]}>
            {this.props.title}
        </Text> : null
    }

}



const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeHorizontal: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    modeVertical: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: '#333333',
        textAlign: 'center',
    },
    imageBox: {
        marginHorizontal: 8,
        marginVertical: 2,
    }
});