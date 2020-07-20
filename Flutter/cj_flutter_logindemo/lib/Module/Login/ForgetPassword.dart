import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:cj_flutter_logindemo/Tool/Adapter.dart';

class ForgetPasswordPage extends StatefulWidget {
  ForgetPasswordPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _ForgetPasswordPageState createState() => new _ForgetPasswordPageState();
}

class _ForgetPasswordPageState extends State<ForgetPasswordPage> {
  TextEditingController _phoneController = new TextEditingController();
  TextEditingController _codeController = new TextEditingController();
  TextEditingController _nameController = new TextEditingController();
  TextEditingController _passController = new TextEditingController();
  TextEditingController _passAController = new TextEditingController();

//  static const eventPlugin = const EventChannel(
//      "com.dvlproad.ciyouzen/callNativeForgetPassEventChannel");
  static const jumpPlugin = const MethodChannel(
      "com.dvlproad.ciyouzen/callNativeForgetPassMethodChannel");


  ///返回键点击
  static const backMethod = 'back';

  ///提示toast
  static const toast = 'toast';

  ///获取验证码点击
  static const editCode = 'editCode';

  ///提交点击
  static const push = 'push';

  var _isPushEnable = false;

  var _barHeigt = 140;

  var _leftWidgetWidth = 340;

  var _name = '';
  var _phone = '';
  var _code = '';
  var _pass = '';
  var _passAgain = '';

