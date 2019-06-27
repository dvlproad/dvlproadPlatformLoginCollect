//EmptyNetworkPage.js
import React, { Component } from 'react';
import LKEmptyNetwork from "../../commonUI/empty/LKEmptyNetwork";
import LKToastUtil from "../../commonUI/toast/LKToastUtil";

export default class EmptyNetworkPage extends Component {
    // 刷新
    refreshHandle=()=>{
        LKToastUtil.showMessage('点击刷新');
    }

    render() {
        return (
            <LKEmptyNetwork refreshHandle={this.refreshHandle} />
        )
    }
}
