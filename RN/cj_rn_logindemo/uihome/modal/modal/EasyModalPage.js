import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";

export default class EasyModalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal animationType="fade"
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {
                           alert("Modal has been closed.");
                       }}
                >
                    <View style={{ marginTop: 220, backgroundColor: 'red' }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setState({
                                        modalVisible: !this.state.modalVisible
                                    })
                            }}
                            >
                                <Text>关闭</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text>弹出</Text>
                </TouchableHighlight>
            </View>
        );
    }
}