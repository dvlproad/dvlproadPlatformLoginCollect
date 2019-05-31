//PickImagePage.js
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImageChooseButton  from '../../commonUI/button/ImageChooseButton'

export default class PickImagePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <ImageChooseButton style={{width: 164, height: 108, backgroundColor:'red'}}
                             imageWidth={164}
                             imageHeight={108}
                             imageSourceType={1}
                             imageUrl={'/resources/healthCerImage1.png'}
                />
            </ScrollView>
        );
    }
}