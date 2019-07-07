import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Dimensions } from "react-native";

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
                    <View
                        style={{
                            marginTop: 10,
                            backgroundColor: 'red',
                            height: Dimensions.get('window').height-240,
                        }}
                    >
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
                        this.setState({
                            modalVisible: true,
                        });
                    }}
                >
                    <Text>弹出</Text>
                </TouchableHighlight>
            </View>
        );
    }
}