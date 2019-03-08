//
//  LoginRouter.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 2018/9/18.
//  Copyright © 2018年 dvlproad. All rights reserved.
//

#import "LoginRouter.h"
#import "LoginVCFactory.h"
//#import "MainVCFactory.h"

@implementation LoginRouter

#pragma mark - 界面跳转
///进入主页
+ (void)goMainViewController {
//    UIViewController *mainViewController = [MainVCFactory mainRootViewController];
//    [UIApplication sharedApplication].delegate.window.rootViewController = mainViewController;
}

///进入"忘记密码"界面
+ (void)goFindPasswordViewControllerFrom:(UIViewController *)fromViewController {
    UIViewController *viewController = [LoginVCFactory forgetPasswordViewController];
    [fromViewController.navigationController pushViewController:viewController animated:YES];
}

///进入"修改密码"界面(初始密码时候需要)
+ (void)goChangePasswordViewControllerFrom:(UIViewController *)fromViewController {
    UIViewController *viewController = [LoginVCFactory changePasswordViewController];
    [fromViewController.navigationController pushViewController:viewController animated:YES];
}

///进入"注册"界面
+ (void)goRegisterViewControllerFrom:(UIViewController *)fromViewController {
    UIViewController *viewController = [LoginVCFactory registerViewController];
    [fromViewController.navigationController pushViewController:viewController animated:YES];
}


@end
