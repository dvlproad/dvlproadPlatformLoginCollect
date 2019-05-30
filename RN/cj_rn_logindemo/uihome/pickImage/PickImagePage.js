//PickImagePage.js
import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import { ImageButton }  from '../../commonUI/pickImage/cjdemoPickerImageCell'

export default class PickImagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <ImageButton style={{width: 164, height: 108, backgroundColor:'red'}}
                             imageSourceType={1}
                             imageUrl={'/resources/healthCerImage1.png'}
                />
            </ScrollView>
        );
    }
}