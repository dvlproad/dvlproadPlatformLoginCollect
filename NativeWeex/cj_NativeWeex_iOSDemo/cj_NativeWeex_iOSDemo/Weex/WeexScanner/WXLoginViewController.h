//
//  WXLoginViewController.h
//  TestWeexDemo
//
//  Created by 李超前 on 12/18/18.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <SRWebSocket.h>

NS_ASSUME_NONNULL_BEGIN

@interface WXLoginViewController : UIViewController

@property (nonatomic, strong) NSString *script;
@property (nonatomic, strong) NSURL *url;

@property (nonatomic, strong) NSString *source;

@end

NS_ASSUME_NONNULL_END
