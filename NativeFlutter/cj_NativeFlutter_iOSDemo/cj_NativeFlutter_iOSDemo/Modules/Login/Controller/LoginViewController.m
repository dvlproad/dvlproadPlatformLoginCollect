//
//  LoginViewController.m
//  cj_NativeFlutter_iOSDemo
//
//  Created by ciyouzen on 12/28/18.
//  Copyright © 2018 dvlproad. All rights reserved.
//

#import "LoginViewController.h"
#import <CJBaseUIKit/UIColor+CJHex.h>
#import <CJBaseUIKit/UINavigationBar+CJChangeBG.h>
#import "LoginChannelModel.h"
#import "LoginRouter.h"

@interface LoginViewController () <UITextFieldDelegate, LoginChannelModelDelegate> {
    
}
@property (nonatomic, strong) UIButton *changeEnvironmentButton;/**< 改变环境按钮 */
@property (nonatomic, strong) LoginChannelModel *loginChannelModel;
@property (nonatomic, strong) FlutterViewController *flutterViewController;

@end

@implementation LoginViewController

#pragma mark - LifeCycle
- (void)dealloc {
    NSLog(@"%@ dealloc", NSStringFromClass([self class]));
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    self.navigationController.navigationBar.translucent = NO;
    [self.navigationController.navigationBar cj_resetBackgroundColor];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.translucent = YES;
    [self.navigationController.navigationBar cj_hideUnderline:YES];
    [self.navigationController.navigationBar cj_setBackgroundColor:[UIColor clearColor]];
    self.navigationItem.title = @"";
    
//    [self setupViewsByFlutter];
    
    [self.loginChannelModel updateUserNameTextFieldAutofocus:NO];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        BOOL autofocus = YES;
        [self.loginChannelModel updateUserNameTextFieldAutofocus:autofocus];
    });
    
    
#ifdef CJLogin_TEST_APP
    ChangeEnvironmentViewModel *changeEnvironmentViewModel = [[ChangeEnvironmentViewModel alloc] init];
    changeEnvironmentViewModel.changeEnvironmentButton = self.changeEnvironmentButton;
    self.changeEnvironmentViewModel = changeEnvironmentViewModel;
#endif
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = NSLocalizedString(@"登录", nil);
    
    [self setupViewsByFlutter];
    
    // 测试原生Native调用Flutter
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self.loginChannelModel testCallFlutterMethod];
    });
//    NSString *eventChannelName = @"com.dvlproad.ciyouzen/loginEventChannel";
//    FlutterEventChannel *eventChannel = [FlutterEventChannel eventChannelWithName:eventChannelName binaryMessenger:self.flutterViewController];
//    [eventChannel setStreamHandler:self];
    
    //loginChannelModel
    LoginChannelModel *loginChannelModel = [[LoginChannelModel alloc] init];
    [loginChannelModel setChannelForFlutterViewController:self.flutterViewController withDelegate:self];
    self.loginChannelModel = loginChannelModel;
}

#pragma mark - LoginChannelModelDelegate
/// 登录按钮操作
- (void)fc_loginWithUserName:(NSString *)userName password:(NSString *)password {
    [self loginButtonActionWithUserName:userName password:password];
}

/// 忘记密码按钮操作
- (void)fc_goForgetPasswordViewController {
    [self findPasswordButtonAction];
}

#pragma mark - FlutterStreamHandler
// 这个onListen是Flutter端开始监听这个channel时的回调，第二个参数 EventSink是用来传数据的载体。
- (FlutterError *)onListenWithArguments:(id)arguments eventSink:(FlutterEventSink)events {
    NSLog(@"onListenWithArguments = %@", arguments);
    // arguments flutter给native的参数
    // 回调给flutter， 建议使用实例指向，因为该block可以使用多次
    if (events == nil) {
        return nil;
    }
    
    if ([arguments isKindOfClass:[NSString class]]) {
        NSString *methodName = (NSString *)arguments;
        if ([methodName isEqualToString:@"UserNameAutofocus"]) {
            BOOL autofocus = YES;
            NSString *userNameAutofocusString = autofocus == YES ? @"YES" : @"NO";
            events(userNameAutofocusString);
        } else {
            events(@"我是标题");
        }
    }
    return nil;
}

- (FlutterError *)onCancelWithArguments:(id)arguments {
    return nil;
}

#pragma mark - ButtonEvent
- (void)loginButtonActionWithUserName:(NSString *)userName password:(NSString *)password {
    [DemoProgressHUD show];
    [self.loginChannelModel loginWithUserName:userName password:password loginSuccess:^(NSString *successMessage, DemoUser *user) {
        [DemoProgressHUD dismiss];
        [DemoToast showMessage:successMessage];
        
        if (user.isDefaultPwd) {
            [LoginRouter goChangePasswordViewControllerFrom:self];
        } else {
//            [LoginRouter goMainViewController];
        }
        
    } loginFailure:^(NSString *errorMessage) {
        [DemoProgressHUD dismiss];
        [DemoToast showErrorMessage:errorMessage];
    }];
}

- (void)findPasswordButtonAction {
    [LoginRouter goFindPasswordViewControllerFrom:self];
}

- (void)registerButtonAction {
    [LoginRouter goRegisterViewControllerFrom:self];
}


#pragma mark - SetupViews & Lazy
- (void)setupViewsByFlutter {
    self.navigationController.navigationBarHidden = YES;
    
    FlutterViewController *flutterViewController = [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
    [flutterViewController setInitialRoute:@"LoginPage"];
    self.flutterViewController = flutterViewController;
    
    [self addChildViewController:flutterViewController];
    [self.view addSubview:flutterViewController.view];
    flutterViewController.view.frame = self.view.bounds;
    [flutterViewController didMoveToParentViewController:self];
    
    [self addEnvironmentButton];
}

- (void)addEnvironmentButton {
#ifdef CJLogin_TEST_APP
    CGFloat topHeight = 0;
    CGRect statusBarFrame = [[UIApplication sharedApplication] statusBarFrame];
    CGFloat statusBarHeight = CGRectGetHeight(statusBarFrame);
    if (self.navigationController) {
        CGRect navigationBarFrame = self.navigationController.navigationBar.frame;
        CGFloat navigationBarHeight = CGRectGetHeight(navigationBarFrame);
        topHeight = statusBarHeight + navigationBarHeight;
    } else {
        topHeight = statusBarHeight;
    }
    [self.view addSubview:self.changeEnvironmentButton];
    [self.changeEnvironmentButton mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(self.view).mas_offset(topHeight);
        make.height.mas_equalTo(44);
        make.right.mas_equalTo(self.view).mas_offset(-10);
        make.left.mas_equalTo(self.view).mas_offset(10);
    }];
#endif
}

- (UIButton *)changeEnvironmentButton {
    if (_changeEnvironmentButton == nil) {
        _changeEnvironmentButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [_changeEnvironmentButton setTitle:NSLocalizedString(@"改变app环境", nil) forState:UIControlStateNormal];
        [_changeEnvironmentButton setTitleColor:CJColorFromHexString(@"#f5b63c") forState:UIControlStateNormal];
    }
    return _changeEnvironmentButton;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
