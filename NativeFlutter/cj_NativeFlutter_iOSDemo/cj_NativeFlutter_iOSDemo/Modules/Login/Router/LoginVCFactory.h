//
//  LoginVCFactory.h
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2018/10/12.
//  Copyright © 2018年 dvlproad. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface LoginVCFactory : NSObject

///登录页
+ (UIViewController *)loginViewController;

///忘记密码页
+ (UIViewController *)forgetPasswordViewController;

///修改密码页(初始密码时候需要)
+ (UIViewController *)changePasswordViewController;

///注册页
+ (UIViewController *)registerViewController;

@end
