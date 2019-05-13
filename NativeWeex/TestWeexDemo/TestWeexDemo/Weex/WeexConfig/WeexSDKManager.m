//
//  WeexSDKManager.m
//  WeexDemo
//
//  Created by yangshengtao on 16/11/14.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import "WeexSDKManager.h"
#import <WeexSDK/WeexSDK.h>
#import "WXDemoViewController.h"
#import "WXImgLoaderDefaultImpl.h"

#import "WXLoginViewController.h"


@implementation WeexSDKManager

+ (void)setup
{
    NSString *resourceUrl = [[NSBundle bundleForClass:self] resourceURL].absoluteString;
    NSString *entryUrl = @"bundlejs/login.js"; //TODO:测试专用
    NSString *Url = [NSString stringWithFormat:@"%@%@", resourceUrl, entryUrl];
    NSURL *URL = [NSURL URLWithString:Url];
    
    [self initWeexSDK];
    [self loadCustomContainWithScannerWithUrl:URL];
}

+ (void)initWeexSDK
{
    [WXAppConfiguration setAppGroup:@"AliApp"];
    [WXAppConfiguration setAppName:@"WeexDemo"];
    [WXAppConfiguration setAppVersion:@"1.8.3"];
    [WXAppConfiguration setExternalUserAgent:@"ExternalUA"];
    
    [WXSDKEngine initSDKEnvironment];
    
    [WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
    
#ifdef DEBUG
    [WXLog setLogLevel:WXLogLevelLog];
#endif
}

+ (void)loadCustomContainWithScannerWithUrl:(NSURL *)url
{
//    UIViewController *demo = [[WXDemoViewController alloc] init];
//    ((WXDemoViewController *)demo).url = url;
    WXLoginViewController *demo = [[WXLoginViewController alloc] init];
    demo.url = url;
    
    [[UIApplication sharedApplication] delegate].window.rootViewController = [[WXRootViewController alloc] initWithRootViewController:demo];
}

@end
