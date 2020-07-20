import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui';
import 'package:cjdemo_commonwidget/CJDemoButtonFactory.dart';
import 'package:cjdemo_commonwidget/CJDemoTextFieldFactory.dart';


class MyMainPage extends StatefulWidget {
  MyMainPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyMainPageState createState() => _MyMainPageState();
}

class _MyMainPageState extends State<MyMainPage> {

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print("Main Page initState");
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Main Screen'),
      ),
      body: Stack(
        alignment: Alignment.center, //指定未定位或部分定位widget的对齐方式
        children: <Widget>[
          GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: () {
              FocusScope.of(context).requestFocus(new FocusNode());
            },
            child: ListView(
              children: mainWidgets(),
            ),
          ),
        ],
      ),
    );
  }

  // 登录页视图
  List<Widget> mainWidgets() {
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
              child: forgetPassword(),
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

  // 忘记密码按钮
  FlatButton forgetPassword() {
    return FlatButton(
      child: Text("主页按钮?"),
      textColor: Color(0xfff5b63c),
      onPressed: () {

      },
    );
  }
}
