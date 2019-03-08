//
//  CJDemoMethodChannelFactory.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2019/2/26.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import "CJDemoMethodChannelFactory.h"

/**< Flutter调用原生的通道，原生不需传结果给Flutter */
NSString * const CJDemoNativeMethodNotResult = @"CJDemoNativeMethodNotResult";

@implementation CJDemoMethodChannelFactory


/**
 *  注册Flutter调用原生的方法callNativeMethodChannel
 *
 *  @param suffixName       suffixName
 *  @param messenger        messenger
 *  @param nativeHandler    nativeHandler
 *  @return Flutter调用原生的方法
 */
+ (FlutterMethodChannel *)callNativeMethodChannelWithSuffixName:(NSString *)suffixName binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger nativeHandler:(void (^)(NSString *flutterMethodName, NSDictionary *flutterParams, CJDemoFlutterResult  _Nonnull cjDemoFlutterResult))nativeHandler
{
    // callNativeMethodChannel
    NSString *callNativeMethodChannelName = [@"com.dvlproad.ciyouzen/" stringByAppendingString:suffixName];
    FlutterMethodChannel *callNativeMethodChannel = [FlutterMethodChannel methodChannelWithName:callNativeMethodChannelName binaryMessenger:messenger];
    [callNativeMethodChannel setMethodCallHandler:^(FlutterMethodCall * _Nonnull call, FlutterResult  _Nonnull result) {
        NSString *flutterMethodName = call.method;
        NSDictionary *flutterParams = call.arguments[@"flutterParams"];
        
        NSAssert(nativeHandler, @"nativeHandler不能为空");
        CJDemoFlutterResult cjDemoFlutterResult = ^(id _Nullable nativeResult) {
            if (nativeResult == nil) {
                return;
            }
            
            if (nativeResult == FlutterMethodNotImplemented) {
                result(FlutterMethodNotImplemented);
            } else {
                NSDictionary *nativeResponse = @{@"nativeType":@(0),
                                                 @"nativeResult":nativeResult
                                                 };
                result(nativeResponse);
            }
            
        };
        nativeHandler(flutterMethodName, flutterParams, cjDemoFlutterResult);
        
        return;
    }];
    
    
    return callNativeMethodChannel;
}

/// 注册原生调用Flutter的方法 callFlutterMethodChannel，
+ (FlutterMethodChannel *)callFlutterMethodChannelWithSuffixName:(NSString *)suffixName binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger {
    NSString *callFlutterMethodChannelName = [@"com.dvlproad.ciyouzen/" stringByAppendingString:suffixName];
    FlutterMethodChannel *callFlutterMethodChannel = [FlutterMethodChannel methodChannelWithName:callFlutterMethodChannelName binaryMessenger:messenger];
    return callFlutterMethodChannel;
}

@end
