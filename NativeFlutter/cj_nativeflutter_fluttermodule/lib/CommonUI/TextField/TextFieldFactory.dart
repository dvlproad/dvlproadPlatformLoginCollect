import 'package:flutter/material.dart';


TextField getTextField() {
  return TextField();
}


TextField getLoginTextField(String placeholder, String prefixIconImageName) {
  return TextField(
//        autofocus: shouldAutofocusUserNameTextField,
    style: TextStyle(color: Colors.black, fontSize: 17.0),
    decoration: InputDecoration(
      contentPadding: EdgeInsets.all(0.0),
      //labelText: "用户名",
      hintText: placeholder,
      //prefixIcon: Icon(Icons.person),
      prefixIcon: new Image.asset(
        prefixIconImageName,
        width: 14.0,
        height: 15.0,
      ),
      enabledBorder: new OutlineInputBorder(
          borderSide: new BorderSide(
              color: Color(0xffd2d2d2), width: 0.6),
          borderRadius: new BorderRadius.circular(6.0)),
      focusedBorder: new OutlineInputBorder(
          borderSide: new BorderSide(
              color: Color(0xffd2d2d2), width: 0.6),
          borderRadius: new BorderRadius.circular(6.0)),
    ),
//        keyboardType: TextInputType.text,
//        controller: _usernameController,
//        textInputAction: TextInputAction.next,
//        focusNode: usernameFocusNode, //usernameFocusNode
//        onSubmitted: (text) {
//          print("current userName:" + text);
//          if (null == currentFocusNode) {
//            currentFocusNode = FocusScope.of(context);
//          }
//          currentFocusNode.requestFocus(passwordFocusNode);
//        }
  );
}