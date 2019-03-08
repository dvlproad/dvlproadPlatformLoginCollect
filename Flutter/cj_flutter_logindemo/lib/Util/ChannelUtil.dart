import 'package:flutter/services.dart';
import 'dart:convert';

// Flutter调用原生时候需要传的参数
Map<String, dynamic> callNativeFlutterParams(dynamic flutterParams) {
  Map<String, dynamic> flutterRequest = {"flutterParams" : flutterParams};
  return flutterRequest;
}

// Flutter调用原生时候需要传的参数
dynamic callNativeNativeResult(Map<String, dynamic> nativeResponse) {
  dynamic nativeResult = nativeResponse["nativeResult"];
  return nativeResult;
}

//dynamic callNativeWithMethodChannel(MethodChannel callNativeMethodChannel, String nativeMethodName, dynamic flutterParams) {
//  Map<String, dynamic> nativeResponse;
//  if (flutterParams == null) {
//    nativeResponse = await callNativeMethodChannel.invokeMethod(nativeMethodName);
//  } else {
//    Map<String, dynamic> paramsForNative = {"flutterParams" : flutterParams};
//    nativeResponse = await callNativeMethodChannel.invokeMethod(nativeMethodName, paramsForNative);
//  }
//  dynamic nativeResult = nativeResponse["nativeResult"];
//  return nativeResult;
//}

//// 原生调用Flutter时候，Flutter从原生哪里得到的返回值
//dynamic nativeParamsFromNativeMethod (MethodCall methodCall) {
//  //Map<String, dynamic> nativeRequest = methodCall.arguments;
//  //dynamic nativeParams = nativeRequest["nativeParams"];
//  String nativeRequestJson = methodCall.arguments;
//  Map<String, dynamic> nativeRequest = json.decode(nativeRequestJson);
//  dynamic nativeParams = nativeRequest["nativeParams"];
//
//  return nativeParams;
//}