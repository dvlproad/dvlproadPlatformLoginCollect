//
//  CJDemoMethodChannelFactory.h
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2019/2/26.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Flutter/Flutter.h>
#import "FlutterMethodChannel+CJDemoCallFlutter.h"
#import "FlutterMethodChannel+CJDemoCallNative.h"

/**< Flutter调用原生的通道，原生不需传结果给Flutter */
extern NSString *const CJDemoNativeMethodNotResult;


/**
 * A method call result callback.
 *
 * Used for submitting a method call result back to a Flutter caller. Also used in
 * the dual capacity for handling a method call result received from Flutter.
 *
 * @param nativeResult The result.
 */
typedef void (^CJDemoFlutterResult)(id _Nullable nativeResult);


@interface CJDemoMethodChannelFactory : NSObject

/**
 *  注册Flutter调用原生的方法callNativeMethodChannel
 *
 *  @param suffixName       suffixName
 *  @param messenger        messenger
 *  @param nativeHandler    nativeHandler
 *  @return Flutter调用原生的方法
 */
+ (FlutterMethodChannel *)callNativeMethodChannelWithSuffixName:(NSString *)suffixName binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger nativeHandler:(void (^)(NSString *flutterMethodName, NSDictionary *flutterParams, CJDemoFlutterResult  _Nonnull cjDemoFlutterResult))nativeHandler;

/// 注册原生调用Flutter的方法 callFlutterMethodChannel，
+ (FlutterMethodChannel *)callFlutterMethodChannelWithSuffixName:(NSString *)suffixName binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger;

@end
