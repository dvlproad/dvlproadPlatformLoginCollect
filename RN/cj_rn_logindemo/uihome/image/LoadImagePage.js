//LoadImagePage.js

import React, { Component } from 'react'
import LoadingImage from '../../commonUI/image/LoadingImage'

export default class LoadImagePage extends Component {
    render() {
        return (
            <LoadingImage
                style={{width: 200, height: 200}}
                source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}}
            />
        )
    }
}
