import 'package:flutter/services.dart';
import 'dart:convert';

// 原生调用Flutter时候，Flutter从原生哪里得到的返回值
dynamic nativeParamsFromNativeMethod (MethodCall methodCall) {
  //Map<String, dynamic> nativeRequest = methodCall.arguments;
  //dynamic nativeParams = nativeRequest["nativeParams"];
  String nativeRequestJson = methodCall.arguments;
  Map<String, dynamic> nativeRequest = json.decode(nativeRequestJson);
  dynamic nativeParams = nativeRequest["nativeParams"];

  return nativeParams;
}


// 原生调用Flutter时候，Flutter从原生哪里得到的返回模型
class NativeCallChannelModel {
  final String nativeMethod;
  final int nativeType;
  final dynamic nativeParams;

  NativeCallChannelModel({
    this.nativeMethod,
    this.nativeType,
    this.nativeParams
  });

  factory NativeCallChannelModel.fromMethod(MethodCall methodCall) {
    String nativeMethod = methodCall.method;

    // 如果是返回字典
    //Map<String, dynamic> nativeRequest = methodCall.arguments;
    //我们是返回json字符串
    String nativeRequestJson = methodCall.arguments;
    Map<String, dynamic> nativeRequest = json.decode(nativeRequestJson);
    int nativeType = nativeRequest["nativeType"];
    dynamic nativeParams = nativeRequest["nativeParams"];

    return NativeCallChannelModel(
        nativeMethod: nativeMethod,
        nativeType: nativeType,
        nativeParams: nativeParams
    );
  }
}


//// 原生调用Flutter时候，Flutter从原生哪里得到的返回模型
//class NativeCallChannelModel {
//  String nativeMethod;
//  NativeCallChannelReslutModel nativeRequestModel;
//
//  NativeCallChannelModel({
//    this.nativeMethod,
//    this.nativeRequestModel
//  });
//
//  factory NativeCallChannelModel.fromMethod(MethodCall methodCall) {
//    String nativeMethod = methodCall.method;
//
//    // 如果是返回字典
//    //Map<String, dynamic> nativeRequest = methodCall.arguments;
//    //我们是返回json字符串
//    String nativeRequestJson = methodCall.arguments;
//    NativeCallChannelReslutModel nativeRequestModel = NativeCallChannelReslutModel.fromJson(nativeRequestJson);
//
//    return NativeCallChannelModel(
//        nativeMethod: nativeMethod,
//        nativeRequestModel: nativeRequestModel,
//    );
//  }
//}
//
//// 原生调用Flutter时候，Flutter从原生哪里得到的返回模型
//class NativeCallChannelReslutModel {
//  int nativeType;
//  dynamic nativeParams;
//
//  NativeCallChannelReslutModel({
//    this.nativeType,
//    this.nativeParams
//  });
//
//  factory NativeCallChannelReslutModel.fromJson(String nativeRequestJson) {
//    Map<String, dynamic> nativeRequest = json.decode(nativeRequestJson);
//    int nativeType = nativeRequest["nativeType"];
//    dynamic nativeParams = nativeRequest["nativeParams"];
//
//    return NativeCallChannelReslutModel(
//        nativeType: nativeType,
//        nativeParams: nativeParams
//    );
//  }
//}