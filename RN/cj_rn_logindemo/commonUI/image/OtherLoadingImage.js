//OtherLoadingImageImage.js
import React, { Component } from "react";
import {Animated, Easing, Image, StyleSheet, View} from "react-native";

var ColorsC6 = 'blue';
var ColorsC7 = 'red';

export default class OtherLoadingImage extends Component {
    // static propTypes = {
    //     style: React.PropTypes.oneOfType([
    //         ViewPropTypes.style,
    //         React.PropTypes.number
    //     ]),
    //     source: React.PropTypes.object.isRequired,
    //     defaultSource: React.PropTypes.oneOfType([
    //         React.PropTypes.object,
    //         React.PropTypes.number
    //     ])
    // }

    constructor (props) {
        super(props);
        this.state = {
            loadStatus: 'pending',
            backgroundColor: new Animated.Value(0)
        }
    }

    componentWillUnmount () {
        if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop()
    }

    /**
     * 开始加载
     */
    onLoadStart () {
        // 配置加载动画
        this.backgroundColorAnimated =
            Animated.sequence([
                Animated.timing(this.state.backgroundColor, {
                    toValue: 1,
                    easing: Easing.ease,
                    duration: 400
                }),
                Animated.timing(this.state.backgroundColor, {
                    toValue: 0,
                    easing: Easing.in,
                    duration: 400
                })
            ])

        this.backgroundColorAnimated.start(() => {
            this.state.loadStatus === 'pending' && this.onLoadStart()
        })
    }

    /**
     * 加载结束
     */
    onLoadEnd () {
        // if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop()
    }

    /**
     * 加载成功
     */
    handleImageLoaded () {
        this.setState({ loadStatus: 'success' })
    }

    /**
     * 加载失败
     * @param {*} error
     */
    handleImageErrored (error) {
        console.log(error)
        this.setState({ loadStatus: 'error' })
    }

    /**
     * 渲染加载中界面
     */
    renderPending () {
        let { style } = this.props;
        return (
            <Animated.View
                style={[style,
                    {
                        position: 'absolute',
                        backgroundColor: this.state.backgroundColor.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#F7F9FB', ColorsC7]
                        })
                    }]}
            />
        )
    }

    /**
     * 渲染加载失败界面
     */
    renderError () {
        let { style, defaultSource } = this.props
        if (typeof style === 'number') {
            style = StyleSheet.flatten(style)
        }
        let iconSize = Math.min(style.height, style.width) / 3;
        return (
            defaultSource
                ? <Image source={defaultSource} style={[{ position: 'absolute' }, style]} />
                : <View style={[{ justifyContent: 'center', backgroundColor: ColorsC7, position: 'absolute', alignItems: 'center' }, style]}>
                    <Image source={require('./resources/imageDefault.png')} style={{width:iconSize.width, height:iconSize.height, backgroundColor:{ColorsC6}}} />
                </View>
        )
    }

    render () {
        let { style, source } = this.props;
        let { loadStatus } = this.state;
        // // 兼容 uri为null的情况
        // if (source.hasOwnProperty('uri') && typeof source['uri'] !== 'string') {
        //     source = { ...source, uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg' }
        // }
        // // 兼容Android无法对空字符串进行处理情况
        // if (Platform.OS === 'android' && source.hasOwnProperty('uri') && !source['uri']) {
        //     source = { ...source, uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg' }
        // }
        return (
            <View style={style}>
                <Image source={source} style={style}
                       onLoadStart={this.onLoadStart.bind(this)}
                       onLoadEnd={this.onLoadEnd.bind(this)}
                       onLoad={this.handleImageLoaded.bind(this)}
                       onError={this.handleImageErrored.bind(this)}
                />
                {loadStatus === 'pending' && this.renderPending()}
                {loadStatus === 'error' && this.renderError()}
            </View>
        )
    }
}