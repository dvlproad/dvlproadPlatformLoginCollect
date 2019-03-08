import 'package:flutter/material.dart';

// 蓝色背景按钮(常用于：登录按钮)
FlatButton blueButton(String text, bool enable, VoidCallback enableOnPressed) {
  return FlatButton(
    child: Text(text),
    splashColor: Colors.transparent,
    color: Color(0xff01adfe),
    textColor: Colors.white,
    highlightColor: Color(0xff1393d7),
    disabledColor: Color(0xffd3d3d5),
    disabledTextColor: Colors.white,
    shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(5.0)
        ),
    //onPressed: enable ? enableOnPressed : null,
    onPressed: enable ?  () {
      enableOnPressed();
    } : null,
  );
}