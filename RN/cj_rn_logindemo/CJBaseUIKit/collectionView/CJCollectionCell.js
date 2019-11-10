// CJCollectionCell:图片控件(含加载动画和其他可操作事件) 的使用示例

/*
import CJCollectionCell  from '../../commonUI/image/LKActionLoadingImage';

                <CJCollectionCell
                    style={{
                        width: 164, height: 108, backgroundColor:'red', borderRadius:10,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 6,
                        borderWidth: 3,
                        borderColor: "cyan",
                    }}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562747201772&di=e5e02e2208aea4acdfd1fa92d4a10d42&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FI9-_x2ze5vz07q7YorAc1Q%3D%3D%2F151715012463950227.jpg'}}

                    clickButtonHandle={()=>{
                        LKToastUtil.showMessage('点击图片');
                    }}
                />
 */

import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, ViewPropTypes, Text, Image} from 'react-native';
import CJImageTextButton  from '../button/CJImageTextButton';
import PropTypes from "prop-types";

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

export default class CJCollectionCell extends Component {
    static propTypes = {
        moduleModel: PropTypes.object.isRequired,    //模型
        defaultSource: PropTypes.number,

        clickButtonHandle: PropTypes.func,
        buttonIndex: PropTypes.number,

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        // 是否需要加载动画(默认需要)
        // 有以下体验不友好的情况需要特殊处理：即从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好，需要设置本属性为false
        needLoadingAnimation: PropTypes.bool,
    };

    static defaultProps = {
        moduleModel: {
            title: "模块1",
            imageSource: require('./resources/icon_search.png'),
        },
        defaultSource: require('./resources/icon_search.png'),

        clickButtonHandle: (buttonIndex)=>{},
        buttonIndex: 0,

        onLoadComplete: (buttonIndex)=>{},

        needLoadingAnimation: true,
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {
        let buttonIndex = this.props.buttonIndex;

        return (
            <CJImageTextButton style={this.props.style}
                               imageStyle={{width: 42, height: 42}}
                               imageSource={this.props.moduleModel.imageSource}
                               title={this.props.moduleModel.title}
                               onPress={()=> {
                                   this.props.clickButtonHandle(buttonIndex);
                               }}
            />
        );
    }
}