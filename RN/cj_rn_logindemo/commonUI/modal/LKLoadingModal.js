import React, { Component } from 'react';
import {Modal, Image, Text, View} from "react-native";

export class LKLoadingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            visible: false,
        };
    }

    render() {
        return (
            <Modal style={styles.container}
                   transparent={true}
                   visible={this.state.visible}
            >
                <View style={styles.mask}>
                </View>
                <View style={styles.content}>
                    <View style={[styles.imageBox, { backgroundColor: '#FFF1C1', borderRadius: 24 }]}>
                        <Image style={styles.imageBox} source={require('./resources/luckin_loading.gif')} />
                    </View>
                    {
                        this.state.message ? <Text style={styles.tipMessage}>{this.state.message}</Text> : null
                    }
                </View>
            </Modal >
        );
    }
    /**
     *显示loading
     * @param {消息*} [message=null]
     * @memberof LuckinLoadingModal
     */
    show(message = null) {
        this.setState({
            message: message,
            visible: true,
        })
    }
    /**
     *隐藏
     *
     * @memberof LuckinLoadingModal
     */
    dismiss() {
        this.setState({
            message: null,
            visible: false,
        })
    }
}