  @override
  Widget build(BuildContext context) {
    Adapter()..init(context);
    return MaterialApp(
        home: Scaffold(
            appBar: PreferredSize(child: AppBar(
              elevation: 0.0,
              leading: IconButton(
                  splashColor: Colors.blue,
                  highlightColor: Colors.blue,
                  icon: Icon(Icons.arrow_back), onPressed: _pCenterBack),
              title: new Text('忘记密码',style: new TextStyle(fontSize: Adapter.setFont(55))), centerTitle: true,),
                preferredSize: Size.fromHeight(
                    Adapter.setHeight(_barHeigt))
            ),
            body:

            new Container(
                width: double.infinity,
                height: double.infinity,
                color: const Color(0xFFF2F2F2),
                child:

                new ListView(
                  children: <Widget>[
                    new Column(
                      children: <Widget>[
                        new Container(
                          width: double.infinity,
                          color: const Color(0xFFffffff),
                          child:
                          Row(
                            children: <Widget>[
                              _text('用户名'),
                              Expanded(
                                child: TextField(
                                  autofocus: true,
                                  controller: _nameController,
                                  onChanged: _change,

                                  ///是否自动获取焦点
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    hintText: "请输入本人登陆用户名",
                                  ),
                                ),
                                flex: 2,
                              ),
                            ],
                          ),
                        ),
                        _line(),
                        new Container(
                          width: double.infinity,
                          color: const Color(0xFFffffff),
                          child:
                          Row(
                            children: <Widget>[
                              _text('手机号'),
                              Expanded(
                                child: TextField(
                                  keyboardType: TextInputType.number,
                                  controller: _phoneController,
                                  onChanged: _change,
                                  autofocus: true,
                                  //是否自动获取焦点
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    hintText: "请输入本人手机号",

                                  ),
                                ),
                                flex: 2,
                              ),
                            ],
                          ),
                        ),
                        _line(),
                        new Container(
                          width: double.infinity,
                          color: const Color(0xFFffffff),
                          child:
                          Row(
                            children: <Widget>[
                              _text('验证码'),
                              Expanded(
                                child: TextField(
                                  controller: _codeController,
                                  onChanged: _change,
                                  autofocus: true,
                                  //是否自动获取焦点
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    hintText: "请输入手机验证码",
                                  ),
                                ),
                                flex: 2,
                              ),
                              Padding(
                                padding: const EdgeInsets.only(right: 15),
                                child: FlatButton(
                                    child: Text("获取验证码"),
                                    color: Color(0xff01adfe),
                                    textColor: Colors.white,
                                    highlightColor: Color(0xff1393d7),
                                    disabledColor: Color(0xffd3d3d5),
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(
                                            5.0)),
                                    onPressed: () {
                                      _getCode();
                                    }
                                ),
                              )
                            ],
                          ),
                        ),

                        _line(),
                        new Container(
                          width: double.infinity,
                          color: const Color(0xFFffffff),
                          child:
                          Row(
                            children: <Widget>[
                              _text('新密码'),
                              Expanded(
                                child: TextField(
                                  autofocus: true,
                                  controller: _passController,
                                  onChanged: _change,

                                  ///是否自动获取焦点
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    hintText: "请输入新密码",
                                  ),
                                ),
                                flex: 2,
                              ),
                            ],
                          ),
                        ),
                        _line(),
                        new Container(
                          width: double.infinity,
                          color: const Color(0xFFffffff),
                          child:
                          Row(
                            children: <Widget>[
                              _text('确认新密码'),
                              Expanded(
                                child: TextField(
                                  autofocus: true,
                                  controller: _passAController,
                                  onChanged: _change,
                                  ///是否自动获取焦点
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    hintText: "请再输入一遍新密码",
                                  ),
                                ),
                                flex: 3,
                              ),
                            ],
                          ),
                        ),

                        Row(children: <Widget>[
                          Padding(
                              padding: const EdgeInsets.only(
                                  left: 25, top: 20, right: 8, bottom: 10),
                              child: Image(
                                  image: AssetImage(
                                      "lib/Resources/login/login_warning.png"),
                                  width: 20.0,
                                  height: 20.0)),
                          new Expanded(
                            child:
                            Padding(
                              padding: const EdgeInsets.only(
                                  left: 0, top: 15, right: 10, bottom: 10),
                              child: Text(
                                '密码至少6位，需包含大、小写字母、数字、特殊字符，且至少包含其中三种 ',
                                style: new TextStyle(color: Colors.grey),),

                            ),
                          )
                        ]),
                        Row(children: <Widget>[
                          new Expanded(child:
                          Padding(
                            padding: const EdgeInsets.fromLTRB(
                                10.0, 15.0, 10.0, 20.0),
                            child: FlatButton(
                                child:
                                new Padding(
                                  padding: new EdgeInsets.fromLTRB(
                                      10.0, 15.0, 0.0, 15.0),
                                  child: new Text("提交"),
                                ),
                                color: Color(0xff01adfe),
                                textColor: Colors.white,
                                highlightColor: Color(0xff1393d7),
                                disabledColor: Color(0xffd3d3d5),
                                //colorBrightness: Brightness.dark, //按钮主题，默认是浅色主题
                                //splashColor: Colors.grey, //点击时，水波动画中水波的颜色
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(
                                        5.0)),
                                onPressed:
                                _getPushBtn()
                            ),
                          )
                            ,)
                        ]),
                      ],
                    )
                  ],
                )
            )
        )
    );
  }

  Widget _text(msg) {
    return
      new Container(
          width: Adapter.setWidth(_leftWidgetWidth),
          color: const Color(0xFFffffff),
          child: Padding(
            padding: const EdgeInsets.only(
                left: 15,
                top: 10,
                right: 0,
                bottom: 10),
            child: Text(
                msg, textAlign: TextAlign.left),
          ));
  }

  static Widget _line() {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20, top: 0),
      width: double.infinity,
      height: 0.5,
      color: Colors.grey,
    );
  }

  StreamSubscription _perseonSub;

  /// 返回键点击事件
  Future<Null> _pCenterBack() async {
    Map<String, dynamic> flutterRequest = {};
    _toNativeMethod(backMethod, flutterRequest);
  }

  @override
  void initState() {
    super.initState();
    _phoneController = editText(_phone);
    _nameController = editText(_name);
    _codeController = editText(_code);
    _passController = editText(_pass);
    _passAController = editText(_passAgain);
    _startPlugin();
  }

  TextEditingController editText(view) {
    return TextEditingController.fromValue(
        TextEditingValue(
          // 设置内容
            text: '$view',
            // 保持光标在最后
            selection: TextSelection.fromPosition(
                TextPosition(
                    affinity: TextAffinity.downstream,
                    offset: "$view".length))));
  }

  Function _getPushBtn() {
    if (_isPushEnable)
      return () {
        _push();
      };

    return null;
  }


  ///开启EventChannle事件监听
  void _startPlugin() {
    if (_perseonSub == null) {
//      _perseonSub = eventPlugin.receiveBroadcastStream().listen(
//          _onLisenEvent, onError: _onError);
    }
  }

  ///只需要从native传一个用户名进来
  void _onLisenEvent(Object event) {
    final jsonResponse = json.decode(event.toString());
    Out student = new Out.fromJson(jsonResponse);
    var childBean = student.nativeParams;
    _updateName(childBean.name);
  }

  ///获取验证码
  _getCode() {
    print(_nameController.text);
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


  ///提交
  _push() {
    ///验证都不为空、
    Map<String, dynamic> flutterRequest = {
      "flutterParams": {
        "name": _nameController.text,
        "phone": _phoneController.text,
        "code": _codeController.text,
        "pass": _passController.text,
        "passA": _passAController.text,
      }
    };

    _toNativeMethod(push, flutterRequest);
  }

  bool isGo() {
    if (_nameController.text.isEmpty || _phoneController.text.length != 11 ||
        _codeController.text.length != 6 || _passController.text.isEmpty ||
        _passAController.text.isEmpty)
      return false;
    return true;
  }


  ///更新门店
  _updateName(var name) {
    setState(() => _nameController.text = name);
  }

  _change(var phone) {
    if (isGo()) {
      ///合法的输入
      setState(() => _isPushEnable = true);
    } else {
      setState(() => _isPushEnable = false);
    }
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

