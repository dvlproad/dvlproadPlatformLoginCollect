//HealthCerHomePage.js
import React from 'react';
import {View, ScrollView, Text, StyleSheet, Alert, Dimensions, ActivityIndicator} from 'react-native';

//先定义延时函数
const delay = (timeOut = 8*1000) =>{
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
            reject(new Error('网络超时'));
        },timeOut);
    })
}

//fetch网络请求
const fetchNormalPromise = (method, url) =>{
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: method,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject(new Error('服务器异常'));
            }
        }).then((responseJson) => {
            resolve (responseJson);
        }).catch((err) => {
            reject(new Error(err));
        })
    })
}

//fetch网络请求
const fetchUploadPromise = (method, url, formData) =>{
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: method,
            body:formData
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject(new Error('服务器异常'));
            }
        }).then((responseJson) => {
            resolve (responseJson);
        }).catch((err) => {
            reject(new Error(err));
        })
    })
}

//race任务
const _fetch = (fetchPromise, timeout) => {
    return Promise.race([fetchPromise,delay(timeout)]);
}

//get
const HttpGet = (url,timeout = 8*1000)  =>{
    return _fetch(fetchNormalPromise('Get', url), timeout);
};

//post
const NoramlPost = (url, timeout = 8*1000)  =>{
    return _fetch(fetchNormalPromise('POST', url), timeout);
};

const UploadPost = (url, formData, timeout = 8*1000)  =>{
    return _fetch(fetchUploadPromise('POST', url, formData), timeout);
};


export {HttpGet, NoramlPost, UploadPost}

