import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../CommonUI/TextField/ForgetPasswordTextFieldRowWidgetFactory.dart';
import '../../CommonUI/TextField/CQTextEditingController.dart';

class ForgetPasswordPage extends StatefulWidget {
  ForgetPasswordPage({Key key, this.title, this.username}) : super(key: key);

  final String title;
  final String username;

  @override
  _ForgetPasswordPageState createState() => new _ForgetPasswordPageState();
}

class _ForgetPasswordPageState extends State<ForgetPasswordPage> {
  bool userNameValid = false;
  bool phoneValid = false;
  bool codeValid = false;
  bool newPasswordValid = false;
  bool submitValid = false;

  String userName = "";
  String phone = "";
  String code = "";
  String newPassword1 = "";
  String newPassword2 = "";

  //定义一个controller
  TextEditingController _usernameController = new TextEditingController();
  TextEditingController _phoneController = new TextEditingController();
  TextEditingController _codeController = new TextEditingController();
  TextEditingController _newPasswordController = new TextEditingController();
  TextEditingController _newPasswordConfirmController = new TextEditingController();

  // 控制文本框焦点
  FocusNode usernameFocusNode = new FocusNode();
  FocusNode phoneFocusNode = new FocusNode();
  FocusNode codeFocusNode = new FocusNode();
  FocusNode newPasswordFocusNode = new FocusNode();
  FocusNode newPasswordConfirmFocusNode = new FocusNode();
  FocusScopeNode currentFocusNode;

//  static const eventPlugin = const EventChannel(
//      "com.dvlproad.ciyouzen/callNativeForgetPassEventChannel");
  static const jumpPlugin = const MethodChannel(
      "com.dvlproad.ciyouzen/callNativeForgetPassMethodChannel");



  ///获取验证码点击
  static const editCode = 'editCode';

  ///提交点击
  static const push = 'push';

  var _isPushEnable = false;

  @override
  void initState() {
    super.initState();
//    _usernameController = editText(userName);
//    _phoneController = editText(phone);
//    _codeController = editText(code);
//    _newPasswordController = editText(newPassword1);
//    _newPasswordConfirmController = editText(newPassword2);


    //监听文本变化方式②设置controller并实现监听
    _usernameController.addListener(() {
      var userName = _usernameController.text;
      print("listen username:" + _usernameController.text);
//      _updateAllViewState();

//      setState(() => _usernameController.text = userName);
    });

//    _passwordController.addListener(() {
//      password = _passwordController.text;
//      print("listen password:" + _passwordController.text);
//      _updateAllViewState();
//    });
  }

  /// 返回键点击事件
  _goBack() {
    Navigator.pop(context, 'resultParams');
  }

  /// 获取验证码
  _getCode() {
    print(_usernameController.text);
    if (_phoneController.text.length != 11) {
      Map<String, dynamic> flutterRequest = {
        "flutterParams": {
          "toast": "请输入11位手机号码"
        }
      };
      _toNativeMethod("toast", flutterRequest);
    } else {
      Map<String, dynamic> flutterRequest = {
        "flutterParams": {
          "phone": _phoneController.text
        }
      };
      _toNativeMethod(editCode, flutterRequest);
    }
  }

  /// 点击提交：尝试提交->正式提交
  Function _trySubmitAction() {
    if (_isPushEnable)
      return () {
        _realSubmitAction();
      };

    return null;
  }

  // 正式提交
  _realSubmitAction() {
    ///验证都不为空、
    Map<String, dynamic> flutterRequest = {
      "flutterParams": {
        "name": _usernameController.text,
        "phone": _phoneController.text,
        "code": _codeController.text,
        "pass": _newPasswordController.text,
        "passA": _newPasswordConfirmController.text,
      }
    };

    _toNativeMethod(push, flutterRequest);
  }


  ///更新门店
  _updateName(var name) {
    setState(() => _usernameController.text = name);
  }

