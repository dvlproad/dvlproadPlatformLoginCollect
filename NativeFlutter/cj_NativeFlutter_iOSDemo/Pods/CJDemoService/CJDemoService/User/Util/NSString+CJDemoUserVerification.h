//
//  NSString+CJDemoUserVerification.h
//  CJDemoServiceDemo
//
//  Created by ciyouzen on 11/6/18.
//  Copyright © 2018 dvlproad. All rights reserved.
//
//  输入时候使用：(输入时候使用，只做输入文字输入禁止、长度限制；不做长度截取)

#import <Foundation/Foundation.h>

@interface NSString (CJDemoUserVerification)

#pragma mark userName
/// userName 输入性检查(输入时候使用)
- (BOOL)cjdemo_userNameCheckInput;
/// userName 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_userNameCheckValid;

#pragma mark password
/// password 输入性检查(输入时候使用)
- (BOOL)cjdemo_passwordCheckInput;
/// password 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_passwordCheckValid;

#pragma mark phone
/// phone 输入性检查(输入时候使用)
- (BOOL)cjdemo_phoneCheckInput;
/// phone 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_phoneCheckValid;

#pragma mark authCode
/// authCode 输入性检查(输入时候使用)
- (BOOL)cjdemo_authCodeCheckInput;
/// authCode 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_authCodeCheckValid;

@end
