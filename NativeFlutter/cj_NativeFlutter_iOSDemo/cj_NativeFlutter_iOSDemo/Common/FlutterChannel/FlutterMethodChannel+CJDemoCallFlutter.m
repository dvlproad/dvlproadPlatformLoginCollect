//
//  FlutterMethodChannel+CJDemoCallFlutter.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2019/2/27.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import "FlutterMethodChannel+CJDemoCallFlutter.h"

/**< 原生调用Flutter的通道，原生不需传参数给Flutter */
NSString * const CJDemoCallFlutterWithNoneParam = @"CJDemoCallFlutterWithNoneParam";

@implementation FlutterMethodChannel (CJDemoCallFlutter)

/**
 *  原生调用Flutter方法
 *
 *  @param methodName   原生需要调用的Flutter方法
 *  @param nativeParams 原生传给Flutter的参数，可为nil
 */
- (void)cjDemo_callFlutterMethod:(NSString *)methodName withParams:(id)nativeParams {
    if (nativeParams == nil) {
        [self invokeMethod:methodName arguments:nil];
    } else {
        NSDictionary *nativeRequest = @{@"nativeType": @(0),
                                        @"nativeParams": nativeParams
                                        };
        NSData *nativeRequestData = [NSJSONSerialization dataWithJSONObject:nativeRequest options:NSJSONWritingPrettyPrinted error:nil];
        NSString *nativeRequestString = [[NSString alloc] initWithData:nativeRequestData encoding:NSUTF8StringEncoding];
        [self invokeMethod:methodName arguments:nativeRequestString];
    }
}

@end
