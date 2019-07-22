// luckinservice.js

'use strict';


import LKNetworkUtil, {LKFileUploadState} from "./network/LKNetworkUtil";
// import LKNetworkSimulateUtil from "./network/LKNetworkSimulateUtil";


// import React, { Component } from 'react';
//
// export class Class extends Component  {
//   render() {
//     LKNetworkUtil
//   }
// }

var LKService = {
    LKNetworkUtil,
    // LKNetworkSimulateUtil,
    LKFileUploadState,
};

module.exports = LKService;
