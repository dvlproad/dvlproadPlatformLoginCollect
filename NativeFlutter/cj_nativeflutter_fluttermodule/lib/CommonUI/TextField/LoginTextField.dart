import 'package:flutter/material.dart';


class LoginTextField extends StatefulWidget {
  final String placeholder;
  final String prefixIconImageName;

  LoginTextField({
    Key key,
    this.placeholder,
    this.prefixIconImageName,
})  :  super(key: key);

  @override
  _LoginTextFieldState createState() => _LoginTextFieldState();
}

class _LoginTextFieldState extends State<LoginTextField> {
  @override
  Widget build(BuildContext context) {
    return TextField(
//        autofocus: shouldAutofocusUserNameTextField,
        style: TextStyle(color: Colors.black, fontSize: 17.0),
        decoration: InputDecoration(
          contentPadding: EdgeInsets.all(0.0),
          //labelText: "用户名",
          hintText: widget.placeholder,
          //prefixIcon: Icon(Icons.person),
          prefixIcon: new Image.asset(
            widget.prefixIconImageName,
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
}


//class TextFieldInputDecoration {
//  final String hintText;
//  final Widget prefixIcon;
//  final Widget suffixIcon;
//
//  const TextFieldInputDecoration(
//  this.hintText,
//  this.prefixIcon,
//  this.suffixIcon;
//      ) {
//    return TextFieldInputDecoration(
//    hintText: hintText,
//    );
//  };
//}



//Color CJColorFromHexString(String hexCode) {
//
//}