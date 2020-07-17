//
//  NSString+CJDemoUserVerification.m
//  CJDemoServiceDemo
//
//  Created by ciyouzen on 11/6/18.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import "NSString+CJDemoUserVerification.h"

@implementation NSString (CJDemoUserVerification)

#pragma mark userName
/// userName 输入性检查(输入时候使用)
- (BOOL)cjdemo_userNameCheckInput {
    NSString *newText = self;
    
    if(newText.length == 0) {   // allow clear, when input
        return YES;
    }
    
    // 用户名:新的整体都是字母或者数字才允许变更
    NSString *letterOrNumberRegexString = @"[0-9a-zA-Z]"; //是字母或者数字的
    NSPredicate *letterOrNumberPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", letterOrNumberRegexString];
    BOOL userNameInputAllow = [letterOrNumberPredicate evaluateWithObject:newText] && self.length <= 20;
    if (userNameInputAllow) { // 允许输入用户名,但不代表此时用户名就是有效,如最低位数要求
        return YES;
    } else {
        return NO;
    }
}

/// userName 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_userNameCheckValid {
    return self.length > 0;
}

#pragma mark password
/// password 输入性检查(输入时候使用)
- (BOOL)cjdemo_passwordCheckInput {
    NSString *newText = self;
    if(newText.length == 0) {   // allow clear, when input
        return YES;
    }
    
    // 密码:新的整体都是字母或者数字才允许变更
    NSString *letterOrNumberRegexString = @"[0-9a-zA-Z]"; //是字母或者数字的
    NSPredicate *letterOrNumberPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", letterOrNumberRegexString];
    BOOL passwordInputAllow = [letterOrNumberPredicate evaluateWithObject:newText];
    if (passwordInputAllow) { // 允许输入密码,但不代表此时密码就是有效,如最低位数要求
        return YES;
    } else {
        return NO;
    }
}

/// password 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_passwordCheckValid {
    return self.length >= 6 && self.length <= 50;
}

#pragma mark phone
/// phone 输入性检查(输入时候使用)
- (BOOL)cjdemo_phoneCheckInput {
    NSString *newText = self;
    
    if(newText.length == 0) {   // allow clear, when input
        return YES;
    }
    
    // 手机号码:新的整体都是数字，且<=11位才允许变更
    NSScanner *scan = [NSScanner scannerWithString:newText];
    int val;
    BOOL isInt = [scan scanInt:&val] && [scan isAtEnd];
    BOOL phoneInputAllow = isInt && newText.length <= 11;
    if (phoneInputAllow) { // 允许输入手机号码,但不代表此时号码就是有效,如完整位数要求
        return YES;
    } else {
        return NO;
    }
}

/// phone 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_phoneCheckValid {
    NSString *phone = self;
    
    //NSString *phoneRegex = @"^[1][34578][0-9]{9}$";
    NSString *phoneRegex = @"^1[0-9]{10}$";
    NSPredicate *phonePredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", phoneRegex];
    BOOL phoneValid = [phonePredicate evaluateWithObject:phone];
    return phoneValid;
}

#pragma mark authCode
/// authCode 输入性检查(输入时候使用)
- (BOOL)cjdemo_authCodeCheckInput {
    NSString *newText = self;
    if (newText.length == 0) {  //输入过程中允许清空操作
        return YES;
    }
    
    // 验证码:新的整体都是数字，且<=4位才允许变更
    NSScanner *scan = [NSScanner scannerWithString:newText];
    int val;
    BOOL isInt = [scan scanInt:&val] && [scan isAtEnd];
    if (isInt && newText.length <= 4) {
        return YES;
    } else {
        return NO;
    }
}

/// authCode 有效性检查(输入有效性通过后)
- (BOOL)cjdemo_authCodeCheckValid {
    return self.length == 4;
}

@end
