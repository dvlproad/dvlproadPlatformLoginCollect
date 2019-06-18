import React, { Component } from 'react';
import { Image } from 'react-native';

export default class LKTabBarItem extends Component {
    render() {
        return (
            <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
            />
        )
    }

}