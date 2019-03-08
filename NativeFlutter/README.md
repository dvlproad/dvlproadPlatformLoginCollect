

# Flutter通道定义规范

平台类型platformType

| 序号 | platformType | 代表    |
| ---- | ------------ | ------- |
| 1    | 0            | iOS     |
| 2    | 1            | Android |



Flutter调用原生的时候，接口规范如下：

| 方法参数(Flutter传递给原生的)         | 方法参数示例                                                 | 方法返回值(原生返回给Flutter的)                              | 方法返回值示例                                               |
| ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 参数名参数含义flutterParams实体类json | { "flutterParams": { "userName": "userName", "password": "password" } } | 参数名参数含义 nativeTypeplatformType nativeResult实体类json | { "nativeType": 0, "nativeResult": { "userName": "userName", "password": "password" } } |

 

原生调用Flutter的时候，接口规范如下：

| 方法参数(原生传递给Flutter)                                | 方法参数示例                                                 | 方法返回值(Flutter返回给原生的)        | 方法返回值示例                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------ |
| 参数名参数含义nativeTypeplatformTypenativeParams实体类json | { "nativeType": 0, "nativeParams": { "userName": "userName", "password": "password" } } | 参数名参数含义 flutterResult实体类json | { "flutterResult": { "userName": "userName", "password": "password" } } |

 

 

# 一、登录页

## 1、Flutter调用原生

MethodChannelName：com.dvlproad.ciyouzen/callFlutterLoginMethodChannel

| 序号 | 操作               | 方法名                         | 方法参数                                                     | 方法参数示例                                                 | 方法返回值                                                   | 方法返回值示例                                               |
| ---- | ------------------ | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | 获取上次登录的账号 | getDefaultLoginAccountAction   | 无                                                           | 无                                                           | 参数名参数类型参数含义usernameString用户名passwordString密码 | { "nativeType": 0, "nativeResult": { "userName": "userName", "password": "password" } } |
| 2    | 点击“登录”         | login                          | 参数名参数类型参数含义usernameString用户名passwordString密码 | { "flutterParams": { "userName": "userName", "password": "password" } } | 无                                                           | 无                                                           |
| 3    | 点击“忘记密码”     | goForgetPasswordViewController | 无                                                           | 无                                                           | 无                                                           | 无                                                           |

 

## 2、原生调用Flutter

MethodChannelName：com.dvlproad.ciyouzen/callNativeLoginMethodChannell

| 序号 | 操作                                   | 方法名                           | 方法参数                                            | 方法参数示例                                                 | 方法返回值 | 方法返回值示例 |
| ---- | -------------------------------------- | -------------------------------- | --------------------------------------------------- | ------------------------------------------------------------ | ---------- | -------------- |
| 1    | 更新“用户名”文本框的焦点(是否自动聚焦) | updateUserNameTextFieldAutofocus | 参数名参数类型参数含义userNameAutofocusBOOL是否聚焦 | { "nativeType": 0, "nativeParams": { "userNameAutofocus": YES } } | 无         | 无             |

 

