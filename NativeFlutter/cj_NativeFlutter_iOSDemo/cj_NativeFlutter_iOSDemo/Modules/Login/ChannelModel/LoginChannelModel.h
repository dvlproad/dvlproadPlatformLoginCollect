//
//  LoginChannelModel.h
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2018/9/18.
//  Copyright © 2018年 dvlproad. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Flutter/Flutter.h>
#import <CJDemoService/DemoUser.h>

@protocol LoginChannelModelDelegate <NSObject>

/// 登录按钮操作
- (void)fc_loginWithUserName:(NSString *)userName password:(NSString *)password;

/// 忘记密码按钮操作
- (void)fc_goForgetPasswordViewController;

@end


@interface LoginChannelModel : NSObject {
    
}
- (void)setChannelForFlutterViewController:(FlutterViewController *)flutterViewController withDelegate:(id<LoginChannelModelDelegate>)delegate;

#pragma mark - Do
/// 测试原生Native调用Flutter
- (void)testCallFlutterMethod;

/// 更新用户名文本框的焦点
- (void)updateUserNameTextFieldAutofocus:(BOOL)should;

/// 执行登录
- (void)loginWithUserName:(NSString *)userName password:(NSString *)password loginSuccess:(void (^)(NSString *successMessage, id user))loginSuccess loginFailure:(void (^)(NSString *errorMessage))loginFailure;


@end
