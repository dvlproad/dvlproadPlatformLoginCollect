//
//  LoginChannelModel.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2018/9/18.
//  Copyright © 2018年 dvlproad. All rights reserved.
//

#import "LoginChannelModel.h"
#import <CJDemoModuleLogin/CJDemoServiceUserManager+Login.h>

#import "CJDemoMethodChannelFactory.h"

@interface LoginChannelModel () {
    
}
@property (nonatomic, weak) id<LoginChannelModelDelegate> delegate;
@property (nonatomic, strong) FlutterMethodChannel *callFlutterMethodChannel;

@end


@implementation LoginChannelModel

/// 注册MethodChannel
/*
- (void)setChannelForFlutterViewController:(FlutterViewController *)flutterViewController withDelegate:(id<LoginChannelModelDelegate>)delegate {
    _delegate = delegate;
    
    // callFlutterMethodChannel
    NSString *callFlutterMethodChannelName = @"com.dvlproad.ciyouzen/callFlutterLoginMethodChannel";
    FlutterMethodChannel *callFlutterMethodChannel = [FlutterMethodChannel methodChannelWithName:callFlutterMethodChannelName binaryMessenger:flutterViewController];
    self.callFlutterMethodChannel = callFlutterMethodChannel;
    
    // callNativeMethodChannel
    NSString *callNativeMethodChannelName = @"com.dvlproad.ciyouzen/callNativeLoginMethodChannel";
    FlutterMethodChannel *callNativeMethodChannel = [FlutterMethodChannel methodChannelWithName:callNativeMethodChannelName binaryMessenger:flutterViewController];
    [callNativeMethodChannel setMethodCallHandler:^(FlutterMethodCall * _Nonnull call, FlutterResult  _Nonnull result) {
        if ([call.method isEqualToString:@"getDefaultLoginAccountAction"]) {
            //显示上次登录的账号
            NSString *userName = [self getDefaultLoginAccount];
            NSString *password = [self getDefaultPasswordForUserName:userName];
            
            NSDictionary *nativeResponse =
            @{@"nativeType":@(0),
              @"nativeResult":@{@"userName":   userName,
                                @"password":   password
                                }
              };
            result(nativeResponse);
            return;
            
        } else if ([call.method isEqualToString:@"login"]) {
            NSDictionary *flutterParams = call.arguments[@"flutterParams"];
            NSString *userName = flutterParams[@"userName"];
            NSString *password = flutterParams[@"password"];
            if (self.delegate && [self.delegate respondsToSelector:@selector(fc_loginWithUserName:password:)]) {
                [self.delegate fc_loginWithUserName:userName password:password];
            }
            
            return;
            
        } else if ([call.method isEqualToString:@"goForgetPasswordViewController"]) {
            if (self.delegate && [self.delegate respondsToSelector:@selector(fc_goForgetPasswordViewController)]) {
                [self.delegate fc_goForgetPasswordViewController];
            }
            
            return;
        }
        
        result(FlutterMethodNotImplemented);
    }];
}
 //*/

/// 使用CJDemoMethodChannelFactory注册MethodChannel
- (void)setChannelForFlutterViewController:(FlutterViewController *)flutterViewController withDelegate:(id<LoginChannelModelDelegate>)delegate {
    _delegate = delegate;
    
    // callFlutterMethodChannel
    FlutterMethodChannel *callFlutterMethodChannel = [CJDemoMethodChannelFactory callFlutterMethodChannelWithSuffixName:@"callFlutterLoginMethodChannel" binaryMessenger:flutterViewController];
    self.callFlutterMethodChannel = callFlutterMethodChannel;
    
    // callNativeMethodChannel
    [CJDemoMethodChannelFactory callNativeMethodChannelWithSuffixName:@"callNativeLoginMethodChannel" binaryMessenger:flutterViewController nativeHandler:^(NSString *flutterMethodName, NSDictionary *flutterParams, CJDemoFlutterResult  _Nonnull cjDemoFlutterResult) {
        if ([flutterMethodName isEqualToString:@"getDefaultLoginAccountAction"]) {
            //显示上次登录的账号
            NSString *userName = [self getDefaultLoginAccount];
            NSString *password = [self getDefaultPasswordForUserName:userName];
            
            NSDictionary *nativeResult = @{@"userName":   userName,
                                           @"password":   password
                                           };
            cjDemoFlutterResult(nativeResult);
            
        } else if ([flutterMethodName isEqualToString:@"login"]) {
            NSString *userName = flutterParams[@"userName"];
            NSString *password = flutterParams[@"password"];
            if (self.delegate && [self.delegate respondsToSelector:@selector(fc_loginWithUserName:password:)]) {
                [self.delegate fc_loginWithUserName:userName password:password];
            }
            
        } else if ([flutterMethodName isEqualToString:@"goForgetPasswordViewController"]) {
            if (self.delegate && [self.delegate respondsToSelector:@selector(fc_goForgetPasswordViewController)]) {
                [self.delegate fc_goForgetPasswordViewController];
            }
        } else {
            cjDemoFlutterResult(FlutterMethodNotImplemented);
        }
        
    }];
}
//*/

#pragma mark - Get Default
- (NSString *)getDefaultLoginAccount {
    NSString *userName = [[NSUserDefaults standardUserDefaults] stringForKey:@"com.bjlc.login.account"];
    if (!userName) {
        userName = @"";
    }
    return userName;
}

- (NSString *)getDefaultPasswordForUserName:(NSString *)userName {
    return @"";
}

#pragma mark - Do
/// 测试原生Native调用Flutter
- (void)testCallFlutterMethod {
    NSString *randomUsername = [NSString stringWithFormat:@"%ld", random()%100];
    NSDictionary *nativeRequest = @{@"nativeType": @(0),
                                    @"nativeParams": @{
                                            @"randomUsername": randomUsername
                                            }
                                    };
    [self.callFlutterMethodChannel invokeMethod:@"testCallFlutterMethod" arguments:nativeRequest];
}

/// 更新用户名文本框的焦点
- (void)updateUserNameTextFieldAutofocus:(BOOL)should {
    NSDictionary *nativeParams = @{@"userNameAutofocus": @(should)};
    [self.callFlutterMethodChannel cjDemo_callFlutterMethod:@"updateUserNameTextFieldAutofocus" withParams:nativeParams];
}

/// 执行登录
- (void)loginWithUserName:(NSString *)userName password:(NSString *)password loginSuccess:(void (^)(NSString *successMessage, id user))loginSuccess loginFailure:(void (^)(NSString *errorMessage))loginFailure
{
    [[CJDemoServiceUserManager sharedInstance] loginWithUserName:userName password:password success:^(DemoUser *user) {
        NSString *successMessage = NSLocalizedString(@"登录成功", nil);
        if (loginSuccess) {
            loginSuccess(successMessage, user);
        }
        
    } failure:^(BOOL isRequestFailure, NSString *errorMessage) {
        if (loginFailure) {
            loginFailure(errorMessage);
        }
    }];
}





@end
