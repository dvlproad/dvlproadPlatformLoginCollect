//LKBackButton.js
import React, { Component } from 'react';
import LKImageButton from './LKImageButton';
import PropTypes from "prop-types";

export default class LKBackButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
    };

    render() {
        return <LKImageButton
            imageName={require('./resources/nav_back.png')}
            onClick={this.props.onClick}
        />
    }
}