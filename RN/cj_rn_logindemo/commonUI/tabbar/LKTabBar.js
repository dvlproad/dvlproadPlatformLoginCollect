import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    Platform,
    StyleSheet,
    View,
} from 'react-native';

import LuckinButton from '../button/LKTextImageButton';

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
let tabbarHeight = screenHeight >= 812 ? 83 : 49;

export default class LKTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: props.selectIndex,
        };
    }

    static propTypes = {
        selectIndex: PropTypes.number,
        itemIconType: PropTypes.number,///0:本地图片；1:网络图片  备注：默认本地图片
        itemTitles: PropTypes.array,
        iconNames: PropTypes.array,
        iconUrls: PropTypes.array,
        iconSelectNames: PropTypes.array,
        iconSelectUrls: PropTypes.array,
        itemClick: PropTypes.func,
        barBackgroundColor: PropTypes.string,
        itemDefaultColor: PropTypes.string,
        itemSelectColor: PropTypes.string,
        renderBadgeValue: PropTypes.func,
    }

    static defaultProps = {
        selectIndex: 0,
        itemIconType: 0,///0:本地图片；1:网络图片  备注：默认本地图片
        itemTitles: null,
        iconNames: null,
        iconUrls: null,
        iconSelectNames: null,
        iconSelectUrls: null,
        itemClick: null,
        barBackgroundColor: '#ffffff',
        itemDefaultColor: '#999999',
        itemSelectColor: '#5168F0',
        renderBadgeValue: null,
    }


    render() {
        return (<View style={[styles.tabBarBg, { backgroundColor: this.props.barBackgroundColor }]}>
            <View style={{ height: 1, backgroundColor: '#dedede' }} />
            <View style={[styles.tabBarBox, { height: 49 }]}>
                {
                    this.renderItems()
                }
            </View>
        </View>);
    }

    renderItems() {
        let items = [];
        let imageArray = this.props.itemIconType ? this.props.iconUrls : this.props.iconNames;
        let selectImageArray = this.props.itemIconType ? this.props.iconSelectUrls : this.props.iconSelectNames;

        for (let i = 0; i < this.props.itemTitles.length; i++) {
            let title = this.props.itemTitles[i];
            let imageName = imageArray ? imageArray[i] : null;
            let selectImageName = selectImageArray ? selectImageArray[i] : null;

            if (this.props.renderBadgeValue) {
                items.push(<View style={{ justifyContent: 'space-around' }} key={i}>
                    <LuckinButton
                        title={title}
                        textColor={this.props.itemDefaultColor}
                        selectColor={this.props.itemSelectColor}
                        fontSize={12}
                        mode={3}
                        imageType={this.props.itemIconType}
                        imageName={imageName}
                        selectImageName={selectImageName}
                        onClick={(selectIndex) => {
                            this.setState({
                                selectIndex: selectIndex,
                            });
                            this.props.itemClick(selectIndex);
                        }}
                        selected={!(this.state.selectIndex !== i)}
                        tag={i}
                    />
                    {
                        this.props.renderBadgeValue(i)
                    }
                </View>)
            } else {
                items.push(<LuckinButton key={i}
                    title={title}
                    textColor={this.props.itemDefaultColor}
                    selectColor={this.props.itemSelectColor}
                    fontSize={12}
                    mode={3}
                    imageType={this.props.itemIconType}
                    imageName={imageName}
                    selectImageName={selectImageName}
                    onClick={(selectIndex) => {
                        this.setState({
                            selectIndex: selectIndex,
                        });
                        this.props.itemClick(selectIndex);
                    }}
                    selected={!(this.state.selectIndex !== i)}
                    tag={i}
                />)
            }
        }
        return items;
    }
}


const styles = StyleSheet.create({
    tabBarBg: {
        height: tabbarHeight,
    },
    tabBarBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: screenWidth,
        paddingHorizontal: 20,
    },
});