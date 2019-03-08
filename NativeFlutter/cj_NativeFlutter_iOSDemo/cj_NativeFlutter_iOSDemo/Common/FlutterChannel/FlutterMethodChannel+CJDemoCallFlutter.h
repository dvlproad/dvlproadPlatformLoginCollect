//
//  FlutterMethodChannel+CJDemoCallFlutter.h
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2019/2/27.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import <Flutter/Flutter.h>

/**< 原生调用Flutter的通道，原生不需传参数给Flutter */
extern NSString *const CJDemoCallFlutterWithNoneParam;

@interface FlutterMethodChannel (CJDemoCallFlutter)

/**
 *  原生调用Flutter方法
 *
 *  @param methodName   原生需要调用的Flutter方法
 *  @param nativeParams 原生传给Flutter的参数，可为nil
 */
- (void)cjDemo_callFlutterMethod:(NSString *)methodName withParams:(id)nativeParams;

@end
