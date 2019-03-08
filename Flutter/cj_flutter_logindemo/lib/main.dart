import 'package:flutter/material.dart';
import 'Module/Login/LoginPage.dart';
import 'Module/Login/ForgetPassword.dart';
import 'Module/Mine/PersonCenter.dart';
import 'Module/Shop/StoreList.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter NativeFlutter LoginDemo',
//      theme: ThemeData(
//        primarySwatch: Colors.red,
//      ),
      home: MyLoginPage(title: 'Flutter NativeFlutter LoginDemo'),
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
        routes: {
          "LoginPage": (context) => MyLoginPage(title: 'Flutter NativeFlutter LoginDemo'),
          "StoreList": (context) => StoreList(),
          "personCenterRoute": (context) => PersonCenter(),
          "forgetpasswordroute": (context) => ForgetPasswordRoute(),
        }

    );
  }
}