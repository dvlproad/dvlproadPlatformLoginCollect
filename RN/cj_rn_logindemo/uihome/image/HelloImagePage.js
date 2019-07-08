//ActionLoadingImagePage.js
import React, { Component } from 'react';
import {ScrollView, Image} from 'react-native';

export default class HelloImagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Image
                    style={{
                        backgroundColor: 'cyan',
                        paddingVertical: 20,
                        width: 164,
                        height: 108,
                    }}
                    source={require('./resources/pickImage_blue.png')}
                    // resizeMode={'stretch'}
                />

                <Image
                    style={{
                        backgroundColor: 'cyan',
                        paddingVertical: 20,
                        width: 164,
                        height: 108,
                    }}
                    source={require('./resources/pickImage_blue.png')}
                    resizeMode={'stretch'}
                />

            </ScrollView>
        );
    }
}