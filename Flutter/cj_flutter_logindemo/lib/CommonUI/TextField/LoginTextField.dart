import 'package:flutter/material.dart';


class LoginTextField extends StatefulWidget {
  final String placeholder;
  final String prefixIconImageName;
  final bool autofocus;
  final TextEditingController controller;
  final TextInputAction textInputAction;
  final FocusNode focusNode;
  final ValueChanged<String> onSubmitted;
  final TextInputType keyboardType;

  LoginTextField({
    Key key,
    this.placeholder,
    this.prefixIconImageName,
    this.autofocus,
    this.keyboardType,
    this.controller,
    this.textInputAction,
    this.focusNode,
    this.onSubmitted

})  :  super(key: key);

  @override
  _LoginTextFieldState createState() => _LoginTextFieldState();
}



class _LoginTextFieldState extends State<LoginTextField> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: TextField(
        autofocus: widget.autofocus,
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
            enabledBorder: loginTextFieldDecorationBorder(),
            focusedBorder: loginTextFieldDecorationBorder(),
          ),
        keyboardType: widget.keyboardType,
        controller: widget.controller,
        textInputAction: widget.textInputAction,
        focusNode: widget.focusNode,
        onSubmitted: widget.onSubmitted
          ),
    );
  }
}


// 文本框border
InputBorder loginTextFieldDecorationBorder() {
  return new OutlineInputBorder(
      borderSide: new BorderSide(color: Color(0xffd2d2d2), width: 0.6),
      borderRadius: new BorderRadius.circular(6.0)
  );
}