  _onChange(var phone) {
    if (__isGo()) {
      ///合法的输入
      setState(() => _isPushEnable = true);
    } else {
      setState(() => _isPushEnable = false);
    }
  }

  bool __isGo() {
    if (_usernameController.text.isEmpty || _phoneController.text.length != 11 ||
        _codeController.text.length != 6 || _newPasswordController.text.isEmpty ||
        _newPasswordConfirmController.text.isEmpty)
      return false;
    return true;
  }


  void _onError(Object error) {
    setState(() {});
  }

  /// 和natvie通讯
  _toNativeMethod(String tag, Map<String, dynamic> map) async {
    try {
      print("当前tag=" + tag);
      String result = await

      jumpPlugin.invokeMethod(tag, map);
      print(result);
    } on PlatformException catch (e) {
      print("_toNativeMethod" + '${e.message}');
    }
  }


  @override
  Widget build(BuildContext context) {
    final Object args = ModalRoute.of(context).settings.arguments;
    print("忘记密码页从登录页中接收到的传值为 = " + args);
    userName = args;
    _usernameController.text = userName;

    return Scaffold(
      appBar: appBar(),
      body: Stack(
        alignment: Alignment.center, //指定未定位或部分定位widget的对齐方式
        children: <Widget>[
          GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: () {
              FocusScope.of(context).requestFocus(new FocusNode());
            },
            child: ListView(
              children: forgetPasswordWidgets(),
            ),
          ),
        ],
      ),
    );
  }

  /// 导航栏
  PreferredSize appBar () {
    return PreferredSize(
        child: AppBar(
          elevation: 0.0,
          leading: _backButton(),
          title: Text('忘记密码', style: TextStyle(fontSize: 17)),
          centerTitle: true,
        ),
        preferredSize: Size.fromHeight(44)
    );
  }

  // 返回按钮
  IconButton _backButton() {
    return IconButton(
        splashColor: Colors.blue,
        highlightColor: Colors.blue,
        icon: Icon(Icons.arrow_back),
        onPressed: _goBack
    );
  }

  /// 忘记密码页的整体视图
  List<Widget> forgetPasswordWidgets() {
    MediaQueryData mediaQuery = MediaQuery.of(context);
    double screenHeight = mediaQuery.size.height;
    //print("screenHeight = " + screenHeight.toString());
    double loginIconTop = screenHeight <= 667 ? 80 : 106;
    double loginIconBottom = screenHeight <= 667 ? 50 : 71;
    return <Widget>[
      new Column(
        children: <Widget>[
          userNameRowWidget(),            /// 用户名
          _separateLine(),
          phoneRowWidget(),               /// 手机号
          _separateLine(),
          verifiedCodeRowWidget(),        /// 验证码
          _separateLine(),
          newPasswordRowWidget(),         /// 新密码
          _separateLine(),
          newPasswordConfirmRowWidget(),  /// 确认新密码

          passwordPromptRowWidget(),      /// 密码提示语
          submitButtonRowWidget(),        /// 提交按钮
        ],
      )
    ];
  }

  /// 下划分割线
  static Widget _separateLine() {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20, top: 0),
      width: double.infinity,
      height: 0.5,
      color: Colors.grey,
    );
  }

  /// 用户名 的行视图
  Widget userNameRowWidget() {
    return ForgetPasswordTextFieldRowWidget(
      title: '用户名',
      placeholder: '请输入本人登陆用户名',
      value: userName,
      keyboardType: TextInputType.text,
      autofocus: true,
      controller: _usernameController,
    );
  }

  /// 手机号 的行视图
  Widget phoneRowWidget() {
    return ForgetPasswordTextFieldRowWidget(
      title: '手机号',
      placeholder: '请输入本人手机号',
      value: '',
      keyboardType: TextInputType.number,
      autofocus: true,
      controller: _phoneController,
    );
  }

  /// 验证码 的行视图
  Widget verifiedCodeRowWidget() {
    return Container(
      color: Color(0xFFffffff),
      child:
      Row(
        children: <Widget>[
          Expanded(
            child: _verifiedCodeTextField(),
            flex: 2,
          ),
          Padding(
            padding: EdgeInsets.only(right: 15),
            child: _getVerifiedCodeButton(),
          )
        ],
      ),
    );
  }
  Widget _verifiedCodeTextField() {
    return ForgetPasswordTextFieldRowWidget(
      title: '验证码',
      placeholder: '请输入手机验证码',
      value: '',
      keyboardType: TextInputType.number,
      autofocus: true,
      controller: _codeController,
    );
  }
  // 获取验证码的按钮
  FlatButton _getVerifiedCodeButton() {
    return FlatButton(
        child: Text("获取验证码"),
        color: Color(0xff01adfe),
        textColor: Colors.white,
        highlightColor: Color(0xff1393d7),
        disabledColor: Color(0xffd3d3d5),
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0)
        ),
        onPressed: () {
          _getCode();
        }
    );
  }

  /// 新密码 的行视图
  Widget newPasswordRowWidget() {
    return ForgetPasswordTextFieldRowWidget(
      title: '新密码',
      placeholder: '请输入新密码',
      value: '',
      keyboardType: TextInputType.number,
      autofocus: true,
      controller: _newPasswordController,
    );
  }

  /// 确认新密码 的行视图
  Widget newPasswordConfirmRowWidget() {
    return ForgetPasswordTextFieldRowWidget(
      title: '确认新密码',
      placeholder: '请再输入一遍新密码',
      value: '',
      keyboardType: TextInputType.number,
      autofocus: true,
      controller: _newPasswordConfirmController,
    );
  }

  /// 密码提示语 的行视图
  Row passwordPromptRowWidget() {
    return Row(children: <Widget>[
      Padding(
          padding: EdgeInsets.only(left: 25, top: 20, right: 8, bottom: 10),
          child: Image(image: AssetImage("lib/Resources/login/login_warning.png"), width: 20.0, height: 20.0)
      ),
      Expanded(
        flex: 1,
        child: Padding(
          padding: EdgeInsets.only(left: 0, top: 15, right: 10, bottom: 10),
          child: Text('密码至少6位，需包含大、小写字母、数字、特殊字符，且至少包含其中三种 ', style: TextStyle(color: Colors.grey)),
        ),
      )
    ]
    );
  }


  /// 提交按钮 的行视图
  Row submitButtonRowWidget() {
    return Row(children: <Widget>[
      Expanded(
          child: Padding(
            padding: EdgeInsets.fromLTRB(10.0, 15.0, 10.0, 20.0),
            child: _submitButton(),
          )
      )
    ]
    );
  }

  // 提交按钮
  FlatButton _submitButton() {
    return FlatButton(
        child: Padding(
          padding: EdgeInsets.fromLTRB(10.0, 15.0, 0.0, 15.0),
          child: Text("提交"),
        ),
        color: Color(0xff01adfe),
        textColor: Colors.white,
        highlightColor: Color(0xff1393d7),
        disabledColor: Color(0xffd3d3d5),
        //colorBrightness: Brightness.dark, //按钮主题，默认是浅色主题
        //splashColor: Colors.grey, //点击时，水波动画中水波的颜色
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5.0)
        ),
        onPressed: _trySubmitAction()
    );
  }
}

class Out {
  ChildBean nativeParams;
  int nativeType;

  Out({
    this.nativeType,
    this.nativeParams
  });

  factory Out.fromJson(Map<String, dynamic> parsedJson){
    return Out(
        nativeType: parsedJson['nativeType'],
        nativeParams: ChildBean.fromJson(parsedJson['nativeParams'])
    );
  }

}

class ChildBean {
  String name;

  ChildBean({this.name});

  factory ChildBean.fromJson(Map<String, dynamic> json){
    return ChildBean(
      name: json['name'],
    );
  }
}

