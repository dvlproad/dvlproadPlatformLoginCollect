import 'package:flutter/material.dart';

// 文本框文本清除按钮
IconButton clearButtonWithOnPressed(VoidCallback onPressed) {
  return new IconButton(
      icon: new Icon(Icons.clear, color: Colors.black45),
      onPressed: onPressed);
}

// 文本框border
InputBorder loginTextFieldDecorationBorder() {
  return new OutlineInputBorder(
      borderSide: new BorderSide(color: Color(0xffd2d2d2), width: 0.6),
      borderRadius: new BorderRadius.circular(6.0));
}