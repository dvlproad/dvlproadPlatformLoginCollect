//
//  LoginVCFactory.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2018/10/12.
//  Copyright © 2018年 dvlproad. All rights reserved.
//

#import "LoginVCFactory.h"
#import "LoginViewController.h"
#import "ForgetPasswordViewController.h"

@implementation LoginVCFactory

+ (UIViewController *)loginViewController {
    LoginViewController *viewController = [[LoginViewController alloc] init];
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:viewController];
    return navigationController;
}

+ (UIViewController *)forgetPasswordViewController {
    ForgetPasswordViewController *viewController = [[ForgetPasswordViewController alloc] init];
    return viewController;
}

+ (UIViewController *)changePasswordViewController {
    UIViewController *viewController = [[UIViewController alloc] init];
    viewController.title = NSLocalizedString(@"更新密码", nil);
    return viewController;
}

+ (UIViewController *)registerViewController {
    UIViewController *viewController = [[UIViewController alloc] init];
    viewController.title = NSLocalizedString(@"注册", nil);
    viewController.view.backgroundColor = [UIColor whiteColor];
    
    return viewController;
}

@end
