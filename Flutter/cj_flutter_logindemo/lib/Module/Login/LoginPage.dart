import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui';
import 'package:cjdemo_commonwidget/CJDemoButtonFactory.dart';
import 'package:cjdemo_commonwidget/CJDemoTextFieldFactory.dart';
import 'ForgetPassword.dart';
import '../Main/MainPage.dart';

class MyLoginPage extends StatefulWidget {
  MyLoginPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyLoginPageState createState() => _MyLoginPageState();
}

class _MyLoginPageState extends State<MyLoginPage> {
  bool userNameValid = false;
  bool passwordValid = false;
  bool loginValid = false;
  bool passwordClearValid = false;
  bool shouldAutofocusUserNameTextField = false;
  String userName = "";
  String password = "";

  //定义一个controller
  TextEditingController _usernameController = new TextEditingController();
  TextEditingController _passwordController = new TextEditingController();
  FocusNode usernameFocusNode = new FocusNode();
  FocusNode passwordFocusNode = new FocusNode();
  FocusScopeNode currentFocusNode;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print("Login Page initState");

    //监听文本变化方式②设置controller并实现监听
    _usernameController.addListener(() {
      userName = _usernameController.text;
      print("listen username:" + _usernameController.text);
      _updateAllViewState();
    });

    _passwordController.addListener(() {
      password = _passwordController.text;
      print("listen password:" + _passwordController.text);
      _updateAllViewState();
    });

    _getDefaultLoginAccountAction();
  }


  // 更新文本框的聚焦
  void _updateAutofocus(dynamic userNameAutofocusValue) {
    String userNameAutofocusString;
    if (userNameAutofocusValue is bool) {
      //原生返回bool值时候调用的方法
      bool userNameAutofocus = userNameAutofocusValue as bool;
      shouldAutofocusUserNameTextField = userNameAutofocus;
      userNameAutofocusString = shouldAutofocusUserNameTextField ? "YES" : "NO";
      print("2.bool userNameAutofocusString:" + userNameAutofocusString);
    } else {
      //原生返回String值时候调用的方法
      userNameAutofocusString = userNameAutofocusValue as String;
      shouldAutofocusUserNameTextField = userNameAutofocusString == "YES";
      print("1.String userNameAutofocusString:" + userNameAutofocusString);
    }

    setState(() {
      //_usernameController.text = userNameAutofocusString;
      if (shouldAutofocusUserNameTextField) {
        if (null == currentFocusNode) {
          currentFocusNode = FocusScope.of(context);
        }
        currentFocusNode.requestFocus(usernameFocusNode);
      } else {
        usernameFocusNode.unfocus();
        passwordFocusNode.unfocus();
      }
    });
  }

  void _updateAllViewState() {
    userNameValid = userName.length > 0;
    passwordValid = password.length > 6 && password.length < 50;
    loginValid = userNameValid && passwordValid;
    passwordClearValid = password.length > 0;
    setState(() {});
  }

  _getDefaultLoginAccountAction() {
    try {
      userName = "Beyond";
      password = "";
      print(userName + ":" + password);

      setState(() {
        _usernameController.text = userName;
        _passwordController.text = password;
      });
    } on PlatformException {}
  }

  _login() {
    Navigator.push(context, MaterialPageRoute(builder: (context) {
      return MyMainPage();
    }));
  }

  _goForgetPasswordViewController() {
    try {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ForgetPasswordPage()),
      );
    } on PlatformException {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        alignment: Alignment.center, //指定未定位或部分定位widget的对齐方式
        children: <Widget>[
          GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: () {
              FocusScope.of(context).requestFocus(new FocusNode());
            },
            child: ListView(
              children: loginWidgets(),
            ),
          ),
        ],
      ),
    );
  }

  // 登录页视图
  List<Widget> loginWidgets() {
    MediaQueryData mediaQuery = MediaQuery.of(context);
    double screenHeight = mediaQuery.size.height;
    //print("screenHeight = " + screenHeight.toString());
    double loginIconTop = screenHeight <= 667 ? 80 : 106;
    double loginIconBottom = screenHeight <= 667 ? 50 : 71;
    return <Widget>[
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: loginIconTop),
            child: loginIconImage(),
          ),
        ],
      ),
      Padding(
        padding: EdgeInsets.only(top: loginIconBottom, left: 25, right: 25),
        child: userNameTextField(),
      ),
      Padding(
        padding: const EdgeInsets.only(top: 20, left: 25, right: 25),
        child: passwordTextField(),
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(top: 15, right: 25),
            child: forgetPassword(),
          ),
        ],
      ),
      Padding(
        padding: const EdgeInsets.only(top: 15, left: 25, right: 25),
        child: Flex(
          direction: Axis.horizontal,
          children: <Widget>[
            Expanded(
              flex: 1,
              child: loginButton(),
            ),
          ],
        ),
      ),
    ];
  }

  // 登录页Icon
  Image loginIconImage() {
    return Image(
        image: AssetImage("lib/Resources/login/login_icon.png"),
        width: 113.0,
        height: 113.0);
  }

  // 用户名文本框
  LoginTextField userNameTextField() {
    return LoginTextField(
        placeholder: "用户名",
        prefixIconSelected: userNameValid,
        prefixIconNormalImageName: 'lib/Resources/login/login_username_gray.png',
        prefixIconSelectedImageName: 'lib/Resources/login/login_username_blue.png',
        autofocus: shouldAutofocusUserNameTextField,
        keyboardType: TextInputType.text,
        controller: _usernameController,
        textInputAction: TextInputAction.next,
        focusNode: usernameFocusNode,
        onSubmitted: (text) {
          print("current userName:" + text);
          if (null == currentFocusNode) {
            currentFocusNode = FocusScope.of(context);
          }
          currentFocusNode.requestFocus(passwordFocusNode);
        });
  }

  // 密码文本框
  LoginTextField passwordTextField() {
    return LoginTextField(
        placeholder: "密码",
        prefixIconSelected: passwordValid,
        prefixIconNormalImageName: 'lib/Resources/login/login_password_gray.png',
        prefixIconSelectedImageName: 'lib/Resources/login/login_password_blue.png',
        controller: _passwordController,
        showClear: passwordClearValid,
        textInputAction: TextInputAction.done,
        obscureText: true, //是否隐藏正在编辑的文本
        focusNode: passwordFocusNode,
        onSubmitted: (text) {
          print("current password:" + text);
          passwordFocusNode.unfocus();
          if (loginValid) {
            _login();
          }
        });
  }

  // 忘记密码按钮
  FlatButton forgetPassword() {
    return FlatButton(
      child: Text("忘记密码?"),
      textColor: Color(0xfff5b63c),
      onPressed: () {
        _goForgetPasswordViewController();
      },
    );
  }

  // 登录按钮
  FlatButton loginButton() {
    return BlueButton(
      text: "登录",
      enable: loginValid,
      enableOnPressed: _login
    );
  }
}
