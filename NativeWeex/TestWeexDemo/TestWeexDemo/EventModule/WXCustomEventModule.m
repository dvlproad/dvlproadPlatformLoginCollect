//
//  WXCustomEventModule.m
//  TestWeexDemo
//
//  Created by 李超前 on 12/18/18.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import "WXCustomEventModule.h"

@implementation WXCustomEventModule

WX_EXPORT_METHOD(@selector(showParams:))

- (void)showParams:(NSString *)inputParam {
    if (!inputParam) {
        return;
    }
    NSLog(@"%@", inputParam);
}

@end
